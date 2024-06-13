// サーバサイドAPIエンドポイント
// appSync サンプル
import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_APPSYNC_ENDPOINT,
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_APPSYNC_API_KEY
        ? process.env.NEXT_PUBLIC_APPSYNC_API_KEY
        : "",
    },
  }),
  cache: new InMemoryCache(),
});

const GET_DATA = gql`
  query GetData {
    yourQuery {
      field1
      field2
    }
  }
`;

export async function GET() {
  const { data } = await client.query({
    query: GET_DATA,
    fetchPolicy: "no-cache",
  });
  return NextResponse.json(data);
}
