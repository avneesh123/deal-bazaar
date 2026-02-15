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
  featured: boolean;
  tags: string[];
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];
