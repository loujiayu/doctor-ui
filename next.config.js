/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:
        process.env.NODE_ENV === 'production'
            ? 'https://vikiai.azurewebsites.net/api'
            : 'http://localhost:7071/api',
  },
}

module.exports = nextConfig
