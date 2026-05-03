export type ProductCategory = "jewelry" | "sneakers";

export interface Product {
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  images: string[];
  specs: Record<string, string>;
  retailPrice?: number;
  priceSources?: { name: string; price: number | null; url: string }[];
  featured: boolean;
  tags: string[];
  createdAt?: string;
}

export const products: Product[] = [
  {
    "slug": "adidas-cloudfoam-pure-spw-white-coral",
    "name": "Adidas Cloudfoam Pure SPW White Coral",
    "price": 68,
    "currency": "USD",
    "category": "sneakers",
    "description": "The Adidas Cloudfoam Pure SPW in white with coral/pink accents. A lightweight, comfortable sneaker featuring Cloudfoam Plus cushioning and a breathable knit upper. The coral laces and heel tab add a pop of color. Brand new with tags and OG box.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-cloudfoam-pure-spw-white-coral/AI-Image-Editor-2026-02-14_17-44-58.jpg",
      "/images/products/adidas-cloudfoam-pure-spw-white-coral/AI-Image-Editor-2026-02-14_17-46-08.jpg"
    ],
    "specs": {
      "Size": "7.5",
      "Brand": "Adidas",
      "Model": "Cloudfoam Pure SPW",
      "Colorway": "White / Coral",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "adidas",
      "cloudfoam",
      "white",
      "coral",
      "womens",
      "running"
    ],
    "createdAt": "2026-02-15T03:14:51.947639+00:00"
  },
  {
    "slug": "adidas-campus-00s-dark-grey-kids",
    "name": "Adidas Campus 00s Dark Grey",
    "price": 52,
    "currency": "USD",
    "category": "sneakers",
    "description": "The Adidas Campus 00s in dark grey suede with white leather stripes and a gum sole. A modern take on the classic Campus silhouette with the trefoil logo on the tongue. Kids sizing. Brand new with tags and OG box.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-campus-00s-dark-grey-kids/AI-Image-Editor-2026-02-14_17-42-26.jpg",
      "/images/products/adidas-campus-00s-dark-grey-kids/AI-Image-Editor-2026-02-14_17-51-49.jpg"
    ],
    "specs": {
      "Size": "12K",
      "Brand": "Adidas",
      "Model": "Campus 00s",
      "Colorway": "Dark Grey / White / Gum",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "adidas",
      "campus",
      "grey",
      "kids",
      "suede",
      "gum sole"
    ],
    "createdAt": "2026-02-15T03:14:50.472037+00:00"
  },
  {
    "slug": "adidas-vl-court-2-mint-pink",
    "name": "Adidas VL Court 2.0 Mint Pink",
    "price": 52,
    "currency": "USD",
    "category": "sneakers",
    "description": "The Adidas VL Court 2.0 in a fresh mint green and pink colorway. A clean, retro-inspired court shoe with the iconic three stripes in soft pink against a mint upper. Brand new with tags and OG box.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-vl-court-2-mint-pink/AI-Image-Editor-2026-02-14_17-46-58.jpg"
    ],
    "specs": {
      "Size": "6.5",
      "Brand": "Adidas",
      "Model": "VL Court 2.0",
      "Colorway": "Mint / Pink",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "adidas",
      "vl court",
      "mint",
      "pink",
      "womens"
    ],
    "createdAt": "2026-02-15T03:14:48.787704+00:00"
  },
  {
    "slug": "moissanite-halo-ring",
    "name": "Moissanite Double Halo Swirl Ring",
    "price": 159,
    "currency": "USD",
    "category": "jewelry",
    "description": "A stunning sterling silver ring featuring a brilliant round moissanite center stone surrounded by a double halo of pavé-set micro stones. The elegant swirl band design adds a modern twist to a classic halo setting. Comes beautifully presented in a heart-shaped pink gift box — perfect for engagements, anniversaries, or a luxurious self-purchase.",
    "shortDescription": "Round moissanite with double halo, swirl band",
    "images": [
      "/images/products/jewelry/moissanite-halo-ring-1.jpg",
      "/images/products/jewelry/moissanite-halo-ring-2.jpg",
      "/images/products/jewelry/moissanite-halo-ring-3.jpg"
    ],
    "specs": {
      "Type": "Ring",
      "Brand": "DealBazaar",
      "Stone": "Moissanite",
      "Setting": "Double Halo Pavé",
      "Material": "Sterling Silver",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "ring",
      "moissanite",
      "halo",
      "silver",
      "engagement",
      "gift"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "makeup-charm-bangle",
    "name": "Makeup Charm Bangle",
    "price": 65,
    "currency": "USD",
    "category": "jewelry",
    "description": "A playful handcrafted silver bangle adorned with beautifully detailed makeup-themed charms — a miniature lipstick, eyeshadow palette, crystal heart, and a 'Soulmate' engraved tag. Each charm is hand-finished with enamel detail and crystal accents. Comes with a 'Handmade with Love' tag. A perfect gift for the beauty lover in your life.",
    "shortDescription": "Handcrafted silver bangle with makeup charms",
    "images": [
      "/images/products/jewelry/makeup-charm-bangle-1.jpg",
      "/images/products/jewelry/makeup-charm-bangle-2.jpg"
    ],
    "specs": {
      "Type": "Charm Bangle",
      "Brand": "DealBazaar",
      "Style": "Makeup / Beauty",
      "Material": "Silver Alloy",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "bangle",
      "charm",
      "makeup",
      "silver",
      "gift"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "purple-crystal-charm-bracelet",
    "name": "Purple Crystal Charm Bracelet",
    "price": 75,
    "currency": "USD",
    "category": "jewelry",
    "description": "An elegant silver snake chain bracelet loaded with stunning purple and amethyst crystal charms. Features a pavé crystal ball charm, faceted glass beads, and delicate enamel flower accents. The rich purple tones make this a standout statement piece for any occasion.",
    "shortDescription": "Silver snake chain with purple crystal charms",
    "images": [
      "/images/products/jewelry/purple-crystal-charm-bracelet-1.jpg",
      "/images/products/jewelry/purple-crystal-charm-bracelet-2.jpg"
    ],
    "specs": {
      "Type": "Charm Bracelet",
      "Brand": "DealBazaar",
      "Stone": "Amethyst Crystal",
      "Material": "Sterling Silver / Crystal",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "bracelet",
      "charm",
      "crystal",
      "purple",
      "amethyst",
      "silver"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "emerald-peacock-necklace-set",
    "name": "Emerald Peacock Necklace & Earring Set",
    "price": 189,
    "currency": "USD",
    "category": "jewelry",
    "description": "A breathtaking Victorian-inspired jewelry set featuring an elaborate emerald green crystal necklace with a stunning peacock pendant and matching jhumka drop earrings. The necklace showcases layers of sparkling green and clear crystals in an ornate gold-tone setting. The matching earrings feature cascading crystal drops. Perfect for weddings, formal events, or as a collector's statement piece.",
    "shortDescription": "Ornate emerald crystal necklace with peacock pendant & earrings",
    "images": [
      "/images/products/jewelry/emerald-peacock-necklace-set-1.jpg",
      "/images/products/jewelry/emerald-peacock-necklace-set-2.jpg",
      "/images/products/jewelry/emerald-peacock-necklace-set-3.jpg",
      "/images/products/jewelry/emerald-peacock-necklace-set-4.jpg"
    ],
    "specs": {
      "Type": "Necklace & Earring Set",
      "Brand": "DealBazaar",
      "Stone": "Emerald Crystal",
      "Style": "Victorian / Indian",
      "Material": "Gold-Tone Alloy / Crystal",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "necklace",
      "earrings",
      "set",
      "emerald",
      "peacock",
      "crystal",
      "victorian",
      "wedding"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "oval-radiance-cz-bracelet",
    "name": "Oval Radiance Cubic Zirconia Bracelet",
    "price": 89,
    "currency": "USD",
    "category": "jewelry",
    "description": "The Oval Radiance bracelet features a dazzling oval centerpiece encrusted with sparkling cubic zirconia stones, set in a polished silver-tone chain link band. The brilliant stones catch light from every angle, creating a radiant sparkle that elevates any outfit. Secure clasp closure ensures a comfortable and safe fit.",
    "shortDescription": "CZ-encrusted oval centerpiece on silver chain",
    "images": [
      "/images/products/jewelry/oval-radiance-cz-bracelet-1.jpg",
      "/images/products/jewelry/oval-radiance-cz-bracelet-2.jpg",
      "/images/products/jewelry/oval-radiance-cz-bracelet-3.jpg"
    ],
    "specs": {
      "Type": "Chain Bracelet",
      "Brand": "DealBazaar",
      "Stone": "Cubic Zirconia",
      "Material": "Sterling Silver / CZ",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "bracelet",
      "cz",
      "cubic zirconia",
      "silver",
      "oval"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "jaguar-panther-bangle",
    "name": "Jaguar Panther Sterling Silver Bangle",
    "price": 129,
    "currency": "USD",
    "category": "jewelry",
    "description": "A bold and striking S925 sterling silver bangle featuring an intricately detailed black panther/jaguar motif. The design showcases pavé-set cubic zirconia sections that contrast beautifully with the oxidized black panther detail. A powerful statement piece that commands attention. Stamped S925 for authenticity.",
    "shortDescription": "S925 silver bangle with black panther motif & CZ",
    "images": [
      "/images/products/jewelry/jaguar-panther-bangle-1.jpg",
      "/images/products/jewelry/jaguar-panther-bangle-2.jpg",
      "/images/products/jewelry/jaguar-panther-bangle-3.jpg"
    ],
    "specs": {
      "Type": "Bangle",
      "Brand": "DealBazaar",
      "Stone": "Cubic Zirconia",
      "Style": "Panther / Jaguar",
      "Material": "S925 Sterling Silver",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "bangle",
      "silver",
      "sterling",
      "panther",
      "jaguar",
      "cz",
      "s925"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "dragon-mesh-bracelet",
    "name": "Dragon Head Sterling Silver Mesh Bracelet",
    "price": 350,
    "currency": "USD",
    "category": "jewelry",
    "description": "An extraordinary sterling silver mesh bracelet crowned with an exquisitely detailed dragon head. The woven silver mesh band flows seamlessly into the sculpted dragon with piercing eyes and intricate scale work. This museum-quality piece is a conversation starter and a collector's dream. Heavy, solid construction with a premium feel.",
    "shortDescription": "Sterling silver mesh band with sculpted dragon head",
    "images": [
      "/images/products/jewelry/dragon-mesh-bracelet-1.jpg",
      "/images/products/jewelry/dragon-mesh-bracelet-2.jpg",
      "/images/products/jewelry/dragon-mesh-bracelet-3.jpg"
    ],
    "specs": {
      "Type": "Mesh Bracelet",
      "Brand": "DealBazaar",
      "Style": "Dragon",
      "Weight": "Heavy",
      "Material": "Sterling Silver",
      "Condition": "Brand New"
    },
    "featured": true,
    "tags": [
      "bracelet",
      "dragon",
      "silver",
      "sterling",
      "mesh",
      "luxury"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-yellow-ochre-sz9",
    "name": "Air Jordan 1 Retro High OG Yellow Ochre (Size 9)",
    "price": 260,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the 'Yellow Ochre' colorway — black leather quarter panels and Swoosh, bright yellow-ochre toe and side overlays, sail/cream Nike Air collar lining, sail midsole, gum-tinted outsole. Brand new with original Nike box. Style code FQ2941-701. Size US M 9.",
    "shortDescription": "Brand new with original Nike box",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-yellow-ochre-sz9/01-pair-on-box.jpg",
      "/images/products/air-jordan-1-retro-high-og-yellow-ochre-sz9/02-front.jpg",
      "/images/products/air-jordan-1-retro-high-og-yellow-ochre-sz9/03-side.jpg",
      "/images/products/air-jordan-1-retro-high-og-yellow-ochre-sz9/04-in-box.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Nike / Jordan",
      "Color": "Yellow Ochre / Black / Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New",
      "Style Code": "FQ2941-701"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "yellow-ochre",
      "yellow",
      "black",
      "size-9"
    ],
    "createdAt": "2026-05-03T00:17:38.402692+00:00"
  },
  {
    "slug": "adidas-avryn-black-pink-sz9",
    "name": "Adidas Avryn Black / Pink (Size 9)",
    "price": 70,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Avryn-style runner in black mesh / soft pink — black engineered mesh upper, soft pink heel cap and tongue/lace tabs, white 3-stripe accent, chunky speckled white midsole and translucent rubber outsole. Brand new with original Adidas box. Size US 9.",
    "shortDescription": "Brand new with original Adidas box",
    "images": [
      "/images/products/adidas-avryn-black-pink-sz9/01-pair-on-box.jpg",
      "/images/products/adidas-avryn-black-pink-sz9/02-front.jpg",
      "/images/products/adidas-avryn-black-pink-sz9/03-rear.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Adidas",
      "Color": "Black / Pink / White",
      "Model": "Avryn",
      "Source": "Whatnot — essensola pull #301",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "avryn",
      "runner",
      "black",
      "pink",
      "size-9",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T23:40:14.640975+00:00"
  },
  {
    "slug": "adidas-run-60s-3-0-black-grey-sz65",
    "name": "Adidas Run 60s 3.0 Black / Grey (Size 6.5)",
    "price": 60,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Run 60s 3.0 in Core Black / Grey / White — entry retro-runner with mesh + synthetic upper, white 3-stripes on the side panels, white EVA midsole, black rubber outsole. Brand new with original Adidas box. Size US 6.5.",
    "shortDescription": "Brand new with original Adidas box",
    "images": [
      "/images/products/adidas-run-60s-3-0-black-grey-sz65/01-pair.jpg",
      "/images/products/adidas-run-60s-3-0-black-grey-sz65/02-top.jpg",
      "/images/products/adidas-run-60s-3-0-black-grey-sz65/03-rear-on-box.jpg"
    ],
    "specs": {
      "Size": "6.5",
      "Brand": "Adidas",
      "Color": "Core Black / Grey / White",
      "Model": "Run 60s 3.0",
      "Source": "Whatnot — essensola pull #315",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "run-60s",
      "run-60s-3-0",
      "runner",
      "black",
      "grey",
      "size-6-5",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T23:14:41.795718+00:00"
  },
  {
    "slug": "london-fog-hamilton-black-memory-foam-sz95",
    "name": "London Fog Hamilton Black Memory Foam (Size 9.5)",
    "price": 40,
    "currency": "USD",
    "category": "sneakers",
    "description": "London Fog Collection 'Hamilton' hiking-style sneaker in tonal black — soft synthetic upper, memory-foam footbed, padded collar, lugged grip outsole. Lightweight everyday outdoor shoe. Brand new with original London Fog box. Size US M 9.5.",
    "shortDescription": "Brand new with original London Fog box",
    "images": [
      "/images/products/london-fog-hamilton-black-memory-foam-sz95/01-pair-on-box.jpg",
      "/images/products/london-fog-hamilton-black-memory-foam-sz95/02-front.jpg",
      "/images/products/london-fog-hamilton-black-memory-foam-sz95/03-rear-on-box.jpg"
    ],
    "specs": {
      "Size": "9.5",
      "Brand": "London Fog Collection",
      "Color": "Black",
      "Model": "Hamilton (245M)",
      "Source": "Whatnot — stewsshoes free-shoes pull #23",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "london-fog",
      "hamilton",
      "hiking",
      "outdoor",
      "memory-foam",
      "black",
      "size-9-5",
      "whatnot-pull",
      "free"
    ],
    "createdAt": "2026-05-02T23:01:55.053137+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-shadow-3y",
    "name": "Air Jordan 1 Retro High OG Shadow (3Y)",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the iconic Shadow colorway — black smooth leather toe and quarter panels with Light Smoke Grey side overlays, eyestay, and collar, white midsole, black rubber outsole. Brand new with original Nike box. Size 3Y (US Toddler — fits ages 5-7).",
    "shortDescription": "Brand new with original Nike box",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-shadow-3y/01-pair.jpg",
      "/images/products/air-jordan-1-retro-high-og-shadow-3y/02-front-on-box.jpg",
      "/images/products/air-jordan-1-retro-high-og-shadow-3y/03-rear-on-box.jpg"
    ],
    "specs": {
      "Size": "3Y",
      "Brand": "Nike / Jordan",
      "Color": "Shadow (Black / Light Smoke Grey / White)",
      "Model": "Air Jordan 1 Retro High OG",
      "Source": "Whatnot — sneakerhustle pull #65",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "shadow",
      "black",
      "grey",
      "toddler",
      "youth",
      "size-3y",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T22:46:54.575018+00:00"
  },
  {
    "slug": "q4-sports-g4-be2-ii-white-yellow-sz12",
    "name": "Q4 Sports G4 BE2-II White / Yellow (Size 12)",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports G4 BE2-II basketball mid in White / Yellow / Black — white mesh upper with black side overlays, bright yellow heel collar and outsole accents, Q4 Sports brand mark on the lateral side panel and tongue. Brand new with original Q4 Sports patterned box (lot #72). Style code 81821028622. Size US 12 (UK 11.5 / EU 45 / 28.6 cm).",
    "shortDescription": "Brand new with original Q4 Sports box",
    "images": [
      "/images/products/q4-sports-g4-be2-ii-white-yellow-sz12/01-pair.jpg",
      "/images/products/q4-sports-g4-be2-ii-white-yellow-sz12/02-front.jpg",
      "/images/products/q4-sports-g4-be2-ii-white-yellow-sz12/03-rear.jpg"
    ],
    "specs": {
      "EU": "45",
      "UK": "11.5",
      "Size": "12",
      "Brand": "Q4 Sports",
      "Color": "White / Yellow / Black",
      "Model": "G4 BE2-II",
      "Source": "Whatnot — sneakerhustle pull #72",
      "Condition": "Brand New",
      "Style Code": "81821028622"
    },
    "featured": false,
    "tags": [
      "q4-sports",
      "g4-be2-ii",
      "basketball",
      "mid-top",
      "white",
      "yellow",
      "size-12",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T22:36:13.418781+00:00"
  },
  {
    "slug": "tretorn-serve-white-grey-w7",
    "name": "Tretorn Serve White / Grey (Women's 7)",
    "price": 50,
    "currency": "USD",
    "category": "sneakers",
    "description": "Tretorn Serve in White / Grey — Swedish heritage tennis silhouette, all-white leather upper with subtle taupe-grey side stripe and matching heel cap, gold tonal Tretorn 'T' logo on the lateral side, and a clean white cupsole with gum welt. Women's US 7. Brand new with original Tretorn box. Style code 1827276.",
    "shortDescription": "Brand new with original Tretorn box",
    "images": [
      "/images/products/tretorn-serve-white-grey-w7/01-pair.jpg",
      "/images/products/tretorn-serve-white-grey-w7/02-top.jpg",
      "/images/products/tretorn-serve-white-grey-w7/03-rear-on-box.jpg"
    ],
    "specs": {
      "Size": "7W",
      "Brand": "Tretorn",
      "Color": "White / Grey",
      "Model": "Serve",
      "Source": "Whatnot pull #296",
      "Condition": "Brand New",
      "Style Code": "1827276"
    },
    "featured": false,
    "tags": [
      "tretorn",
      "serve",
      "tennis",
      "low-top",
      "white",
      "grey",
      "womens",
      "size-7",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T22:19:38.554023+00:00"
  },
  {
    "slug": "nike-nocta-air-zoom-drive-summit-white-sz12",
    "name": "Nike NOCTA Air Zoom Drive Summit White (Size 12)",
    "price": 145,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike x NOCTA Air Zoom Drive in the Summit White colorway — Drake's NOCTA collab take on a chunky-soled trainer. Tonal white mesh and synthetic upper, sculpted Summit White midsole, NOCTA woven heel pull tab, and the NOCTA snowflake mark on the lateral side. Brand new with original Nike box. Size US 12 (W 13.5 / UK 11 / EU 46 / 30 cm).",
    "shortDescription": "Brand new with original Nike box",
    "images": [
      "/images/products/nike-nocta-air-zoom-drive-summit-white-sz12/01-pair.jpg",
      "/images/products/nike-nocta-air-zoom-drive-summit-white-sz12/02-top.jpg",
      "/images/products/nike-nocta-air-zoom-drive-summit-white-sz12/03-rear.jpg"
    ],
    "specs": {
      "EU": "46",
      "UK": "11",
      "Size": "12",
      "Brand": "Nike",
      "Color": "Summit White",
      "Model": "NOCTA Air Zoom Drive",
      "Source": "Whatnot — stewsshoes pull #6",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "nocta",
      "drake",
      "air-zoom-drive",
      "summit-white",
      "white",
      "size-12",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T04:32:27.910103+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-gs-metallic-gold-7y",
    "name": "Air Jordan 1 Retro High OG GS Metallic Gold (Size 7Y)",
    "price": 145,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG GS in the White / Metallic Gold colorway — premium white tumbled leather upper with bright metallic-gold collar, eyestay, heel tab, and Wings logo, gold satin Nike Air tongue tag with hanging gold Jumpman charm. White rubber midsole, gum outsole. Brand new with original Nike box. Size 7Y (US Youth — fits women's US 8.5 / EU 40 / UK 6.5).",
    "shortDescription": "Brand new with original Nike box",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-gs-metallic-gold-7y/01-top.jpg",
      "/images/products/air-jordan-1-retro-high-og-gs-metallic-gold-7y/02-front.jpg",
      "/images/products/air-jordan-1-retro-high-og-gs-metallic-gold-7y/03-rear-on-box.jpg"
    ],
    "specs": {
      "EU": "40",
      "UK": "6.5",
      "Size": "7Y",
      "Brand": "Nike / Jordan",
      "Color": "White / Metallic Gold",
      "Model": "Air Jordan 1 Retro High OG GS",
      "Source": "Whatnot — stewsshoes pull #212",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "metallic-gold",
      "white",
      "gold",
      "gs",
      "youth",
      "size-7y",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T04:09:19.999512+00:00"
  },
  {
    "slug": "nike-wmns-legend-essential-2-light-soft-pink-w95",
    "name": "Nike Wmns Legend Essential 2 Light Soft Pink (W 9.5)",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Wmns Legend Essential 2 — women's training silhouette in the Light Soft Pink colorway. Pale pink mesh upper with a tonal pink Swoosh, contrasting orange-red heel stripe and tongue accent, black midsole arch, and a white foam outsole. Brand new with original Nike box. Style code CQ9545-600. Size US Women's 9.5 (≈ Men's US 8 / UK 7).",
    "shortDescription": "Brand new with original Nike box",
    "images": [
      "/images/products/nike-wmns-legend-essential-2-light-soft-pink-w95/01-pair.jpg",
      "/images/products/nike-wmns-legend-essential-2-light-soft-pink-w95/02-side.jpg",
      "/images/products/nike-wmns-legend-essential-2-light-soft-pink-w95/03-rear.jpg"
    ],
    "specs": {
      "Size": "9.5W",
      "Brand": "Nike",
      "Color": "Light Soft Pink",
      "Model": "Wmns Legend Essential 2",
      "Source": "Whatnot — fragmented_soles BW638",
      "Condition": "Brand New",
      "Style Code": "CQ9545-600"
    },
    "featured": false,
    "tags": [
      "nike",
      "legend-essential",
      "legend-essential-2",
      "training",
      "womens",
      "light-soft-pink",
      "pink",
      "size-9-5w",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T03:54:43.379276+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-sail-sz11-d1",
    "name": "Air Jordan 1 Retro High OG Sail (Size 11)",
    "price": 275,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the tonal Sail colorway — premium sail leather upper with subtle textured side panels, tonal sail Swoosh and Wings logo, sail collar and toe, classic red NIKE AIR tongue tags and red Air Jordan hangtag. Cream midsole and white rubber outsole. Brand new with original elephant-print box (box may show minor shipping damage). Size US 11.",
    "shortDescription": "Brand new with OG box (box may be damaged)",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-sail-sz11-d1/01-top.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail-sz11-d1/02-rear-on-box.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail-sz11-d1/03-tongue-detail.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike / Jordan",
      "Color": "Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Source": "Whatnot — stewsshoes 16 Oct 2025",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "sail",
      "cream",
      "off-white",
      "size-11",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T03:39:07.661889+00:00"
  },
  {
    "slug": "nike-vomero-5-total-orange-black-sz11",
    "name": "Nike Vomero 5 Total Orange / Black (Size 11)",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Vomero 5 in the Total Orange / Black / White colorway — early-2000s running heritage with chunky layered Phylon midsole, Zoom Air heel, breathable orange engineered mesh upper, black TPU support cage, and a chrome-finished diamond-pattern heel counter. Brand new with hangtag and original Nike box. Size US 11 (UK 10 / EU 45 / 29 cm).",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-vomero-5-total-orange-black-sz11/01-top.jpg",
      "/images/products/nike-vomero-5-total-orange-black-sz11/02-front.jpg",
      "/images/products/nike-vomero-5-total-orange-black-sz11/03-rear-on-box.jpg"
    ],
    "specs": {
      "EU": "45",
      "UK": "10",
      "Size": "11",
      "Brand": "Nike",
      "Color": "Total Orange / Black / White",
      "Model": "Vomero 5",
      "Source": "Whatnot — sneakerhustle pull #106",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "vomero",
      "vomero-5",
      "running",
      "y2k",
      "total-orange",
      "orange",
      "black",
      "size-11",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T03:19:39.637481+00:00"
  },
  {
    "slug": "adidas-ae-1-cloud-white-sz8-pre-owned",
    "name": "Adidas AE 1 Cloud White — Pre-Owned (Size 8)",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas AE 1 in the Cloud White colorway — Anthony Edwards' debut signature basketball shoe. Black engineered mesh upper, translucent / cloud-white bubble-textured Lightstrike Pro midsole, neon-green Adidas logo accents on the heel and tongue, and the signature 'A' brand mark on the lateral side panel. Pre-owned with original Adidas box (lot label BX949). Size US 8 (UK 7½ / EU 43⅓ / W 9).",
    "shortDescription": "Pre-owned with original Adidas box",
    "images": [
      "/images/products/adidas-ae-1-cloud-white-sz8-pre-owned/01-pair.jpg",
      "/images/products/adidas-ae-1-cloud-white-sz8-pre-owned/02-front.jpg",
      "/images/products/adidas-ae-1-cloud-white-sz8-pre-owned/03-rear-on-box.jpg"
    ],
    "specs": {
      "EU": "43⅓",
      "UK": "7.5",
      "Size": "8",
      "Brand": "Adidas",
      "Color": "Cloud White / Black",
      "Model": "AE 1",
      "Source": "Whatnot — fragmented_soles BX949",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "adidas",
      "ae-1",
      "anthony-edwards",
      "basketball",
      "signature",
      "cloud-white",
      "black",
      "size-8",
      "pre-owned",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T03:08:25.073366+00:00"
  },
  {
    "slug": "adidas-top-ten-hi-carolina-blue-sz12",
    "name": "Adidas Top Ten Hi Carolina Blue (Size 12)",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Top Ten Hi in the Carolina Blue / White colorway — heritage hardcourt high-top with all-blue leather upper, white 3-stripes on the lateral side, padded white collar wrap, and a tonal blue rubber outsole. Trefoil tongue patch with the original Top Ten basketball graphic. Brand new with original Adidas Originals box. Style code GW1616. Size US 12 (UK 11½ / EU 46⅔).",
    "shortDescription": "Brand new with original Adidas box",
    "images": [
      "/images/products/adidas-top-ten-hi-carolina-blue-sz12/01-front.jpg",
      "/images/products/adidas-top-ten-hi-carolina-blue-sz12/02-rear.jpg",
      "/images/products/adidas-top-ten-hi-carolina-blue-sz12/03-top.jpg"
    ],
    "specs": {
      "EU": "46⅔",
      "UK": "11½",
      "Size": "12",
      "Brand": "Adidas Originals",
      "Color": "Carolina Blue / White",
      "Model": "Top Ten Hi",
      "Condition": "Brand New",
      "Style Code": "GW1616"
    },
    "featured": false,
    "tags": [
      "adidas",
      "adidas-originals",
      "top-ten",
      "top-ten-hi",
      "high-top",
      "carolina-blue",
      "light-blue",
      "size-12"
    ],
    "createdAt": "2026-05-02T02:58:16.1139+00:00"
  },
  {
    "slug": "adidas-adizero-aruku-olive-brown-sz8",
    "name": "Adidas Adizero Aruku Olive / Brown (Size 8)",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Adizero Aruku — chunky retro-runner silhouette in an earthy olive / brown / cream colorway. Olive mesh and nubuck panels, brown leather toe and side overlays, cream EVA midsole, black rubber outsole. Brushed silver 3-stripes on the lateral side. Brand new with hangtag and original Adidas Originals box (lot label #311 on the side). Size US 8 (UK 7.5 / EU 43⅓ / W9).",
    "shortDescription": "Brand new with hangtag and OG box",
    "images": [
      "/images/products/adidas-adizero-aruku-olive-brown-sz8/01-pair.jpg",
      "/images/products/adidas-adizero-aruku-olive-brown-sz8/02-top.jpg",
      "/images/products/adidas-adizero-aruku-olive-brown-sz8/03-rear-on-box.jpg"
    ],
    "specs": {
      "EU": "43⅓",
      "UK": "7.5",
      "Size": "8",
      "Brand": "Adidas Originals",
      "Color": "Olive / Brown / Cream",
      "Model": "Adizero Aruku",
      "Source": "Whatnot — essensola pull #311",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "adidas-originals",
      "adizero",
      "adizero-aruku",
      "runner",
      "olive",
      "brown",
      "size-8",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T02:47:17.161736+00:00"
  },
  {
    "slug": "adidas-nizza-rj-black-canvas-sz8",
    "name": "Adidas Originals Nizza RJ Black Canvas (Size 8)",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Originals Nizza RJ in classic black canvas — heritage low-top with white 3-stripe stitching, cream rubber toe cap and cream vulcanized cupsole, gum tread, and a Nizza heel patch. Brand new with hangtag attached and original Adidas Originals box (lot label #293 on the side). Size US 8.",
    "shortDescription": "Brand new with hangtag and OG box",
    "images": [
      "/images/products/adidas-nizza-rj-black-canvas-sz8/01-front.jpg",
      "/images/products/adidas-nizza-rj-black-canvas-sz8/02-rear.jpg",
      "/images/products/adidas-nizza-rj-black-canvas-sz8/03-sole.jpg"
    ],
    "specs": {
      "Size": "8",
      "Brand": "Adidas Originals",
      "Color": "Black / Cream",
      "Model": "Nizza RJ",
      "Source": "Whatnot — waaaaalid_ pull #293",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "adidas-originals",
      "nizza",
      "nizza-rj",
      "low-top",
      "canvas",
      "black",
      "size-8",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-02T01:21:44.01268+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-mauve-sz10",
    "name": "Nike Air Jordan 1 Retro High OG Mauve (Size 10)",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the Mauve colorway — white leather toe and quarter panels with dusty mauve overlays on the Swoosh, collar, eyestay, and heel. White midsole, white rubber outsole, classic red NIKE AIR tongue tag, mauve laces. Brand new with original Nike kraft box. Size US 10 (EU 44 / UK 9 / 28 cm).",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-sz10/01-pair-on-box.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-sz10/02-top.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-sz10/03-rear.jpg"
    ],
    "specs": {
      "EU": "44",
      "UK": "9",
      "Size": "10",
      "Brand": "Nike / Jordan",
      "Color": "Mauve / White",
      "Model": "Air Jordan 1 Retro High OG",
      "Source": "Whatnot — stewsshoes 16 Oct 2025",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "mauve",
      "size-10",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-01T21:27:35.994926+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-sail-sz8",
    "name": "Air Jordan 1 Retro High OG Sail (Size 8)",
    "price": 275,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the tonal Sail colorway — premium sail leather upper with subtle textured side panels, tonal sail Swoosh and Wings logo, Sail collar and toe, classic red NIKE AIR tongue tags and red Air Jordan hangtag. Cream midsole and white rubber outsole. Brand new with original elephant-print box (box may show minor damage from shipping). Size US 8 (EU 41 / UK 7 / 26 cm).",
    "shortDescription": "Brand new with OG box (box may be damaged)",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-sail-sz8/01-side.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail-sz8/02-front.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail-sz8/03-rear.jpg"
    ],
    "specs": {
      "EU": "41",
      "UK": "7",
      "Size": "8",
      "Brand": "Nike / Jordan",
      "Color": "Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Source": "Whatnot — stewsshoes 16 Oct 2025",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "sail",
      "cream",
      "off-white",
      "size-8",
      "whatnot-pull"
    ],
    "createdAt": "2026-05-01T20:39:18.394535+00:00"
  },
  {
    "slug": "q4-sports-em55-i-black-gold-navy-uk-4-5",
    "name": "Q4 Sports EM55-I Black Gold Navy (UK 4.5)",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports EM55-I mid-top basketball sneaker in black / gold / navy. Black breathable mesh upper, gold metallic toe overlay and tongue tag, gold stylized monogram on the lateral side panel, and a navy heel wrap printed with a metallic-gold sneaker-icon pattern. Brand new with the original Q4 Sports patterned box (lot #83). Style code Q4-EM01. Sourced from a Whatnot $1 sneaker auction (sneakerhustle / 5 Trillion Shoes). Size UK 4.5 (≈ US 5).",
    "shortDescription": "Brand new with original Q4 Sports box",
    "images": [
      "/images/products/q4-sports-em55-i-black-gold-navy-uk-4-5/IMG_5710.jpg",
      "/images/products/q4-sports-em55-i-black-gold-navy-uk-4-5/IMG_5711.jpg",
      "/images/products/q4-sports-em55-i-black-gold-navy-uk-4-5/IMG_5712.jpg"
    ],
    "specs": {
      "Size": "UK 4.5",
      "Brand": "Q4 Sports",
      "Color": "Black / Gold / Navy",
      "Model": "EM55-I",
      "Source": "Whatnot — sneakerhustle pull #83",
      "Condition": "Brand New",
      "Style Code": "Q4-EM01"
    },
    "featured": false,
    "tags": [
      "q4-sports",
      "em55-i",
      "basketball",
      "mid-top",
      "black",
      "gold",
      "navy",
      "uk-4-5",
      "whatnot-pull"
    ],
    "createdAt": "2026-04-28T01:54:26.308283+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-team-red-gs",
    "name": "Air Jordan 1 Retro High OG GS Team Red",
    "price": 150,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG GS in the Team Red colorway — crisp white leather toe and quarter panels with a deep cherry-red Nike Swoosh, collar, and heel tab. Classic Wings logo on the heel, white midsole, red rubber outsole. Brand new with original box. Style code F01457160. Size 6Y (kids — fits small adult).",
    "shortDescription": "Brand new with original box",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-team-red-gs/IMG_5706.jpg",
      "/images/products/air-jordan-1-retro-high-og-team-red-gs/IMG_5707.jpg",
      "/images/products/air-jordan-1-retro-high-og-team-red-gs/IMG_5708.jpg"
    ],
    "specs": {
      "Size": "6Y",
      "Brand": "Nike",
      "Color": "White / Team Red",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New",
      "StyleCode": "F01457160"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro-high-og",
      "team-red",
      "varsity-red",
      "white",
      "red",
      "gs",
      "youth"
    ],
    "createdAt": "2026-04-27T01:53:51.539891+00:00"
  },
  {
    "slug": "nike-air-force-1-low-inside-out-green-bean",
    "name": "Nike Air Force 1 Low Inside Out Green Bean (Pre-Owned)",
    "price": 100,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Force 1 Low in the bold 'Inside Out' Green Bean colorway — grey nylon mesh and maroon/purple leather upper sitting on a black-and-white houndstooth-print midsole, with a vivid green leather lining that wraps the collar and tongue (NIKE AIR debossed in green). A standout 2014 'Year of the Snake'-era pair. Pre-owned, in good condition, comes with original box. Size 11.5 men's.",
    "shortDescription": "Pre-owned with original box",
    "images": [
      "/images/products/nike-air-force-1-low-inside-out-green-bean/IMG_hero_2026-04-26.jpg",
      "/images/products/nike-air-force-1-low-inside-out-green-bean/IMG_5702.jpg",
      "/images/products/nike-air-force-1-low-inside-out-green-bean/IMG_5703.jpg"
    ],
    "specs": {
      "Size": "11.5",
      "Brand": "Nike",
      "Color": "Inside Out / Green Bean (Grey / Maroon / Green)",
      "Model": "Air Force 1 Low",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "air-force-1",
      "af1",
      "inside-out",
      "green-bean",
      "year-of-the-snake",
      "pre-owned",
      "maroon",
      "green"
    ],
    "createdAt": "2026-04-27T01:35:21.964158+00:00"
  },
  {
    "slug": "air-jordan-6-retro-red-oreo-pre-owned",
    "name": "Air Jordan 6 Retro Red Oreo (Pre-Owned)",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 6 Retro in the Red Oreo colorway — white leather upper with red speckled accents and red lace lock. Comes with original box (red speckled). Pre-owned, in good condition. Size 8.5 men's.",
    "shortDescription": "Pre-owned with original box",
    "images": [
      "/images/products/air-jordan-6-retro-red-oreo-pre-owned/IMG_1961.jpg",
      "/images/products/air-jordan-6-retro-red-oreo-pre-owned/IMG_1959.jpg"
    ],
    "specs": {
      "Size": "8.5",
      "Brand": "Nike",
      "Color": "White / Red (Red Oreo)",
      "Model": "Air Jordan 6 Retro",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-6",
      "retro",
      "red",
      "oreo",
      "pre-owned"
    ],
    "createdAt": "2026-04-26T01:10:11.382916+00:00"
  },
  {
    "slug": "random-pull-black-wave-sneaker",
    "name": "Random Pull Black Wave Sneaker",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Athletic high-top in black with a tonal white wave pattern across the upper, white laces, and translucent sole. From a Whatnot live $1 random pull featuring On Cloud, Nike, Hoka, and Adidas inventory.",
    "shortDescription": "Brand new — Whatnot $1 random pull",
    "images": [
      "/images/products/random-pull-black-wave-sneaker/IMG_1953.jpg",
      "/images/products/random-pull-black-wave-sneaker/IMG_1954.jpg",
      "/images/products/random-pull-black-wave-sneaker/IMG_1955.jpg"
    ],
    "specs": {
      "Brand": "Random Pull",
      "Color": "Black / White",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "random-pull",
      "black",
      "white",
      "athletic",
      "high-top"
    ],
    "createdAt": "2026-04-26T01:10:08.319311+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-white-red",
    "name": "Air Jordan 1 Retro High White / Red",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High in white leather with red Nike Swoosh and red interior collar. Detailed red contrast stitching across the upper. Brand new with original box, comes with the StockX green Verified Authentic tag attached.",
    "shortDescription": "Brand new — StockX verified authentic",
    "images": [
      "/images/products/air-jordan-1-retro-high-white-red/IMG_1947.jpg",
      "/images/products/air-jordan-1-retro-high-white-red/IMG_1949.jpg",
      "/images/products/air-jordan-1-retro-high-white-red/IMG_1950.jpg"
    ],
    "specs": {
      "Brand": "Nike",
      "Color": "White / Red",
      "Model": "Air Jordan 1 Retro High",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "retro",
      "white",
      "red",
      "high-top",
      "stockx"
    ],
    "createdAt": "2026-04-26T01:10:06.764316+00:00"
  },
  {
    "slug": "under-armour-kids-light-blue-4y",
    "name": "Under Armour Kids Light Blue Sneaker",
    "price": 35,
    "currency": "USD",
    "category": "sneakers",
    "description": "Under Armour kids sneaker in light blue with white midsole. A breathable mesh runner with the classic UA logo on the tongue. Brand new from a Whatnot live random pull. Size 4Y (kids).",
    "shortDescription": "Brand new — Whatnot random pull",
    "images": [
      "/images/products/under-armour-kids-light-blue-4y/IMG_1943.jpg",
      "/images/products/under-armour-kids-light-blue-4y/IMG_1944.jpg",
      "/images/products/under-armour-kids-light-blue-4y/IMG_1945.jpg"
    ],
    "specs": {
      "Size": "4Y",
      "Brand": "Under Armour",
      "Color": "Light Blue / White",
      "Model": "Random Pull",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "under-armour",
      "kids",
      "youth",
      "light-blue",
      "running"
    ],
    "createdAt": "2026-04-26T01:10:03.643423+00:00"
  },
  {
    "slug": "adidas-top-ten-hi-white-navy",
    "name": "Adidas Top Ten Hi White / Navy",
    "price": 65,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Top Ten Hi in white leather with navy three-stripes and red trim accents. A retro basketball silhouette from the Adidas Originals archive, featuring the classic Top Ten branding on the tongue. Brand new with original box and tags. Size 11.",
    "shortDescription": "Brand new with original box",
    "images": [
      "/images/products/adidas-top-ten-hi-white-navy/IMG_1938.jpg",
      "/images/products/adidas-top-ten-hi-white-navy/IMG_1939.jpg",
      "/images/products/adidas-top-ten-hi-white-navy/IMG_1940.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Adidas",
      "Color": "White / Navy / Red",
      "Model": "Top Ten Hi",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "top-ten",
      "originals",
      "retro",
      "white",
      "navy",
      "high-top"
    ],
    "createdAt": "2026-04-26T01:09:59.197998+00:00"
  },
  {
    "slug": "nike-dunk-low-light-carbon",
    "name": "Nike Dunk Low Light Carbon",
    "price": 70,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Dunk Low in Light Carbon colorway. Features a clean white leather base with light carbon grey overlays, dark grey Swoosh, padded collar, and classic Dunk Low silhouette. Pre-owned in good condition with OG box. Size 8.5.",
    "shortDescription": "Pre-owned with OG box",
    "images": [
      "/images/products/nike-dunk-low-light-carbon/nike-dunk-low-light-carbon_2.jpg"
    ],
    "specs": {
      "Size": "8.5",
      "Brand": "Nike",
      "Color": "Light Carbon/White",
      "Model": "Dunk Low",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "dunk-low",
      "light-carbon",
      "grey",
      "white",
      "classic"
    ],
    "createdAt": "2026-03-01T00:23:26.380949+00:00"
  },
  {
    "slug": "air-jordan-1-mid-mauve",
    "name": "Air Jordan 1 Mid Mauve",
    "price": 120,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Mid in Mauve colorway. Features a premium leather upper in mauve/dusty rose with sail white panels, classic Wings logo, Nike Air branding on the tongue, and a white midsole with dark outsole. Brand new with OG box. Size 10.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/air-jordan-1-mid-mauve/air-jordan-1-mid-mauve_1.jpg",
      "/images/products/air-jordan-1-mid-mauve/air-jordan-1-mid-mauve_2.jpg",
      "/images/products/air-jordan-1-mid-mauve/air-jordan-1-mid-mauve_3.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Nike/Jordan",
      "Color": "Mauve/Sail",
      "Model": "Air Jordan 1 Mid",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan-1",
      "mid",
      "mauve",
      "sail",
      "pink",
      "leather"
    ],
    "createdAt": "2026-03-01T00:23:24.49797+00:00"
  },
  {
    "slug": "and1-attack-mid-black-silver",
    "name": "And1 Attack Mid Black Silver",
    "price": 30,
    "currency": "USD",
    "category": "sneakers",
    "description": "And1 Attack Mid basketball shoe in Black/Silver colorway. Features a striking exoskeleton cage structure on the forefoot, synthetic leather upper, padded collar, and durable rubber outsole. Pre-owned in good condition. Size 10.",
    "shortDescription": "Pre-owned — basketball shoe",
    "images": [
      "/images/products/and1-attack-mid-black-silver/and1-attack-mid-black-silver_1.jpg",
      "/images/products/and1-attack-mid-black-silver/and1-attack-mid-black-silver_2.jpg",
      "/images/products/and1-attack-mid-black-silver/and1-attack-mid-black-silver_3.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "And1",
      "Color": "Black/Silver",
      "Model": "Attack Mid",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "and1",
      "basketball",
      "mid",
      "black",
      "silver"
    ],
    "createdAt": "2026-03-01T00:23:22.354625+00:00"
  },
  {
    "slug": "air-jordan-4-fire-red-gs",
    "name": "Air Jordan 4 Retro Fire Red GS",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 4 Retro in Fire Red colorway (Grade School). Features the iconic white leather upper with black and fire red accents, visible Air unit in the heel, mesh panels on the sides, and classic Jordan 4 wing eyelets. Pre-owned in good condition. GS Size 3Y.",
    "shortDescription": "Pre-owned — Grade School size",
    "images": [
      "/images/products/air-jordan-4-fire-red-gs/air-jordan-4-fire-red-gs_1.jpg",
      "/images/products/air-jordan-4-fire-red-gs/air-jordan-4-fire-red-gs_2.jpg",
      "/images/products/air-jordan-4-fire-red-gs/air-jordan-4-fire-red-gs_3.jpg"
    ],
    "specs": {
      "Size": "3Y (GS)",
      "Brand": "Nike/Jordan",
      "Color": "White/Fire Red/Black",
      "Model": "Air Jordan 4 Retro Fire Red",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan-4",
      "fire-red",
      "retro",
      "gs",
      "grade-school",
      "white",
      "red"
    ],
    "createdAt": "2026-03-01T00:23:19.462421+00:00"
  },
  {
    "slug": "puma-rs-dreamer-j-cole-ebony-ivory",
    "name": "Puma RS Dreamer J. Cole Ebony & Ivory",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Puma RS Dreamer J. Cole in Ebony & Ivory colorway (Style CB677). A signature basketball shoe from the Dreamville collaboration featuring a white knit upper with black Puma FormStrip, RS cushioning technology, and sleek low-profile design. Brand new with OG box. Size 12.",
    "shortDescription": "Brand new with OG box — J. Cole collaboration",
    "images": [
      "/images/products/puma-rs-dreamer-j-cole-ebony-ivory/puma-rs-dreamer-j-cole-ebony-ivory_1.jpg",
      "/images/products/puma-rs-dreamer-j-cole-ebony-ivory/puma-rs-dreamer-j-cole-ebony-ivory_2.jpg",
      "/images/products/puma-rs-dreamer-j-cole-ebony-ivory/puma-rs-dreamer-j-cole-ebony-ivory_3.jpg",
      "/images/products/puma-rs-dreamer-j-cole-ebony-ivory/puma-rs-dreamer-j-cole-ebony-ivory_4.jpg"
    ],
    "specs": {
      "Size": "12",
      "Brand": "Puma",
      "Color": "Ebony & Ivory (White/Black)",
      "Model": "RS Dreamer J. Cole",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "puma",
      "rs-dreamer",
      "j-cole",
      "dreamville",
      "collaboration",
      "basketball",
      "white",
      "black"
    ],
    "createdAt": "2026-03-01T00:23:15.63856+00:00"
  },
  {
    "slug": "adidas-run-70s-2-0-j-navy-blue",
    "name": "Adidas Run 70s 2.0 J Navy Blue",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Run 70s 2.0 J in Navy Blue colorway (Style JI2267). A junior retro-inspired running shoe with navy suede and mesh upper, classic three white stripes, gum rubber outsole, and cushioned midsole. Brand new with tags and OG box. Junior Size 6.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-run-70s-2-0-j-navy-blue/adidas-run-70s-2-0-j-navy-blue_1.jpg",
      "/images/products/adidas-run-70s-2-0-j-navy-blue/adidas-run-70s-2-0-j-navy-blue_2.jpg"
    ],
    "specs": {
      "Size": "6 (Junior)",
      "Brand": "Adidas",
      "Color": "Navy Blue/White",
      "Model": "Run 70s 2.0 J",
      "Condition": "Brand New",
      "Style Code": "JI2267"
    },
    "featured": false,
    "tags": [
      "adidas",
      "run-70s",
      "retro",
      "navy",
      "blue",
      "junior",
      "kids"
    ],
    "createdAt": "2026-03-01T00:23:12.991357+00:00"
  },
  {
    "slug": "adidas-samba-62-camel-tan",
    "name": "Adidas Samba 62 Camel",
    "price": 70,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Samba 62 in Camel/Tan suede colorway. A retro-inspired version of the classic Samba featuring premium tan suede upper, signature three white stripes, vintage-style polka dot outsole, and gum-tone accents. Brand new with OG box. Size 9.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/adidas-samba-62-camel-tan/adidas-samba-62-camel-tan_1.jpg",
      "/images/products/adidas-samba-62-camel-tan/adidas-samba-62-camel-tan_2.jpg",
      "/images/products/adidas-samba-62-camel-tan/adidas-samba-62-camel-tan_3.jpg",
      "/images/products/adidas-samba-62-camel-tan/adidas-samba-62-camel-tan_4.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Adidas",
      "Color": "Camel/Tan",
      "Model": "Samba 62",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "samba",
      "samba-62",
      "retro",
      "camel",
      "tan",
      "suede"
    ],
    "createdAt": "2026-03-01T00:23:11.890907+00:00"
  },
  {
    "slug": "nike-dunk-high-championship-red",
    "name": "Nike Dunk High Championship Red",
    "price": 75,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Dunk High in the iconic Championship Red colorway. Features a red and white leather upper with classic Dunk High silhouette, Nike branding on tongue and heel, and padded collar for comfort. Pre-owned in good condition with OG box. Size 10.",
    "shortDescription": "Pre-owned with OG box",
    "images": [
      "/images/products/nike-dunk-high-championship-red/nike-dunk-high-championship-red_1.jpg",
      "/images/products/nike-dunk-high-championship-red/nike-dunk-high-championship-red_2.jpg",
      "/images/products/nike-dunk-high-championship-red/nike-dunk-high-championship-red_3.jpg",
      "/images/products/nike-dunk-high-championship-red/nike-dunk-high-championship-red_4.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Nike",
      "Color": "Championship Red/White",
      "Model": "Dunk High",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "dunk-high",
      "championship-red",
      "red",
      "white",
      "classic"
    ],
    "createdAt": "2026-03-01T00:23:07.441943+00:00"
  },
  {
    "slug": "new-balance-fuelcell-supercomp-elite-v4-volt",
    "name": "New Balance FuelCell SuperComp Elite v4 Volt",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "New Balance FuelCell SuperComp Elite v4 in Volt/Orange colorway (Style NBCELL44). A high-performance carbon-plated racing shoe with energy-returning FuelCell midsole, lightweight upper with engineered support, and bold neon volt/orange design. Brand new with OG box. Size 10.5.",
    "shortDescription": "Brand new with OG box — elite racing shoe",
    "images": [
      "/images/products/new-balance-fuelcell-supercomp-elite-v4-volt/new-balance-fuelcell-supercomp-elite-v4-volt_1.jpg",
      "/images/products/new-balance-fuelcell-supercomp-elite-v4-volt/new-balance-fuelcell-supercomp-elite-v4-volt_2.jpg",
      "/images/products/new-balance-fuelcell-supercomp-elite-v4-volt/new-balance-fuelcell-supercomp-elite-v4-volt_3.jpg",
      "/images/products/new-balance-fuelcell-supercomp-elite-v4-volt/new-balance-fuelcell-supercomp-elite-v4-volt_4.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "New Balance",
      "Color": "Volt/Orange",
      "Model": "FuelCell SuperComp Elite v4",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "new-balance",
      "fuelcell",
      "supercomp-elite",
      "racing",
      "volt",
      "orange",
      "carbon-plate"
    ],
    "createdAt": "2026-03-01T00:23:02.172127+00:00"
  },
  {
    "slug": "adidas-kapur-flow-white-grey",
    "name": "Adidas Kapur Flow White Grey",
    "price": 40,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Kapur Flow in White/Grey colorway (Style ID6640). A lightweight running shoe with a breathable heathered knit upper, Adidas branding on the tongue and heel, and a cushioned EVA midsole with ribbed texture. Brand new with tags and OG box. Size 6.5.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-kapur-flow-white-grey/adidas-kapur-flow-white-grey_1.jpg",
      "/images/products/adidas-kapur-flow-white-grey/adidas-kapur-flow-white-grey_2.jpg",
      "/images/products/adidas-kapur-flow-white-grey/adidas-kapur-flow-white-grey_3.jpg"
    ],
    "specs": {
      "Size": "6.5",
      "Brand": "Adidas",
      "Color": "White/Grey",
      "Model": "Kapur Flow",
      "Condition": "Brand New",
      "Style Code": "ID6640"
    },
    "featured": false,
    "tags": [
      "adidas",
      "kapur-flow",
      "running",
      "white",
      "grey",
      "knit"
    ],
    "createdAt": "2026-02-23T04:52:52.614426+00:00"
  },
  {
    "slug": "nike-air-trainer-sc-high-white-gym-red",
    "name": "Nike Air Trainer SC High White Gym Red",
    "price": 115,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Trainer SC High in White/Black/Gym Red colorway. A classic Bo Jackson cross-training silhouette featuring a white leather upper with black and red overlays, bold 'NIKE' heel branding, perforated toe box, and a sturdy rubber outsole. Pre-owned in good condition. Size 10.",
    "shortDescription": "Pre-owned — classic Bo Jackson trainer",
    "images": [
      "/images/products/nike-air-trainer-sc-high-white-gym-red/nike-air-trainer-sc-high-white-gym-red_1.jpg",
      "/images/products/nike-air-trainer-sc-high-white-gym-red/nike-air-trainer-sc-high-white-gym-red_2.jpg",
      "/images/products/nike-air-trainer-sc-high-white-gym-red/nike-air-trainer-sc-high-white-gym-red_3.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Nike",
      "Color": "White/Black/Gym Red",
      "Model": "Air Trainer SC High",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "air-trainer-sc",
      "high",
      "white",
      "gym-red",
      "bo-jackson",
      "classic"
    ],
    "createdAt": "2026-02-23T04:52:50.443767+00:00"
  },
  {
    "slug": "adidas-nmd-human-race-teal",
    "name": "Pharrell x Adidas NMD Human Race Teal",
    "price": 125,
    "currency": "USD",
    "category": "sneakers",
    "description": "Pharrell Williams x Adidas NMD Human Race in Teal/Green colorway (Style Q46613). An iconic collaboration featuring a teal Primeknit upper with bold white 'Human Race' lettering, Boost midsole for responsive cushioning, and NMD-style plugs. Pre-owned in good condition with OG box. Size 10.",
    "shortDescription": "Pre-owned with OG box",
    "images": [
      "/images/products/adidas-nmd-human-race-teal/adidas-nmd-human-race-teal_1.jpg",
      "/images/products/adidas-nmd-human-race-teal/adidas-nmd-human-race-teal_2.jpg",
      "/images/products/adidas-nmd-human-race-teal/adidas-nmd-human-race-teal_3.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Adidas x Pharrell Williams",
      "Color": "Teal/Green",
      "Model": "NMD Human Race",
      "Condition": "Pre-Owned",
      "Style Code": "Q46613"
    },
    "featured": false,
    "tags": [
      "adidas",
      "pharrell",
      "nmd",
      "human-race",
      "teal",
      "boost",
      "collaboration"
    ],
    "createdAt": "2026-02-23T04:52:47.967531+00:00"
  },
  {
    "slug": "air-jordan-2-retro-se-white-gym-red",
    "name": "Air Jordan 2 Retro SE White Gym Red",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Women's Air Jordan 2 Retro SE in White/Black/Gym Red colorway (Style DQ0558-160). A premium mid-top silhouette featuring smooth white leather upper with black and gym red accents, perforated toe box, NIKE heel tabs, signature hangtag, and extra white laces. Brand new with tags and OG box. Women's Size 10.5 (Men's 9).",
    "shortDescription": "Brand new with tags + hangtag + extra laces",
    "images": [
      "/images/products/air-jordan-2-retro-se-white-gym-red/air-jordan-2-retro-se-white-gym-red_1.jpg",
      "/images/products/air-jordan-2-retro-se-white-gym-red/air-jordan-2-retro-se-white-gym-red_2.jpg",
      "/images/products/air-jordan-2-retro-se-white-gym-red/air-jordan-2-retro-se-white-gym-red_3.jpg"
    ],
    "specs": {
      "Size": "10.5W (9M)",
      "Brand": "Nike/Jordan",
      "Color": "White/Black/Gym Red",
      "Model": "Air Jordan 2 Retro SE",
      "Condition": "Brand New",
      "Style Code": "DQ0558-160"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan-2",
      "retro",
      "white",
      "gym-red",
      "womens"
    ],
    "createdAt": "2026-02-23T04:52:45.588371+00:00"
  },
  {
    "slug": "adidas-bad-bunny-campus-chalky-brown",
    "name": "Adidas Bad Bunny Campus Chalky Brown",
    "price": 145,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas x Bad Bunny Campus 'Chalky Brown' (Style ID2529). A premium collaboration featuring dusty pink/brown suede upper with tonal brown three-stripe branding, padded leather collar, cream rubber cupsole, and signature Bad Bunny eye logo on the tongue. Includes dust bag and extra brown leather laces. Brand new with OG box. Size 9.5.",
    "shortDescription": "Brand new with OG box + dust bag + extra laces",
    "images": [
      "/images/products/adidas-bad-bunny-campus-chalky-brown/adidas-bad-bunny-campus-chalky-brown_1.jpg",
      "/images/products/adidas-bad-bunny-campus-chalky-brown/adidas-bad-bunny-campus-chalky-brown_2.jpg",
      "/images/products/adidas-bad-bunny-campus-chalky-brown/adidas-bad-bunny-campus-chalky-brown_3.jpg"
    ],
    "specs": {
      "Size": "9.5",
      "Brand": "Adidas x Bad Bunny",
      "Color": "Chalky Brown/Supcolor/White",
      "Model": "Campus",
      "Condition": "Brand New",
      "Style Code": "ID2529"
    },
    "featured": false,
    "tags": [
      "adidas",
      "bad-bunny",
      "campus",
      "chalky-brown",
      "collaboration",
      "suede"
    ],
    "createdAt": "2026-02-23T04:03:47.940148+00:00"
  },
  {
    "slug": "adidas-jogit-m-core-black",
    "name": "Adidas Jogit M Core Black ortholite",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Jogit M in Core Black with grey three-stripe overlays and speckled sole detail (Style JR0863). A versatile running shoe featuring knit upper, OrthoLite comfort insole, and durable rubber outsole. Brand new with tags and OG box. Size 11.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-jogit-m-core-black/adidas-jogit-m-core-black_1.jpg",
      "/images/products/adidas-jogit-m-core-black/adidas-jogit-m-core-black_2.jpg",
      "/images/products/adidas-jogit-m-core-black/adidas-jogit-m-core-black_3.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Adidas",
      "Color": "Core Black/Grey",
      "Model": "Jogit M",
      "Condition": "Brand New",
      "Style Code": "JR0863"
    },
    "featured": false,
    "tags": [
      "adidas",
      "jogit",
      "running",
      "black",
      "grey",
      "ortholite"
    ],
    "createdAt": "2026-02-23T04:03:46.409476+00:00"
  },
  {
    "slug": "nike-revolution-7-hot-fuchsia",
    "name": "Nike Revolution 7 Hot Fuchsia",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Revolution 7 in Hot Fuchsia/Metallic Red Bronze colorway (Style FB2208-501). A lightweight women's running shoe with breathable mesh upper, Nike Comfort Footbed insole, and cushioned midsole. Brand new with tags and OG box. Women's Size 6.5 (Men's 5).",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/nike-revolution-7-hot-fuchsia/nike-revolution-7-hot-fuchsia_1.jpg",
      "/images/products/nike-revolution-7-hot-fuchsia/nike-revolution-7-hot-fuchsia_2.jpg",
      "/images/products/nike-revolution-7-hot-fuchsia/nike-revolution-7-hot-fuchsia_3.jpg"
    ],
    "specs": {
      "Size": "6.5W (5M)",
      "Brand": "Nike",
      "Color": "Hot Fuchsia/Metallic Red Bronze",
      "Model": "Revolution 7",
      "Condition": "Brand New",
      "Style Code": "FB2208-501"
    },
    "featured": false,
    "tags": [
      "nike",
      "revolution-7",
      "fuchsia",
      "pink",
      "running",
      "womens"
    ],
    "createdAt": "2026-02-23T04:03:44.433551+00:00"
  },
  {
    "slug": "nike-dunk-low-se-animal-pack-white",
    "name": "Nike Dunk Low SE Animal Pack White",
    "price": 89,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Dunk Low SE 'Animal Pack' in White with leopard print Swoosh and gold glitter heel accents. A clean white leather upper paired with eye-catching animal print details on the Swoosh for a bold yet versatile look. Brand new with OG box. Women's Size 8 (Men's 6.5).",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-dunk-low-se-animal-pack-white/nike-dunk-low-se-animal-pack-white_1.jpg",
      "/images/products/nike-dunk-low-se-animal-pack-white/nike-dunk-low-se-animal-pack-white_2.jpg",
      "/images/products/nike-dunk-low-se-animal-pack-white/nike-dunk-low-se-animal-pack-white_3.jpg"
    ],
    "specs": {
      "Size": "8W (6.5M)",
      "Brand": "Nike",
      "Color": "White/Animal Pack",
      "Model": "Dunk Low SE",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "dunk",
      "low",
      "animal-pack",
      "leopard",
      "white",
      "womens"
    ],
    "createdAt": "2026-02-23T01:30:26.149814+00:00"
  },
  {
    "slug": "air-jordan-1-high-union-woven-sail",
    "name": "Air Jordan 1 High OG Union Woven Sail",
    "price": 165,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 High OG x Union LA in the Woven Sail colorway. A premium collaboration featuring cream/sail leather upper with intricate woven detailing on the midsole, teal contrast stitching, grey Swoosh overlays, and 'PS Reserve' hangtag. Nike Air tongue labels and Wings logo. Brand new with OG box. Size 8.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/air-jordan-1-high-union-woven-sail/air-jordan-1-high-union-woven-sail_1.jpg",
      "/images/products/air-jordan-1-high-union-woven-sail/air-jordan-1-high-union-woven-sail_2.jpg",
      "/images/products/air-jordan-1-high-union-woven-sail/air-jordan-1-high-union-woven-sail_3.jpg"
    ],
    "specs": {
      "Size": "8",
      "Brand": "Nike/Jordan x Union LA",
      "Color": "Woven Sail/Cream",
      "Model": "Air Jordan 1 High OG",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan-1",
      "union",
      "woven",
      "sail",
      "cream",
      "high-og",
      "collaboration"
    ],
    "createdAt": "2026-02-23T01:30:23.162686+00:00"
  },
  {
    "slug": "nike-sb-blazer-low-qs-lance-mountain-black",
    "name": "Nike SB Blazer Low QS Lance Mountain Black",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike SB Zoom Blazer Low QS 'Lance Mountain' in Black/Metallic Silver (Style HJ6703-001). A collaboration with legendary skateboarder Lance Mountain, featuring premium black leather upper, metallic silver Swoosh, embossed logo on the tongue, and Nike SB Zoom Air insole. Includes extra insole and Nike SB sticker. Brand new with OG box. Size 10.5.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-sb-blazer-low-qs-lance-mountain-black/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-24-10.jpg",
      "/images/products/nike-sb-blazer-low-qs-lance-mountain-black/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-24-58.jpg",
      "/images/products/nike-sb-blazer-low-qs-lance-mountain-black/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-25-29.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Nike SB",
      "Color": "Black/Metallic Silver (Lance Mountain)",
      "Model": "Blazer Low QS",
      "Condition": "Brand New",
      "Style Code": "HJ6703-001"
    },
    "featured": false,
    "tags": [
      "nike",
      "nike-sb",
      "blazer",
      "low",
      "lance-mountain",
      "black",
      "skateboarding"
    ],
    "createdAt": "2026-02-22T20:47:50.627399+00:00"
  },
  {
    "slug": "adidas-handball-spezial-green-yellow",
    "name": "Adidas Handball Spezial Green/Yellow",
    "price": 65,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Handball Spezial in Green/Yellow colorway. A retro handball silhouette from the Adidas Originals archive, featuring green suede upper with bold yellow three-stripe branding, gum sole, and gold Trefoil insole. Brand new with OG box. Size 10.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/adidas-handball-spezial-green-yellow/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-14-02.jpg",
      "/images/products/adidas-handball-spezial-green-yellow/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-14-45.jpg",
      "/images/products/adidas-handball-spezial-green-yellow/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-16-15.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Adidas",
      "Color": "Green/Yellow",
      "Model": "Handball Spezial",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "handball-spezial",
      "originals",
      "retro",
      "green",
      "yellow",
      "gum"
    ],
    "createdAt": "2026-02-22T20:47:48.66277+00:00"
  },
  {
    "slug": "air-jordan-1-retro-high-og-sail",
    "name": "Air Jordan 1 Retro High OG Sail",
    "price": 375,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 1 Retro High OG in the Sail colorway. Premium leather upper in sail/white with light grey Swoosh overlays and elephant print-textured accents. Nike Air tongue labels and Wings logo. Brand new, damaged box. Size 11.",
    "shortDescription": "Brand new, damaged box",
    "images": [
      "/images/products/air-jordan-1-retro-high-og-sail/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-56-11.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-56-49.jpg",
      "/images/products/air-jordan-1-retro-high-og-sail/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-57-28.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike/Jordan",
      "Color": "Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan-1",
      "retro",
      "high-og",
      "sail",
      "white",
      "grey"
    ],
    "createdAt": "2026-02-22T20:47:47.631889+00:00"
  },
  {
    "slug": "nike-p-6000-total-orange-black",
    "name": "Nike P-6000 Total Orange/Black",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike P-6000 in the Total Orange/Black colorway (Style CD6404-801). Features a bold orange mesh and synthetic upper with black overlays, white midsole, and a chunky retro runner silhouette inspired by the early 2000s. Brand new with OG box. Size 10.5. Retail $110.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-p-6000-total-orange-black/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-40-02.jpg",
      "/images/products/nike-p-6000-total-orange-black/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-39-30.jpg",
      "/images/products/nike-p-6000-total-orange-black/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-39-06.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Nike",
      "Color": "Total Orange/Black",
      "Model": "P-6000",
      "Condition": "Brand New",
      "Style Code": "CD6404-801"
    },
    "featured": false,
    "tags": [
      "nike",
      "p-6000",
      "orange",
      "black",
      "retro",
      "runner"
    ],
    "createdAt": "2026-02-22T20:47:42.016727+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-mauve-4",
    "name": "Nike Air Jordan 1 Retro High OG Mauve",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG in the Mauve colorway. Features a premium suede and leather upper in mauve/light bone tones with signature Nike Air branding and Wings logo. Brand new with OG box. Size 10.5.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-37.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-31-21.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Nike",
      "Color": "Mauve",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New",
      "Style Code": "FJ9740-200"
    },
    "retailPrice": 185,
    "priceSources": [
      {
        "url": "https://www.walmart.com/ip/Air-Jordan-1-Retro-High-Og-Mauve-Mens-Style-Dz5485/5077084066",
        "name": "Walmart",
        "price": 169.99
      },
      {
        "url": "https://poshmark.com/listing/Jordan-1-High-OG-White-Sky-Deadstock-size-12-6664c04287aeb6fb6c21f2d7",
        "name": "Poshmark",
        "price": 185
      },
      {
        "url": "https://www.ebay.com/itm/305789295020",
        "name": "eBay",
        "price": 119.95
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "air-jordan-1",
      "mauve",
      "retro",
      "high-og"
    ],
    "createdAt": "2026-02-18T04:54:17.701021+00:00"
  },
  {
    "slug": "air-jordan-20-white-stealth",
    "name": "Air Jordan 20 (XX) White Stealth",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Air Jordan 20 (XX) in the White Stealth colorway from 2005. Features a sail/cream upper with laser-etched graphic strap panels, red collar accents, black toe cap, and the distinctive circular red pods on the outsole. Pre-owned, no box. Size 14.",
    "shortDescription": "Pre-owned, no box",
    "images": [
      "/images/products/air-jordan-20-white-stealth/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-47-37.jpg",
      "/images/products/air-jordan-20-white-stealth/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-48-12.jpg",
      "/images/products/air-jordan-20-white-stealth/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-48-45.jpg"
    ],
    "specs": {
      "Size": "14",
      "Brand": "Nike/Jordan",
      "Color": "White Stealth",
      "Model": "Air Jordan 20 (XX)",
      "Condition": "Pre-owned"
    },
    "featured": false,
    "tags": [
      "jordan",
      "air-jordan",
      "jordan-20",
      "stealth",
      "retro",
      "vintage"
    ],
    "createdAt": "2026-02-18T04:54:16.692615+00:00"
  },
  {
    "slug": "nike-air-foamposite-one-white",
    "name": "Nike Air Foamposite One White",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Foamposite One in White (Light Orewood Brown/Black/Pale Ivory) colorway. Features the iconic molded Foamposite shell upper in a cream/ivory tone with black accents. Pre-owned in good condition. Comes with replacement box. Size 9.",
    "shortDescription": "Pre-owned, replacement box",
    "images": [
      "/images/products/nike-air-foamposite-one-white/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-45-22.jpg",
      "/images/products/nike-air-foamposite-one-white/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-45-46.jpg",
      "/images/products/nike-air-foamposite-one-white/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-46-16.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Nike",
      "Color": "White (Light Orewood Brown/Black/Pale Ivory)",
      "Model": "Air Foamposite One",
      "Condition": "Pre-owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "foamposite",
      "foam",
      "white",
      "penny",
      "hardaway"
    ],
    "createdAt": "2026-02-18T04:54:13.400838+00:00"
  },
  {
    "slug": "q4-sports-dc2-white-black-yellow",
    "name": "Q4 Sports DC2 White Black Yellow",
    "price": 45,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports DC2 basketball shoe in White/Black/Yellow colorway. Features a white mesh upper with black heel and midfoot accents, yellow/gold tongue lining and collar details, and a white speckled midsole. Brand new with OG box. Size 12.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/q4-sports-dc2-white-black-yellow/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-41-51.jpg",
      "/images/products/q4-sports-dc2-white-black-yellow/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-42-32.jpg",
      "/images/products/q4-sports-dc2-white-black-yellow/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-43-17.jpg"
    ],
    "specs": {
      "Size": "12",
      "Brand": "Q4 Sports",
      "Color": "White/Black/Yellow",
      "Model": "DC2",
      "Condition": "Brand New",
      "Style Code": "Q4-DC02"
    },
    "featured": false,
    "tags": [
      "q4",
      "q4-sports",
      "dc2",
      "basketball",
      "white",
      "black",
      "yellow"
    ],
    "createdAt": "2026-02-18T04:54:10.188333+00:00"
  },
  {
    "slug": "q4-sports-emss-ii-navy-red-gold",
    "name": "Q4 Sports EMSS-II Navy Red Gold",
    "price": 40,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports EMSS-II basketball shoe in a patriotic Navy/Red/Gold/White colorway. Features a navy blue mesh upper with red collar lining and lace accents, metallic gold midsole trim and branding, and a white midsole. Brand new with OG box. Size 11.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/q4-sports-emss-ii-navy-red-gold/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-38-44.jpg",
      "/images/products/q4-sports-emss-ii-navy-red-gold/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-39-18.jpg",
      "/images/products/q4-sports-emss-ii-navy-red-gold/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-39-55.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Q4 Sports",
      "Color": "Navy/Red/Gold/White",
      "Model": "EMSS-II",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "q4",
      "q4-sports",
      "emss-ii",
      "basketball",
      "navy",
      "red",
      "gold"
    ],
    "createdAt": "2026-02-18T04:54:07.677729+00:00"
  },
  {
    "slug": "nike-nocta-air-zoom-drive-summit-white",
    "name": "Nike NOCTA Air Zoom Drive Summit White",
    "price": 130,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike NOCTA Air Zoom Drive in Summit White colorway. Drake's signature collaboration featuring an all-white leather and mesh upper with NOCTA triple-star logo on the heel, chunky sole with visible Air unit, and perforated toe box. Includes extra set of orange laces. Brand new. Size 11.",
    "shortDescription": "Brand new",
    "images": [
      "/images/products/nike-nocta-air-zoom-drive-summit-white/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-35-22.jpg",
      "/images/products/nike-nocta-air-zoom-drive-summit-white/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-35-54.jpg",
      "/images/products/nike-nocta-air-zoom-drive-summit-white/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-36-36.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike",
      "Color": "Summit White",
      "Model": "NOCTA Air Zoom Drive",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "nocta",
      "drake",
      "air-zoom-drive",
      "white"
    ],
    "createdAt": "2026-02-18T04:54:05.072129+00:00"
  },
  {
    "slug": "nike-revolution-7-black-white",
    "name": "Nike Revolution 7 Black White",
    "price": 50,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Revolution 7 running shoe in Black/White colorway. Features a black mesh upper with white Swoosh, white midsole, and black outsole. Lightweight and comfortable for everyday wear. Brand new with OG box. Size 10.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-revolution-7-black-white/nike-revolution-7-black-white_AI-Image-Editor-2026-02-16_23-31-56.jpg",
      "/images/products/nike-revolution-7-black-white/nike-revolution-7-black-white_AI-Image-Editor-2026-02-16_23-33-46.jpg"
    ],
    "specs": {
      "Size": "10",
      "Brand": "Nike",
      "Color": "Black/White",
      "Model": "Revolution 7",
      "Condition": "Brand New",
      "Style Code": "FB2207-001"
    },
    "featured": false,
    "tags": [
      "nike",
      "revolution",
      "running",
      "black",
      "white"
    ],
    "createdAt": "2026-02-17T04:40:54.909382+00:00"
  },
  {
    "slug": "adidas-grand-court-2-k-blue-iridescent",
    "name": "Adidas Grand Court 2.0 K Blue Iridescent",
    "price": 40,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Grand Court 2.0 K in steel blue with iridescent holographic three stripes and heel tab. Clean white sole. Kids/youth sizing. Brand new with tags. Size 5 (Youth).",
    "shortDescription": "Brand new with tags",
    "images": [
      "/images/products/adidas-grand-court-2-k-blue-iridescent/adidas-grand-court-2-k-blue-iridescent_AI-Image-Editor-2026-02-16_23-28-15.jpg",
      "/images/products/adidas-grand-court-2-k-blue-iridescent/adidas-grand-court-2-k-blue-iridescent_AI-Image-Editor-2026-02-16_23-28-55.jpg"
    ],
    "specs": {
      "Size": "5Y",
      "Brand": "Adidas",
      "Color": "Blue/Iridescent/White",
      "Model": "Grand Court 2.0 K",
      "Condition": "Brand New",
      "Style Code": "JR6095"
    },
    "featured": false,
    "tags": [
      "adidas",
      "grand-court",
      "blue",
      "iridescent",
      "kids",
      "youth"
    ],
    "createdAt": "2026-02-17T04:40:52.574896+00:00"
  },
  {
    "slug": "adidas-yeezy-foam-runner-mx-crab",
    "name": "Adidas Yeezy Foam Runner MX Crab",
    "price": 75,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Yeezy Foam Runner in the MX Crab colorway. Features the signature lattice cutout upper in a dark olive/black base with marbled gold and olive veining. Lightweight EVA foam construction. Brand new, deadstock. Size 9.",
    "shortDescription": "Brand new, no box",
    "images": [
      "/images/products/adidas-yeezy-foam-runner-mx-crab/adidas-yeezy-foam-runner-mx-crab_AI-Image-Editor-2026-02-16_23-23-09.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Adidas",
      "Color": "MX Crab (Black/Forest)",
      "Model": "Yeezy Foam Runner",
      "Condition": "Brand New",
      "Style Code": "GX1028"
    },
    "retailPrice": 119.99,
    "priceSources": [
      {
        "url": "https://www.ebay.com/itm/127677590461?_skw=potato+yeezy&itmmeta=01KHMZDCN0S92WRRNZDT73P6V4&hash=item1dba2d6bbd:g:36cAAeSwpHhpi7Zy&itmprp=enc%3AAQALAAAA0GfYFPkwiKCW4ZNSs2u11xDKylCRUmwzvvA%2F4DyOIpAXBjk0Z7wA3s2h67gO0MrAIeC0Xyl4%2BKhCbvSi8l%2FRqtQb8BIpOVYBCW6Q7I7edj8%2BSfN4IXk2LSwjnQk9J5Trd9nuYno9EO5KDqf%2F7u8mq4XyixeeR73AsYbk0ZgzjLlqUddE5kBKjUnbH5zEtO4djWNGBBshpUotP%2FEauGugul4f6Ke0AFpO8zBSEAplbr8tMpFxhUEnS85aLQNl8hFAO9Tt0CBRVi5kSkQLqJasfg8%3D%7Ctkp%3ABk9SR-TKtZ-NZw",
        "name": "eBay",
        "price": null
      }
    ],
    "featured": false,
    "tags": [
      "adidas",
      "yeezy",
      "foam-runner",
      "crab",
      "kanye",
      "slides"
    ],
    "createdAt": "2026-02-17T04:40:50.231117+00:00"
  },
  {
    "slug": "q4-white-streak-495-d-sp-black-white",
    "name": "Q4 Sports White Streak 495 D SP Black White",
    "price": 35,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports White Streak 495 D SP basketball shoe in Black/White/Red colorway. Features a black knit upper with bold white and black striped heel panel, red accents on the tongue and collar lining, and a white rubber outsole. Brand new with OG box. Size 7 US / UK 6.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/q4-white-streak-495-d-sp-black-white/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_22-57-11.jpg",
      "/images/products/q4-white-streak-495-d-sp-black-white/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_22-57-56.jpg",
      "/images/products/q4-white-streak-495-d-sp-black-white/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_23-01-02.jpg"
    ],
    "specs": {
      "Size": "7",
      "Brand": "Q4 Sports",
      "Color": "Black/White/Red",
      "Model": "White Streak 495 D SP",
      "Condition": "Brand New",
      "Style Code": "Q4BB-917"
    },
    "featured": false,
    "tags": [
      "q4",
      "q4-sports",
      "white-streak",
      "basketball",
      "black",
      "white",
      "red"
    ],
    "createdAt": "2026-02-17T04:03:37.421425+00:00"
  },
  {
    "slug": "q4-sports-em55-i-black-dark-blue",
    "name": "Q4 Sports EM55-I Black Dark Blue",
    "price": 40,
    "currency": "USD",
    "category": "sneakers",
    "description": "Q4 Sports EM55-I basketball shoe in Black/Dark Blue colorway. Features a black mesh upper with metallic gold accents, gold trim along the midsole, and a blue translucent patterned outsole. Lightweight performance basketball shoe. Brand new with OG box. Size 5.5 US / UK 5.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/q4-sports-em55-i-black-dark-blue/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-42-07.jpg",
      "/images/products/q4-sports-em55-i-black-dark-blue/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-42-47.jpg",
      "/images/products/q4-sports-em55-i-black-dark-blue/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-43-18.jpg"
    ],
    "specs": {
      "Size": "5.5",
      "Brand": "Q4 Sports",
      "Color": "Black/Dark Blue",
      "Model": "EM55-I",
      "Condition": "Brand New",
      "Style Code": "Q4-EM01"
    },
    "featured": false,
    "tags": [
      "q4",
      "q4-sports",
      "em55",
      "basketball",
      "black",
      "blue",
      "gold"
    ],
    "createdAt": "2026-02-17T02:54:37.614035+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-black-toe-gs",
    "name": "Nike Air Jordan 1 Retro High OG Black Toe GS",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG 'Black Toe' 2025 release in Grade School sizing. Classic white/black/varsity red colorway with a black toe box, white mid-panel, and red heel collar. Brand new deadstock with special retro Jordan box featuring Michael Jordan photo. Size 6.5Y (Women's 8).",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-black-toe-gs/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-34-50.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-black-toe-gs/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-36-14.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-black-toe-gs/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-37-38.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-black-toe-gs/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-39-15.jpg"
    ],
    "specs": {
      "Size": "6.5Y",
      "Brand": "Nike",
      "Color": "White/Black/Varsity Red",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New"
    },
    "priceSources": [
      {
        "url": "https://www.ebay.com/itm/186898348570",
        "name": "eBay",
        "price": 109.97
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "jordan-1",
      "black-toe",
      "retro",
      "high-og",
      "gs",
      "grade-school"
    ],
    "createdAt": "2026-02-17T02:54:35.15609+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-mauve-sz10-5",
    "name": "Nike Air Jordan 1 Retro High OG Mauve",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG in Mauve/Sail colorway. Features smooth leather overlays in a muted mauve/plum-brown tone with sail/cream leather base panels, white midsole, and dark outsole. Brand new deadstock with original Jordan box. Size 10.5.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-sz10-5/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-37.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-sz10-5/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-31-21.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Nike",
      "Color": "Mauve/Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New",
      "Style Code": "DZ2523-200"
    },
    "retailPrice": 185,
    "priceSources": [
      {
        "url": "https://www.walmart.com/ip/Air-Jordan-1-Retro-High-Og-Mauve-Mens-Style-Dz5485/5077084066",
        "name": "Walmart",
        "price": 169.99
      },
      {
        "url": "https://poshmark.com/listing/Jordan-1-High-OG-White-Sky-Deadstock-size-12-6664c04287aeb6fb6c21f2d7",
        "name": "Poshmark",
        "price": 185
      },
      {
        "url": "https://www.ebay.com/itm/305789295020",
        "name": "eBay",
        "price": 119.95
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "jordan-1",
      "mauve",
      "retro",
      "high-og"
    ],
    "createdAt": "2026-02-17T02:54:31.954562+00:00"
  },
  {
    "slug": "nike-voxn-grey-infrared-black",
    "name": "Nike Voxn Grey Infrared Black",
    "price": 80,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Voxn in Wolf Grey/Infrared/Black colorway. Features a translucent mesh upper with heathered grey pattern, infrared red accents, black neoprene collar, and white midsole. Lightweight and modern silhouette. Brand new.",
    "shortDescription": "Brand new",
    "images": [
      "/images/products/nike-voxn-grey-infrared-black/AI-Image-Editor-2026-02-16_15-54-02.jpg",
      "/images/products/nike-voxn-grey-infrared-black/AI-Image-Editor-2026-02-16_15-54-32.jpg",
      "/images/products/nike-voxn-grey-infrared-black/AI-Image-Editor-2026-02-16_15-55-10.jpg"
    ],
    "specs": {
      "Brand": "Nike",
      "Color": "Wolf Grey/Infrared/Black",
      "Model": "Voxn",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "voxn",
      "grey",
      "infrared",
      "black",
      "running"
    ],
    "createdAt": "2026-02-16T21:01:25.645884+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-mauve-2",
    "name": "Nike Air Jordan 1 Retro High OG Mauve (2)",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG in Sky J Mauve/Sail colorway. White leather upper with mauve overlays and Swoosh. Brand new, deadstock with original mauve Nike box and tissue paper. Size 11.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-2/AI-Image-Editor-2026-02-16_15-51-22.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-2/AI-Image-Editor-2026-02-16_15-51-51.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve-2/AI-Image-Editor-2026-02-16_15-52-24.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike",
      "Color": "Sky J Mauve/Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New"
    },
    "retailPrice": 185,
    "priceSources": [
      {
        "url": "https://www.walmart.com/ip/Air-Jordan-1-Retro-High-Og-Mauve-Mens-Style-Dz5485/5077084066",
        "name": "Walmart",
        "price": 169.99
      },
      {
        "url": "https://poshmark.com/listing/Jordan-1-High-OG-White-Sky-Deadstock-size-12-6664c04287aeb6fb6c21f2d7",
        "name": "Poshmark",
        "price": 185
      },
      {
        "url": "https://www.ebay.com/itm/305789295020",
        "name": "eBay",
        "price": 119.95
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "jordan-1",
      "mauve",
      "retro",
      "high-og"
    ],
    "createdAt": "2026-02-16T21:01:23.071208+00:00"
  },
  {
    "slug": "nike-little-posite-one-vamposite-black-red",
    "name": "Nike Little Posite One Vamposite Black Red",
    "price": 60,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Little Posite One \"Vamposite\" in Black/Gym Red colorway. Features the iconic Foamposite shell upper in black with red interior lining, dripping fangs graphic on the heel, and red outsole with gold midsole accent. Pre-owned in good condition with original box (no lid). Youth size 5Y.",
    "shortDescription": "Pre-owned with box, no lid",
    "images": [
      "/images/products/nike-little-posite-one-vamposite-black-red/AI-Image-Editor-2026-02-16_14-50-57.jpg",
      "/images/products/nike-little-posite-one-vamposite-black-red/AI-Image-Editor-2026-02-16_14-51-24.jpg",
      "/images/products/nike-little-posite-one-vamposite-black-red/AI-Image-Editor-2026-02-16_14-51-58.jpg"
    ],
    "specs": {
      "Size": "5Y",
      "Brand": "Nike",
      "Model": "Little Posite One",
      "Colorway": "Vamposite / Black Gym Red",
      "Condition": "Pre-Owned"
    },
    "featured": false,
    "tags": [
      "nike",
      "foamposite",
      "little-posite",
      "vamposite",
      "black",
      "red",
      "youth"
    ],
    "createdAt": "2026-02-16T19:55:15.967877+00:00"
  },
  {
    "slug": "nike-air-force-1-low-07-lv8-light-smoke-grey",
    "name": "Nike Air Force 1 Low '07 LV8 Light Smoke Grey",
    "price": 120,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Force 1 Low '07 LV8 in Light Smoke Grey colorway. Features premium leather upper with navy Swoosh, navy laces, and gum rubber outsole. Brand new with original Nike box. Size 9.5.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-force-1-low-07-lv8-light-smoke-grey/AI-Image-Editor-2026-02-16_13-50-50.jpg",
      "/images/products/nike-air-force-1-low-07-lv8-light-smoke-grey/AI-Image-Editor-2026-02-16_13-51-13.jpg",
      "/images/products/nike-air-force-1-low-07-lv8-light-smoke-grey/AI-Image-Editor-2026-02-16_13-52-43.jpg"
    ],
    "specs": {
      "Size": "9.5",
      "Brand": "Nike",
      "Color": "Light Smoke Grey/Navy/Gum",
      "Model": "Air Force 1 Low '07 LV8",
      "Condition": "Brand New"
    },
    "priceSources": [
      {
        "url": "https://www.ebay.com/itm/167661240941",
        "name": "eBay",
        "price": 179.88
      },
      {
        "url": "https://www.kicksonfire.com/nike-air-force-1-low-light-smoke-grey-armory-navy",
        "name": "kicksonfire",
        "price": 345
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "air-force-1",
      "af1",
      "lv8",
      "smoke-grey",
      "gum-sole"
    ],
    "createdAt": "2026-02-16T19:01:39.856664+00:00"
  },
  {
    "slug": "nike-air-jordan-9-low-bred",
    "name": "Nike Air Jordan 9 Low Bred",
    "price": 75,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 9 Retro Low Bred in black leather with red accents and white midsole. Features iconic #23 on the heel. Pre-owned in great condition. Size 9. No original box.",
    "shortDescription": "Pre-owned, no box",
    "images": [
      "/images/products/nike-air-jordan-9-low-bred/AI-Image-Editor-2026-02-16_12-29-29.jpg",
      "/images/products/nike-air-jordan-9-low-bred/AI-Image-Editor-2026-02-16_12-30-20.jpg",
      "/images/products/nike-air-jordan-9-low-bred/AI-Image-Editor-2026-02-16_12-30-54.jpg"
    ],
    "specs": {
      "Size": "9",
      "Brand": "Nike",
      "Color": "Black/Gym Red/White",
      "Model": "Air Jordan 9 Retro Low",
      "Condition": "Pre-Owned",
      "Style Code": "BW434"
    },
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "jordan-9",
      "bred",
      "retro",
      "low"
    ],
    "createdAt": "2026-02-16T18:42:13.535181+00:00"
  },
  {
    "slug": "adidas-racer-tr23-black-royal-blue",
    "name": "Adidas Racer TR23 Black Royal Blue",
    "price": 50,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Racer TR23 in black mesh with royal blue Adidas pull tab accents. Lightweight running shoe. Size 6.5.",
    "shortDescription": "Brand new with box",
    "images": [
      "/images/products/adidas-racer-tr23-black-royal-blue/adidas_racer_black_blue_2.jpg",
      "/images/products/adidas-racer-tr23-black-royal-blue/adidas_racer_black_blue_3.jpg"
    ],
    "specs": {
      "Size": "6.5",
      "Brand": "Adidas",
      "Color": "Black/Royal Blue",
      "Model": "Racer TR23",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "racer",
      "black",
      "blue",
      "running"
    ],
    "createdAt": "2026-02-15T19:43:10.189572+00:00"
  },
  {
    "slug": "adidas-cloudfoam-bounce-triple-white",
    "name": "Adidas Cloudfoam Bounce Triple White",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Cloudfoam Bounce running shoes in triple white colorway. Lightweight and comfortable with Bounce cushioning technology. Size 10.5.",
    "shortDescription": "Brand new with box",
    "images": [
      "/images/products/adidas-cloudfoam-bounce-triple-white/adidas_bounce_white_2.jpg",
      "/images/products/adidas-cloudfoam-bounce-triple-white/adidas_bounce_white_3.jpg",
      "/images/products/adidas-cloudfoam-bounce-triple-white/adidas_bounce_white_4.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Adidas",
      "Color": "Triple White",
      "Style": "Running",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "bounce",
      "cloudfoam",
      "white",
      "running"
    ],
    "createdAt": "2026-02-15T19:43:10.189572+00:00"
  },
  {
    "slug": "adidas-gazelle-indoor-orange-black-gum",
    "name": "Adidas Gazelle Indoor Orange Black Gum",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Originals Gazelle Indoor in bright orange suede with black three stripes and gum sole. Size 13.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-gazelle-indoor-orange-black-gum/adidas_gazelle_orange_black_2.jpg",
      "/images/products/adidas-gazelle-indoor-orange-black-gum/adidas_gazelle_orange_black_3.jpg"
    ],
    "specs": {
      "Size": "13",
      "Brand": "Adidas",
      "Color": "Orange/Black/Gum",
      "Model": "Gazelle Indoor",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "adidas",
      "gazelle",
      "indoor",
      "orange",
      "black",
      "gum",
      "originals"
    ],
    "createdAt": "2026-02-15T19:43:10.189572+00:00"
  },
  {
    "slug": "adidas-gazelle-blue-green",
    "name": "Adidas Gazelle Blue Green",
    "price": 35,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Originals Gazelle in royal blue suede with green three stripes. Style IH5389. Deadstock with original tags. Size 11.5 US.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "/images/products/adidas-gazelle-blue-green/adidas_gazelle_blue_green_1.jpg",
      "/images/products/adidas-gazelle-blue-green/adidas_gazelle_blue_green_2.jpg",
      "/images/products/adidas-gazelle-blue-green/adidas_gazelle_blue_green_3.jpg"
    ],
    "specs": {
      "Size": "10.5",
      "Brand": "Adidas",
      "Color": "Blue/Green/White",
      "Model": "Gazelle",
      "Condition": "Brand New",
      "Style Code": "IH5389"
    },
    "featured": false,
    "tags": [
      "adidas",
      "gazelle",
      "blue",
      "green",
      "originals",
      "suede"
    ],
    "createdAt": "2026-02-15T19:43:10.189572+00:00"
  },
  {
    "slug": "nike-air-jordan-1-retro-high-og-mauve",
    "name": "Nike Air Jordan 1 Retro High OG Mauve",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG in Mauve/Sail colorway. Brand new, deadstock with original pink box. Size 11.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "/images/products/nike-air-jordan-1-retro-high-og-mauve/nike_jordan1_mauve_2.jpg",
      "/images/products/nike-air-jordan-1-retro-high-og-mauve/nike_jordan1_mauve_3.jpg"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike",
      "Color": "Mauve/Sail",
      "Model": "Air Jordan 1 Retro High OG",
      "Condition": "Brand New"
    },
    "retailPrice": 185,
    "priceSources": [
      {
        "url": "https://www.walmart.com/ip/Air-Jordan-1-Retro-High-Og-Mauve-Mens-Style-Dz5485/5077084066",
        "name": "Walmart",
        "price": 169.99
      },
      {
        "url": "https://poshmark.com/listing/Jordan-1-High-OG-White-Sky-Deadstock-size-12-6664c04287aeb6fb6c21f2d7",
        "name": "Poshmark",
        "price": 185
      },
      {
        "url": "https://www.ebay.com/itm/305789295020",
        "name": "eBay",
        "price": 119.95
      }
    ],
    "featured": false,
    "tags": [
      "nike",
      "jordan",
      "jordan-1",
      "mauve",
      "retro",
      "high-og"
    ],
    "createdAt": "2026-02-15T19:43:10.189572+00:00"
  },
  {
    "slug": "sterling-silver-chain-bracelets",
    "name": "925 Sterling Silver Chain Bracelet Set",
    "price": 99,
    "currency": "USD",
    "category": "jewelry",
    "description": "A versatile collection of genuine 925 sterling silver chain bracelets featuring multiple classic styles — Cuban link, curb chain, and more. Each bracelet is stamped 925 for authenticity. These timeless pieces can be worn individually for a clean minimal look or stacked for a bold layered style. Brand new, sealed.",
    "shortDescription": "Assorted 925 silver chain styles — Cuban, curb & more",
    "images": [
      "/images/products/jewelry/sterling-silver-chain-bracelets-1.jpg"
    ],
    "specs": {
      "Type": "Chain Bracelet Set",
      "Brand": "DealBazaar",
      "Style": "Cuban / Curb Link",
      "Material": "925 Sterling Silver",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "bracelet",
      "chain",
      "silver",
      "sterling",
      "925",
      "cuban",
      "set"
    ],
    "createdAt": "2026-02-14T19:53:25.046249+00:00"
  }
];
