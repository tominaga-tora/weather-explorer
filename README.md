# Weather Explorer

## プロジェクト概要

Weather Explorer は、指定した都市の天気情報を表示するウェブアプリケーションです。
ユーザーが都市名を入力することで、天気情報を取得し、表示します。

誰でも以下手順で API を叩いて動作確認ができます。

1.  リポジトリを落とす

2.  npm i

3.無料 天気 API を叩くため登録(数分)し、API キーをコピー
https://openweathermap.org/api
(カントリー API はキー不要)

- API のための登録をしない場合(モックを利用する場合)
  - pages.tsx の isMock を true にする様にお願いします。
    - 検索フォームに City1 から City10 までを入力すると、それぞれのモックデータが返るようになります。
    - 検索にない場合 500 エラーを返します

1.  .env.local ファイルを作成し
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY={API キー}
    を記載

2.  npm run dev

3.  localhost にアクセスして動作確認

## 使用方法

1. **依存関係のインストール**:

```sh
npm install
```

2. **開発サーバーの起動**:

```
npm run dev
```

## その他コマンド

lint チェック

```
npm run lint
```

コードの整形

```
npm run format
```

### デプロイ

vercel にデプロイ想定です。

## 制作時メモ

### デプロイ環境選定について

- vercel
  - Next.js でサクッと作るため採用

### 環境変数について

.env,local に以下を定義してください。
https://openweathermap.org/api

```
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=xxxxx
```

### フォルダとファイルの説明

- `.eslintrc.json`: ESLint の設定ファイルです。コードの品質を保つためのルールが記載されています。

- `.github/`: GitHub 関連の設定ファイルを格納するフォルダです。

  - `workflows/`: GitHub Actions のワークフローファイルを格納するフォルダです。
    - `deploy.yml`: GitHub Pages へのデプロイ用ワークフローが定義されています。

- `.gitignore`: Git がバージョン管理から無視するファイルやフォルダを指定するためのファイルです。

- `.next/`: Next.js のビルド成果物を格納するディレクトリです。通常、リポジトリに含めません。

- `.vscode/`: Visual Studio Code の設定ファイルを格納するフォルダです。

  - `extensions.json`: プロジェクトで推奨される VS Code の拡張機能が記載されています。
  - `settings.json`: プロジェクト固有の VS Code 設定が記載されています。

- `README.md`: プロジェクトの概要や構成、使用方法について記載したファイルです。

- `docs/`: プロジェクトのドキュメントやデザインファイルを格納するフォルダです。

  - `design/`: デザイン関連のファイルを格納するサブフォルダです。
    - `design.psd`: デザイン元となる Photoshop ファイルです。

- `next-env.d.ts`: Next.js の型定義ファイルです。TypeScript の環境設定に使用されます。

- `next.config.mjs`: Next.js の設定ファイルです。ビルドやデプロイに関する設定を行います。

- `package-lock.json`: プロジェクトの依存関係を固定するためのファイルです。npm によって自動生成されます。

- `package.json`: プロジェクトの依存関係やスクリプト、メタ情報を管理するファイルです。

- `public/`: 静的ファイルを格納するフォルダです。Next.js はこのフォルダ内のファイルをそのまま公開します。

- `src/`: アプリケーションのソースコードを格納するフォルダです。

  - `app/`: アプリケーションのメイン部分を格納するフォルダです。
    - `api/`: API エンドポイントのファイルを格納するフォルダです。
      - `graphql/`: GraphQL 関連のファイルを格納するサブフォルダです。
        - `countries/`: 国情報取得用のエンドポイントです。
          - `route.ts`: GraphQL エンドポイントの実装ファイルです。
      - `rest/`: REST API 関連のファイルを格納するサブフォルダです。
        - `weather/`: 天気情報取得用のエンドポイントです。
          - `route.ts`: 天気情報取得エンドポイントの実装ファイルです。
    - `components/`: コンポーネントを格納するサブフォルダです。
      - `CountryCard.tsx`: 国情報を表示するカードコンポーネントです。
      - `WeatherCard.tsx`: 天気情報を表示するカードコンポーネントです。
    - `favicon.ico`: アプリケーションのファビコンファイルです。
    - `globals.scss`: グローバルなスタイルシートです。
    - `layout.tsx`: アプリケーションのレイアウトコンポーネントです。
    - `page.module.css`: ページごとのスタイルシートです。
    - `page.tsx`: メインページの実装ファイルです。

- `tsconfig.json`: TypeScript の設定ファイルです。
