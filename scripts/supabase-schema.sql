-- Deal Bazaar Supabase Schema
-- Run this in the Supabase SQL Editor to set up the database.

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  cost_price numeric(10,2),
  selling_price numeric(10,2) not null,
  currency text not null default 'USD',
  category text not null check (category in ('jewelry', 'sneakers')),
  description text not null default '',
  short_description text not null default '',
  images text[] not null default '{}',
  specs jsonb not null default '{}',
  status text not null default 'in_stock' check (status in ('in_stock', 'sold', 'reserved', 'unlisted')),
  quantity integer not null default 1,
  featured boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Receipts table
create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  file_url text,
  vendor text not null,
  purchase_date date not null,
  total_amount numeric(10,2) not null,
  notes text,
  created_at timestamptz not null default now()
);

-- Receipt line items
create table if not exists receipt_items (
  id uuid primary key default gen_random_uuid(),
  receipt_id uuid not null references receipts(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  item_name text not null,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null
);

-- Sales table
create table if not exists sales (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sale_price numeric(10,2) not null,
  buyer_name text,
  buyer_contact text,
  payment_method text not null default 'cash' check (payment_method in ('cash', 'zelle', 'venmo', 'paypal', 'card', 'other')),
  sale_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on products
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- Indexes
create index if not exists idx_products_status on products(status);
create index if not exists idx_products_category on products(category);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_sales_product_id on sales(product_id);
create index if not exists idx_sales_sale_date on sales(sale_date);
create index if not exists idx_receipt_items_receipt_id on receipt_items(receipt_id);

-- Row Level Security (RLS)
-- Enable RLS on all tables
alter table products enable row level security;
alter table receipts enable row level security;
alter table receipt_items enable row level security;
alter table sales enable row level security;

-- Allow authenticated users full access (admin only)
create policy "Authenticated users can read products" on products for select to authenticated using (true);
create policy "Authenticated users can insert products" on products for insert to authenticated with check (true);
create policy "Authenticated users can update products" on products for update to authenticated using (true);
create policy "Authenticated users can delete products" on products for delete to authenticated using (true);

create policy "Authenticated users can read receipts" on receipts for select to authenticated using (true);
create policy "Authenticated users can insert receipts" on receipts for insert to authenticated with check (true);
create policy "Authenticated users can update receipts" on receipts for update to authenticated using (true);
create policy "Authenticated users can delete receipts" on receipts for delete to authenticated using (true);

create policy "Authenticated users can read receipt_items" on receipt_items for select to authenticated using (true);
create policy "Authenticated users can insert receipt_items" on receipt_items for insert to authenticated with check (true);
create policy "Authenticated users can update receipt_items" on receipt_items for update to authenticated using (true);
create policy "Authenticated users can delete receipt_items" on receipt_items for delete to authenticated using (true);

create policy "Authenticated users can read sales" on sales for select to authenticated using (true);
create policy "Authenticated users can insert sales" on sales for insert to authenticated with check (true);
create policy "Authenticated users can update sales" on sales for update to authenticated using (true);
create policy "Authenticated users can delete sales" on sales for delete to authenticated using (true);

-- Allow service role (for build scripts) to read products
create policy "Service role can read products" on products for select to service_role using (true);

-- Create storage buckets (run these separately in Supabase dashboard or via API)
-- Storage > New Bucket > "images" (public)
-- Storage > New Bucket > "receipts" (private)
