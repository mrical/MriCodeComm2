const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
        permanent: true,
      },
      {
        source: "/auth/error",
        destination: "/",
        permanent: true,
      },
    ];
  },
});
