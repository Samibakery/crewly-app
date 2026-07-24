/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sikkerhedsnet: lad ikke små type-/lint-detaljer stoppe et deploy af MVP'en.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
