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
