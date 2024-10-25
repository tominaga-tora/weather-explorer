// src/app/page.tsx (サーバーコンポーネント)

import dynamic from "next/dynamic";

// クライアントサイド専用にする
const HomePageContent = dynamic(() => import("./_components/HomePageContent"), {
  ssr: false,
});

const HomePage = () => {
  return <HomePageContent />;
};

export default HomePage;
