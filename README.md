# ブリストルスケール記録アプリ

便通の記録と管理を行うWebアプリケーションです。Bristol Stool Chart（ブリストルスケール）を使用して、日々の便通を記録できます。

## 機能

- **記録管理**: 日付、時刻、ブリストルスケール（1-7）、量、色の記録
- **カレンダー表示**: 月単位でのカレンダービューによる記録確認
- **コントロールスコア**: 記録に基づいた健康指標の算出
- **ユーザー認証**: Supabaseによる安全な認証システム
- **レスポンシブデザイン**: デスクトップ・モバイル対応

## 技術スタック

- **フレームワーク**: Next.js (App Router)
- **データベース・認証**: Supabase
- **UIコンポーネント**: shadcn/ui (New York style)
- **スタイリング**: TailwindCSS
- **型安全性**: TypeScript (strict mode)

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下を設定：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

### 4. 本番環境用ビルド

```bash
npm run build
npm run start
```

## ディレクトリ構成

```
bristool/
├── app/                    # Next.js App Router
│   ├── (auth-pages)/      # 認証ページ群
│   ├── dashboard/         # メインダッシュボード
│   ├── new-stool/         # 新規記録ページ
│   └── actions.ts         # Server Actions
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/ui基本コンポーネント
│   ├── features/         # ダッシュボード機能コンポーネント
│   ├── bristol-scale-select.tsx
│   └── new-stool-form.tsx
├── lib/                  # ユーティリティ
│   └── data.ts           # データアクセス関数
└── utils/                # 設定・ユーティリティ
    └── supabase/         # Supabaseクライアント設定
```

## データベーススキーマ

### stool_records テーブル
- `id`: 主キー
- `user_id`: auth.usersへの外部キー
- `date`: 記録日時
- `scale`: ブリストルスケール（1-7）
- `volume`: 量（0-100）
- `color`: 色の評価

## 認証パターン

すべての認証操作は`app/actions.ts`のServer Actionsを使用：
- サインアップ、サインイン、サインアウト
- パスワードリセット
- 保護されたルートでの認証状態確認

## 開発のポイント

- Server Componentsをデフォルトとし、必要な場合のみClient Componentsを使用
- Server Actionsによるフォーム処理
- Supabaseクライアントの適切な使い分け（server.ts / client.ts）
- レスポンシブデザインの実装

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。