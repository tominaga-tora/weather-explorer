// サーバサイドAPIエンドポイント
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }
}
