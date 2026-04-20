-- 求人テーブル
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company_name text not null,
  description text,
  salary_range text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- サンプルデータ
insert into public.jobs (title, company_name, description, salary_range, location)
values 
  ('Next.jsエンジニア', 'スキル接続株式会社', 'モダンなWebアプリの開発です。', '時給2,500円', 'リモート'),
  ('バックエンド補佐', 'Tech-World', 'Supabaseを使ったDB設計のサポート。', '1機能5,000円', '東京');
  