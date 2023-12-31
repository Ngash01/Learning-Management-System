/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    publicRuntimeConfig: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      }

}

module.exports = nextConfig
