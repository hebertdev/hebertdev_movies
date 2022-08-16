const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
  images: {
    domains: ["www.themoviedb.org"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});
