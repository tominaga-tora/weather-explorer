/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 開発環境でのみ2回レンダリングされる設定をオフにする(コードのエラー検出のためそうなっているらしいが気持ち悪いため)
};

export default nextConfig;
