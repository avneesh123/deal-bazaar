import { supabase } from "@/lib/supabase";
import * as kicksdb from "./kicksdb";
import * as ebay from "./ebay";
import * as internal from "./internal";
import type {
  PricingEstimate,
  AgentStep,
  MarketDataSnapshot,
  KicksDBData,
  EbayData,
  InternalData,
} from "./types";

// Claude API tool definitions
const TOOLS = [
  {
    name: "search_kicksdb",
    description:
      "Search KicksDB for sneaker products by name. Returns product matches with slugs, names, retail prices.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Product search query, e.g. 'Adidas Campus 00s Dark Grey'",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_kicksdb_prices",
    description:
      "Get detailed pricing data for a specific product from KicksDB. Includes lowest ask, highest bid, last sale, 30-day average, size-specific prices, and recent sales history.",
    input_schema: {
      type: "object" as const,
      properties: {
        slug: {
          type: "string",
          description: "Product slug from KicksDB search results",
        },
        size: {
          type: "string",
          description: "Specific shoe size to check, e.g. '12' or '7.5'",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "search_ebay_listings",
    description:
      "Search eBay for active listings of a product. Returns current listings with prices, average and median prices.",
    input_schema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query for eBay, e.g. 'Adidas Campus 00s Dark Grey size 12K'",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "query_internal_sales",
    description:
      "Query our own Deal Bazaar sales history for similar products. Shows what we've sold, at what price, and our margins.",
    input_schema: {
      type: "object" as const,
      properties: {
        brand: { type: "string", description: "Filter by brand, e.g. 'Adidas'" },
        model: {
          type: "string",
          description: "Filter by model name, e.g. 'Campus'",
        },
        category: {
          type: "string",
          description: "Filter by category: 'sneakers' or 'jewelry'",
        },
        days: {
          type: "number",
          description: "Number of days to look back (default: 90)",
        },
      },
    },
  },
];

const SYSTEM_PROMPT = `You are a sneaker pricing analyst for Deal Bazaar, an online resale store. Given a product query, research current market prices and recommend three pricing tiers.

## Pricing Tiers
1. **QUICK SELL** (1-3 days): Price to move inventory fast. Below market average. Use when we need cash flow or item has been sitting.
2. **COMPETITIVE** (1-2 weeks): Fair market price that balances speed and profit. This is our default recommendation.
3. **MAX PROFIT** (30+ days): Premium pricing for patient sellers. Only viable for high-demand items.

## Your Process
1. Parse the query into brand, model, colorway, and size
2. Search KicksDB for the product — understand retail price and market positioning
3. Get KicksDB price data — lowest asks, recent sales, 30-day trends
4. Search eBay for active listings — understand current competition
5. Check our internal sales history — learn from what we've actually sold
6. Synthesize all data into three price recommendations

## Rules
- Always explain your reasoning citing specific data points
- If data is limited, lower your confidence score and say so
- Never fabricate prices — if you don't have data, say "insufficient data"
- Consider platform fees: StockX ~10%, eBay ~13%, our site 0%
- Account for condition: DS (deadstock/new) commands premium over used
- Size matters: common sizes (8-11 men's) have more demand; outlier sizes may need discounts
- Kids sizes generally sell for less than adult sizes

## Response Format
After researching, respond with a JSON object in this exact format (no markdown, just raw JSON):
{
  "parsed": { "brand": "...", "model": "...", "colorway": "...", "size": "..." },
  "quick_sell": { "price": 0, "reasoning": "..." },
  "competitive": { "price": 0, "reasoning": "..." },
  "max_profit": { "price": 0, "reasoning": "..." },
  "confidence": 0,
  "overall_reasoning": "..."
}`;

interface ApiKeys {
  anthropic: string;
  kicksdb?: string;
  ebay?: string;
  ebaySecret?: string;
}

async function getApiKeys(): Promise<ApiKeys> {
  const { data } = await supabase
    .from("api_keys")
    .select("service, api_key, config");

  const keys: ApiKeys = { anthropic: "" };
  for (const row of data ?? []) {
    if (row.service === "anthropic") keys.anthropic = row.api_key;
    if (row.service === "kicksdb") keys.kicksdb = row.api_key;
    if (row.service === "ebay") {
      keys.ebay = row.api_key;
      keys.ebaySecret = (row.config as Record<string, string>)?.client_secret;
    }
  }
  return keys;
}

// Execute a tool call and return the result
async function executeTool(
  toolName: string,
  toolInput: Record<string, unknown>,
  apiKeys: ApiKeys
): Promise<{ result: unknown; source: string }> {
  switch (toolName) {
    case "search_kicksdb": {
      if (!apiKeys.kicksdb) {
        return {
          result: { error: "KicksDB API key not configured. Add it in admin settings." },
          source: "kicksdb",
        };
      }
      const results = await kicksdb.searchProducts(
        toolInput.query as string,
        apiKeys.kicksdb
      );
      return { result: results, source: "kicksdb" };
    }

    case "get_kicksdb_prices": {
      if (!apiKeys.kicksdb) {
        return {
          result: { error: "KicksDB API key not configured." },
          source: "kicksdb",
        };
      }
      const prices = await kicksdb.getProductPrices(
        toolInput.slug as string,
        apiKeys.kicksdb,
        toolInput.size as string | undefined
      );
      return { result: prices, source: "kicksdb" };
    }

    case "search_ebay_listings": {
      if (!apiKeys.ebay) {
        return {
          result: { error: "eBay API key not configured. Skipping eBay data." },
          source: "ebay",
        };
      }
      const listings = await ebay.searchListings(
        toolInput.query as string,
        apiKeys.ebay,
        { clientSecret: apiKeys.ebaySecret }
      );
      return { result: listings, source: "ebay" };
    }

    case "query_internal_sales": {
      const data = await internal.queryInternalSales({
        brand: toolInput.brand as string | undefined,
        model: toolInput.model as string | undefined,
        category: toolInput.category as string | undefined,
        days: toolInput.days as number | undefined,
      });
      return { result: data, source: "internal" };
    }

    default:
      return { result: { error: `Unknown tool: ${toolName}` }, source: "unknown" };
  }
}

export async function runPricingAgent(
  query: string,
  onStep: (step: AgentStep) => void
): Promise<PricingEstimate> {
  const apiKeys = await getApiKeys();

  if (!apiKeys.anthropic) {
    throw new Error(
      "Anthropic API key not configured. Go to Settings to add it."
    );
  }

  const stepId = () => Math.random().toString(36).slice(2, 8);
  const marketData: MarketDataSnapshot = {};
  const dataSources: string[] = [];

  onStep({
    id: stepId(),
    type: "thinking",
    content: `Analyzing: "${query}"`,
    timestamp: Date.now(),
    status: "done",
  });

  // Start conversation with Claude
  type MessageContent =
    | { type: "text"; text: string }
    | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> }
    | { type: "tool_result"; tool_use_id: string; content: string };

  let messages: Array<{
    role: "user" | "assistant";
    content: string | MessageContent[];
  }> = [{ role: "user", content: query }];

  let maxIterations = 8; // Safety limit
  let finalText = "";

  while (maxIterations-- > 0) {
    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKeys.anthropic,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Claude API ${response.status}: ${errText}`);
    }

    const data = (await response.json()) as {
      content: Array<
        | { type: "text"; text: string }
        | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> }
      >;
      stop_reason: string;
    };

    // Process response content
    const toolUses: Array<{
      type: "tool_use";
      id: string;
      name: string;
      input: Record<string, unknown>;
    }> = [];

    for (const block of data.content) {
      if (block.type === "text") {
        finalText = block.text;
      } else if (block.type === "tool_use") {
        toolUses.push(block);
      }
    }

    // If no tool calls, we're done
    if (data.stop_reason === "end_turn" || toolUses.length === 0) {
      break;
    }

    // Add assistant message to conversation
    messages.push({ role: "assistant", content: data.content as MessageContent[] });

    // Execute tool calls
    const toolResults: MessageContent[] = [];
    for (const toolUse of toolUses) {
      const sid = stepId();
      onStep({
        id: sid,
        type: "tool_call",
        content: `Calling ${toolUse.name}...`,
        timestamp: Date.now(),
        toolName: toolUse.name,
        status: "running",
      });

      try {
        const { result, source } = await executeTool(
          toolUse.name,
          toolUse.input,
          apiKeys
        );

        // Store market data
        if (source === "kicksdb") {
          if (toolUse.name === "search_kicksdb") {
            if (!marketData.kicksdb) marketData.kicksdb = { product: null, prices: null };
            const results = result as Array<Record<string, unknown>>;
            if (results.length > 0) {
              marketData.kicksdb.product = results[0] as unknown as KicksDBData["product"];
            }
          } else if (toolUse.name === "get_kicksdb_prices") {
            if (!marketData.kicksdb) marketData.kicksdb = { product: null, prices: null };
            marketData.kicksdb.prices = result as KicksDBData["prices"];
          }
          if (!dataSources.includes("KicksDB")) dataSources.push("KicksDB");
        } else if (source === "ebay") {
          marketData.ebay = result as EbayData;
          if (!dataSources.includes("eBay")) dataSources.push("eBay");
        } else if (source === "internal") {
          marketData.internal = result as InternalData;
          if (!dataSources.includes("Internal")) dataSources.push("Internal");
        }

        const resultStr = JSON.stringify(result);
        onStep({
          id: sid,
          type: "tool_result",
          content: `${toolUse.name} returned ${resultStr.length > 100 ? resultStr.slice(0, 100) + "..." : resultStr}`,
          timestamp: Date.now(),
          toolName: toolUse.name,
          status: "done",
        });

        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: resultStr,
        });
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        onStep({
          id: sid,
          type: "tool_result",
          content: `${toolUse.name} failed: ${errMsg}`,
          timestamp: Date.now(),
          toolName: toolUse.name,
          status: "error",
        });

        toolResults.push({
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: JSON.stringify({ error: errMsg }),
        });
      }
    }

    // Add tool results to conversation
    messages.push({ role: "user", content: toolResults });
  }

  // Parse Claude's final response
  onStep({
    id: stepId(),
    type: "thinking",
    content: "Synthesizing pricing recommendation...",
    timestamp: Date.now(),
    status: "done",
  });

  let parsed;
  try {
    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = finalText;
    const jsonMatch = finalText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    } else {
      // Try to find raw JSON object
      const braceMatch = finalText.match(/\{[\s\S]*\}/);
      if (braceMatch) {
        jsonStr = braceMatch[0];
      }
    }
    parsed = JSON.parse(jsonStr);
  } catch {
    // If JSON parse fails, create a basic estimate from the text
    parsed = {
      parsed: { brand: "", model: "", colorway: "", size: "" },
      quick_sell: { price: 0, reasoning: "Could not parse agent response" },
      competitive: { price: 0, reasoning: "Could not parse agent response" },
      max_profit: { price: 0, reasoning: "Could not parse agent response" },
      confidence: 0,
      overall_reasoning: finalText,
    };
  }

  const estimate: PricingEstimate = {
    query,
    parsed: parsed.parsed ?? { brand: "", model: "", colorway: "", size: "" },
    quickSell: {
      price: parsed.quick_sell?.price ?? 0,
      label: "Quick Sell",
      timeframe: "1-3 days",
    },
    competitive: {
      price: parsed.competitive?.price ?? 0,
      label: "Competitive",
      timeframe: "1-2 weeks",
    },
    maxProfit: {
      price: parsed.max_profit?.price ?? 0,
      label: "Max Profit",
      timeframe: "30+ days",
    },
    confidence: parsed.confidence ?? 0,
    reasoning:
      parsed.overall_reasoning ??
      [
        parsed.quick_sell?.reasoning,
        parsed.competitive?.reasoning,
        parsed.max_profit?.reasoning,
      ]
        .filter(Boolean)
        .join("\n\n"),
    dataSources,
    marketData,
  };

  // Save to database
  await supabase.from("price_estimates").insert({
    query,
    parsed_brand: estimate.parsed.brand || null,
    parsed_model: estimate.parsed.model || null,
    parsed_colorway: estimate.parsed.colorway || null,
    parsed_size: estimate.parsed.size || null,
    quick_sell_price: estimate.quickSell.price || null,
    competitive_price: estimate.competitive.price || null,
    max_profit_price: estimate.maxProfit.price || null,
    confidence_score: estimate.confidence,
    reasoning: estimate.reasoning,
    data_sources: dataSources,
    market_data: marketData,
  });

  onStep({
    id: stepId(),
    type: "answer",
    content: "Pricing analysis complete!",
    timestamp: Date.now(),
    status: "done",
  });

  return estimate;
}
