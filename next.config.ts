import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Usa process.cwd() que funciona en ambos sistemas de módulos
    root: process.cwd(),
  },
};

export default nextConfig;