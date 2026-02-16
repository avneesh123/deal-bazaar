# Sourcing Intelligence Feature (Future)

## Goal
Find trending sneakers and best buy prices across platforms including auction apps like Whatnot.

## Current Infrastructure
- **KicksDB API** — StockX pricing/sales data (search products, get prices by size)
- **eBay API** — Active listing search
- **Internal sales** — Deal Bazaar's own sales history
- **Claude AI agent** — Analyzes market data, recommends 3 pricing tiers

## Proposed Feature: "What's Hot + Where to Buy"

### 1. Trending Sneakers Tab (Admin)
- Use KicksDB to surface sneakers with rising prices / high volume
- Pull sneaker news/trends via web scraping or RSS
- Claude analyzes which sneakers have good flip margins

### 2. Best Buy Price Finder
Given a sneaker query, compare prices across:
- **StockX** (via KicksDB) — lowest ask
- **eBay** — active listings
- **Whatnot** — historical data from imported order CSVs
- Side-by-side comparison with margin calculation

### 3. Whatnot Price Database
- Whatnot has **no public API**
- Workaround: periodically import Whatnot order CSV (`order-report-*.csv`)
- Build a local database of purchase prices by seller, sneaker, size
- Track which sellers (stewsshoes, fulfilledbymama, fragmented_soles, etc.) consistently have deals
- Alert when a seller goes live with relevant inventory

### 4. Sourcing Recommendations
- Claude agent compares your cost basis vs market prices
- Recommends: "Buy X on eBay at $Y, sell for $Z on your site = W% margin"
- Factors in platform fees (StockX ~10%, eBay ~13%, our site 0%)

## Data Sources Summary
| Source | Access | Data |
|--------|--------|------|
| KicksDB/StockX | API (have key) | Market prices, sales history |
| eBay | API (have key) | Active listings, sold prices |
| Whatnot | CSV import | Personal purchase history |
| Internal | Supabase DB | Our sales, costs, margins |

## Implementation Priority
1. Whatnot CSV importer (parse and store in DB)
2. Price comparison view (KicksDB + eBay + Whatnot history)
3. Trending sneakers dashboard
4. Automated sourcing recommendations
