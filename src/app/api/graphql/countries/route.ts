// サーバサイドAPIエンドポイント
import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://countries.trevorblades.com/",
  }),
  cache: new InMemoryCache(),
});

const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
      capital
      emoji
      currency
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

export async function GET() {
  console.log("Fetching countries from network");
  const { data } = await client.query({
    query: GET_COUNTRIES,
    fetchPolicy: "no-cache", // Always fetch from network
  });

  console.log("test GET countries data: ", data);
  return NextResponse.json(data);
}
