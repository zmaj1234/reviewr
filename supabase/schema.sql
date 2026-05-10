-- Reviewr database schema
-- Run this in your Supabase SQL editor

-- Businesses table: one row per connected GBP location
create table businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  business_name text not null,
  business_type text,
  business_description text,
  gbp_account_id text,
  gbp_location_id text,
  gbp_access_token text,
  gbp_refresh_token text,
  gbp_token_expires_at timestamptz,
  owner_phone text,
  owner_email text,
  tone_preferences text default 'warm, professional, concise',
  past_responses jsonb default '[]'::jsonb,
  notification_method text default 'whatsapp',
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Reviews table: one row per processed review
create table reviews (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade not null,
  review_id text not null,
  rating integer not null check (rating between 1 and 5),
  review_text text,
  reviewer_name text,
  review_time timestamptz,
  language text default 'en',
  sentiment text,
  draft_reply text,
  final_reply text,
  flags jsonb default '[]'::jsonb,
  status text default 'pending_approval' check (status in ('pending_approval','posted','discarded','error')),
  edited_at timestamptz,
  posted_at timestamptz,
  discarded_at timestamptz,
  created_at timestamptz default now(),
  unique(business_id, review_id)
);

-- Enable Row Level Security
alter table businesses enable row level security;
alter table reviews enable row level security;

-- RLS Policies
create policy "Users can manage their own businesses"
  on businesses for all
  using (auth.uid() = user_id);

create policy "Users can view their own reviews"
  on reviews for all
  using (
    business_id in (
      select id from businesses where user_id = auth.uid()
    )
  );

-- Indexes for performance
create index reviews_business_id_idx on reviews(business_id);
create index reviews_status_idx on reviews(status);
create index reviews_created_at_idx on reviews(created_at desc);

-- Updated_at trigger for businesses
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_businesses_updated_at
  before update on businesses
  for each row execute function update_updated_at_column();

-- Enable Realtime for reviews table
alter publication supabase_realtime add table reviews;
