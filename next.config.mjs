/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_MEDPLUM_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_MEDPLUM_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_MEDPLUM_PROJECT_ID: process.env.NEXT_PUBLIC_MEDPLUM_PROJECT_ID,
    NEXT_PUBLIC_MEDPLUM_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_MEDPLUM_RECAPTCHA_SITE_KEY,
  },
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
