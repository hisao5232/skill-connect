# SkillConnect (Next.js × Supabase シミュレーション)

モダンな技術スタック（Next.js 15, Supabase, TypeScript）を使用した、求人サイトのMVP開発シミュレーションプロジェクトです。

## 🛠 技術スタック
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Backend/BaaS:** Supabase (Auth, PostgreSQL)
- **Infrastructure:** Docker (Local Development)

## 🚀 機能一覧
- [x] Supabase Local 開発環境の構築
- [x] PostgreSQLによる求人テーブル設計 & マイグレーション管理
- [x] Server Componentsを用いた型安全な求人データの一覧表示
- [ ] 求人投稿機能 (実装予定)

## 🏁 セットアップ手順

### 1. リポジトリのクローン
```bash
git clone [https://github.com/hisao5232/skill-connect.git](https://github.com/hisao5232/skill-connect.git)
cd skill-connect
```

### 2. ライブラリのインストール
```bash
npm install
```
### 3. Supabase ローカル環境の起動
※ Docker Desktop が起動している必要があります。

```bash
npx supabase start
```

### 4. データベースの初期化
```bash
npx supabase db reset
```

### 5. 開発サーバーの起動
```bash
npm run dev
```

## 📝 開発のこだわり
- 型安全: Supabase CLIを使用して、DBスキーマからTypeScript型を自動生成し、anyを排除した開発を行っています。

- ディレクトリ構成: 実務に即した、メンテナンス性の高い構成（src/services, src/lib 等の分離）を採用しています。
