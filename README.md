# Weather Explorer

## プロジェクト概要

Weather Explorer は、指定した都市の天気情報を表示するウェブアプリケーションです。
ユーザーが都市名を入力することで、天気情報を取得し、表示します。無料 API を利用しています。

誰でも以下手順で API を叩いて動作確認ができます。

1.  リポジトリを落とす

2.  npm i

3.  無料 天気 API を叩くため登録(数分)し、API キーをコピー
    https://openweathermap.org/api
    (カントリー API はキー不要)

- API のための登録をしない場合(モックを利用する場合)
  - src/app/\_components/HomePageContent.tsx の isMock を true にする様にお願いします。
    - 検索フォームに City1 から City10 までを入力すると、それぞれのモックデータが返るようになります。
    - 検索にない場合 500 エラーを返します

4. .env.local ファイルを作成し
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY={API キー}
   を記載(モック利用しない場合)

5. npm run dev

6. localhost にアクセスして動作確認

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

- `.next/`: Next.js のビルド成果物を格納するディレクトリです。通常、リポジトリに含めません。
- `.vscode/`: Visual Studio Code の設定ファイルを格納するフォルダです。
  - `extensions.json`: プロジェクトで推奨される VS Code の拡張機能が記載されています。
  - `settings.json`: プロジェクト固有の VS Code 設定が記載されています。
- `tsconfig.json`: TypeScript の設定ファイルです。型チェックやコンパイルに関する設定が記述されています。
- `.eslintrc.json`: ESLint の設定ファイルです。コードの品質を保つためのルールが記載されています。
- `README.md`: アプリケーションの概要、セットアップ手順、使い方などの説明を記載するファイルです。
- `next-env.d.ts`: Next.js の型定義ファイルです。TypeScript コンパイルのために必要で、Next.js の設定に関する型情報が含まれます。
- `next.config.mjs`: Next.js の設定ファイルです。ビルド設定やプラグイン設定など、プロジェクト全体の構成に影響を与えるオプションが記述されています。
- `package-lock.json`: プロジェクトの依存関係を記録するファイルです。パッケージのバージョンが固定され、チームで同じ環境を再現できるようにします。
- `package.json`: プロジェクトのメタデータ、依存関係、スクリプトコマンド（ビルドやデプロイなど）が記載されたファイルです。
- `public/`: 静的なリソース（画像やフォント、favicon など）を格納するフォルダです。Next.js で `/public` 以下に置かれたファイルは直接参照できます。
- `src/`: アプリケーションのソースコードを格納するフォルダです。
  - `app/`: Next.js の `app` ディレクトリで、ページや API ルート、スタイリングを管理します。
    - `_components/`: アプリケーションで使用される各種コンポーネントをまとめたフォルダです。
      - `CountryCard.tsx`: 国情報を表示するコンポーネントです。国名や国旗、通貨などの情報をカード形式で表示します。
      - `HomePageContent.tsx`: ホームページのメインコンテンツを表示するコンポーネントです。天気情報や検索機能を提供します。
      - `WeatherCard.tsx`: 天気情報を表示するコンポーネントです。気温、湿度、風速などのデータを表示します。
    - `api/`: API エンドポイントを提供するディレクトリです。GraphQL と REST のエンドポイントが設定されています。
      - `graphql/`: GraphQL エンドポイントを格納するフォルダです。
        - `countries/`: 国情報に関連する API エンドポイントをまとめたフォルダです。
          - `route.ts`: 国情報を取得する GraphQL エンドポイントを提供します。クライアントからの国データに関する GraphQL リクエストを処理します。
      - `rest/`: REST API のエンドポイントを格納するフォルダです。
        - `weather/`: 天気情報に関連する API エンドポイントをまとめたフォルダです。
          - `mockWeather.ts`: 天気情報のモックデータを提供するファイルです。テストや開発環境で使用するサンプルデータが格納されています。
          - `route.ts`: 天気情報を取得する REST API のエンドポイントです。クライアントからの天気データに関するリクエストを処理します。
    - `favicon.ico`: ブラウザのタブやブックマークに表示されるファビコンファイルです。
    - `globals.scss`: アプリケーション全体に適用されるグローバルスタイルを定義したファイルです。
    - `layout.tsx`: アプリケーション全体のレイアウトを設定するファイルです。ヘッダーやフッターなど、共通部分の構成を定義します。
    - `page.module.css`: /ページ専用のスタイルシートです。`page.tsx` に適用される CSS モジュールが記載されています。
    - `page.tsx`: /ページのエントリーポイントとなるコンポーネントです。ユーザーがアクセスした際に最初に表示される内容を定義します。

## 制作の背景,作った感想

- 無料 API を使い、RestAPI と GraphQL 両方のリクエストエンドポイントを立ててリクエストをしてみるために作成
- vercel も使ったことがなかったため利用してみた
  - リポジトリ読み込みや環境変数設定や再デプロイなど使いやすかった。
- /api 内の設計、特に GraphQL 側は管理するなら構成を練らないと可読性下がりそう
- local で構築でき、PUSH 検知でデプロイまで回せたのでよしとする。

## 公開先 url

https://geo-weather-insights.vercel.app/
