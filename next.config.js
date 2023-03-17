/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline' *.dvdb.video;
  script-src 'self' *.dvdb.video;
  child-src 'self' *.dvdb.video;
  font-src 'self' *.dvdb.video;  
  img-src 'self' data: *.dvdb.video www.themoviedb.org image.tmdb.org cdn.discordapp.com;
`;

const securityHeaders = [
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "Permissions-Policy",
        value: "",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "same-origin",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
];

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: [`i.dvdb.video`, "www.themoviedb.org", "image.tmdb.org"],
    },
    async headers() {
        return process.env.NODE_ENV !== "development"
            ? [
                  {
                      // Apply these headers to all routes in your application.
                      source: "/:path*",
                      headers: securityHeaders,
                  },
              ]
            : [];
    },
};

module.exports = nextConfig;
