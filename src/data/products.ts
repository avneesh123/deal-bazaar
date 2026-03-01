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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-cloudfoam-pure-spw-white-coral/AI-Image-Editor-2026-02-14_17-43-25.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-cloudfoam-pure-spw-white-coral/AI-Image-Editor-2026-02-14_17-44-58.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-cloudfoam-pure-spw-white-coral/AI-Image-Editor-2026-02-14_17-46-08.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-campus-00s-dark-grey-kids/AI-Image-Editor-2026-02-14_17-42-26.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-campus-00s-dark-grey-kids/AI-Image-Editor-2026-02-14_17-51-49.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-vl-court-2-mint-pink/AI-Image-Editor-2026-02-14_17-40-13.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/adidas-vl-court-2-mint-pink/AI-Image-Editor-2026-02-14_17-46-58.png"
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
    "slug": "nike-dunk-low-light-carbon",
    "name": "Nike Dunk Low Light Carbon",
    "price": 70,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Dunk Low in Light Carbon colorway. Features a clean white leather base with light carbon grey overlays, dark grey Swoosh, padded collar, and classic Dunk Low silhouette. Pre-owned in good condition with OG box. Size 8.5.",
    "shortDescription": "Pre-owned with OG box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-low-light-carbon_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-low-light-carbon_2.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-1-mid-mauve_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-1-mid-mauve_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-1-mid-mauve_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/and1-attack-mid-black-silver_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/and1-attack-mid-black-silver_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/and1-attack-mid-black-silver_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-4-fire-red-gs_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-4-fire-red-gs_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/air-jordan-4-fire-red-gs_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/puma-rs-dreamer-j-cole-ebony-ivory_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/puma-rs-dreamer-j-cole-ebony-ivory_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/puma-rs-dreamer-j-cole-ebony-ivory_3.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/puma-rs-dreamer-j-cole-ebony-ivory_4.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-run-70s-2-0-j-navy-blue_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-run-70s-2-0-j-navy-blue_2.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-samba-62-camel-tan_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-samba-62-camel-tan_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-samba-62-camel-tan_3.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-samba-62-camel-tan_4.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/adidas-samba-62-camel-tan_5.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-high-championship-red_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-high-championship-red_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-high-championship-red_3.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/nike-dunk-high-championship-red_4.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/new-balance-fuelcell-supercomp-elite-v4-volt_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/new-balance-fuelcell-supercomp-elite-v4-volt_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/new-balance-fuelcell-supercomp-elite-v4-volt_3.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch8/new-balance-fuelcell-supercomp-elite-v4-volt_4.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-kapur-flow-white-grey_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-kapur-flow-white-grey_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-kapur-flow-white-grey_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-air-trainer-sc-high-white-gym-red_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-air-trainer-sc-high-white-gym-red_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-air-trainer-sc-high-white-gym-red_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-nmd-human-race-teal_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-nmd-human-race-teal_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-nmd-human-race-teal_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/air-jordan-2-retro-se-white-gym-red_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/air-jordan-2-retro-se-white-gym-red_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/air-jordan-2-retro-se-white-gym-red_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-bad-bunny-campus-chalky-brown_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-bad-bunny-campus-chalky-brown_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-bad-bunny-campus-chalky-brown_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-jogit-m-core-black_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-jogit-m-core-black_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/adidas-jogit-m-core-black_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-revolution-7-hot-fuchsia_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-revolution-7-hot-fuchsia_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch7/nike-revolution-7-hot-fuchsia_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-dunk-low-se-animal-pack-white_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-dunk-low-se-animal-pack-white_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-dunk-low-se-animal-pack-white_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-high-union-woven-sail_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-high-union-woven-sail_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-high-union-woven-sail_3.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-24-10.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-24-58.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-sb-blazer-low-qs-lance-mountain-black_AI-Image-Editor-2026-02-22_19-25-29.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-14-02.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-14-45.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/adidas-handball-spezial-green-yellow_AI-Image-Editor-2026-02-22_19-16-15.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-55-35.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-56-11.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-56-49.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/air-jordan-1-retro-high-og-sail_AI-Image-Editor-2026-02-22_18-57-28.png"
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
    "slug": "nike-tanjun-navy-white",
    "name": "Nike Tanjun Navy/White",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Tanjun in Navy/White colorway. A lightweight everyday sneaker with a breathable mesh upper, white Nike swoosh, and cushioned midsole. Made with at least 20% recycled content (Move to Zero). Brand new with tags and OG box. Size 11. Includes FREE Adidas Adilette Aqua slides (Size 10)!",
    "shortDescription": "Brand new with tags + FREE Adidas slides",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-tanjun-navy-white_AI-Image-Editor-2026-02-22_19-35-55.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-tanjun-navy-white_AI-Image-Editor-2026-02-22_19-35-16.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-tanjun-navy-white_AI-Image-Editor-2026-02-22_19-30-41.png"
    ],
    "specs": {
      "Size": "11",
      "Brand": "Nike",
      "Color": "Navy/White",
      "Model": "Tanjun",
      "Condition": "Brand New"
    },
    "featured": false,
    "tags": [
      "nike",
      "tanjun",
      "navy",
      "white",
      "running",
      "lightweight"
    ],
    "createdAt": "2026-02-22T20:47:44.200455+00:00"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-40-02.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-39-30.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch6/nike-p-6000-total-orange-black_AI-Image-Editor-2026-02-22_19-39-06.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-01.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-37.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-31-21.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-47-37.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-48-12.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/air-jordan-20-white-stealth_AI-Image-Editor-2026-02-17_18-48-45.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-45-22.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-45-46.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-air-foamposite-one-white_AI-Image-Editor-2026-02-17_18-46-16.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-41-51.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-42-32.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-dc2-white-black-yellow_AI-Image-Editor-2026-02-17_18-43-17.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-38-44.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-39-18.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/q4-sports-emss-ii-navy-red-gold_AI-Image-Editor-2026-02-17_18-39-55.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-34-54.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-35-22.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-35-54.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch5/nike-nocta-air-zoom-drive-summit-white_AI-Image-Editor-2026-02-17_18-36-36.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-revolution-7-black-white_AI-Image-Editor-2026-02-16_23-31-56.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-revolution-7-black-white_AI-Image-Editor-2026-02-16_23-33-46.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/adidas-grand-court-2-k-blue-iridescent_AI-Image-Editor-2026-02-16_23-28-15.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/adidas-grand-court-2-k-blue-iridescent_AI-Image-Editor-2026-02-16_23-28-55.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/adidas-yeezy-foam-runner-mx-crab_AI-Image-Editor-2026-02-16_23-23-09.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_22-57-11.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_22-57-56.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/q4-white-streak-495-d-sp-black-white_AI-Image-Editor-2026-02-16_23-01-02.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-42-07.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-42-47.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-zoom-freak-5-black-metallic-gold_AI-Image-Editor-2026-02-16_20-43-18.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-34-50.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-36-14.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-37-38.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-black-toe-gs_AI-Image-Editor-2026-02-16_20-39-15.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-01.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-30-37.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch4/nike-air-jordan-1-retro-high-og-mauve-sz10-5_AI-Image-Editor-2026-02-16_20-31-21.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-54-02.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-54-32.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-55-10.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-50-46.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-51-22.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-51-51.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_15-52-24.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_14-50-57.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_14-51-24.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_14-51-58.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_13-50-50.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_13-51-13.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_13-52-43.png"
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
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_12-29-29.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_12-30-20.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch3/AI-Image-Editor-2026-02-16_12-30-54.png"
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
    "slug": "adidas-cloudfoam-bounce-triple-white",
    "name": "Adidas Cloudfoam Bounce Triple White",
    "price": 55,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Cloudfoam Bounce running shoes in triple white colorway. Lightweight and comfortable with Bounce cushioning technology. Size 10.5.",
    "shortDescription": "Brand new with box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_bounce_white_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_bounce_white_3.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_bounce_white_4.png"
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
    "slug": "nike-air-jordan-1-retro-high-og-mauve",
    "name": "Nike Air Jordan 1 Retro High OG Mauve",
    "price": 95,
    "currency": "USD",
    "category": "sneakers",
    "description": "Nike Air Jordan 1 Retro High OG in Mauve/Sail colorway. Brand new, deadstock with original pink box. Size 11.",
    "shortDescription": "Brand new with OG box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/nike_jordan1_mauve_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/nike_jordan1_mauve_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/nike_jordan1_mauve_3.png"
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
    "slug": "adidas-racer-tr23-black-royal-blue",
    "name": "Adidas Racer TR23 Black Royal Blue",
    "price": 50,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Racer TR23 in black mesh with royal blue Adidas pull tab accents. Lightweight running shoe. Size 6.5.",
    "shortDescription": "Brand new with box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_racer_black_blue_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_racer_black_blue_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_racer_black_blue_3.png"
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
    "slug": "adidas-gazelle-blue-green",
    "name": "Adidas Gazelle Blue Green",
    "price": 35,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Originals Gazelle in royal blue suede with green three stripes. Style IH5389. Deadstock with original tags. Size 11.5 US.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_blue_green_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_blue_green_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_blue_green_3.png"
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
    "slug": "adidas-gazelle-indoor-orange-black-gum",
    "name": "Adidas Gazelle Indoor Orange Black Gum",
    "price": 85,
    "currency": "USD",
    "category": "sneakers",
    "description": "Adidas Originals Gazelle Indoor in bright orange suede with black three stripes and gum sole. Size 13.",
    "shortDescription": "Brand new with tags and OG box",
    "images": [
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_orange_black_1.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_orange_black_2.png",
      "https://ajeeaetsshqfeocosxbn.supabase.co/storage/v1/object/public/images/products/batch2/adidas_gazelle_orange_black_3.png"
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
