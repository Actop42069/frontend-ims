/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { createServer } from 'https';
import { parse } from 'url';
import next from 'next';
import fs from 'fs';
import path from 'path';

/** @type {import("next").NextConfig} */
const config = {
  // Add development server configuration to use HTTPS
  async rewrites() {
    return [
      // Rewrite API requests to use HTTPS
      {
        source: '/api/:path*',
        destination: 'https://localhost:7777/api/:path*',
      },
    ];
  }
};

// This is executed during dev mode
if (process.env.NODE_ENV === 'development') {
  // Dynamically import the certificate generator
  try {
    const { generateCertificates } = await import('./scripts/generate-certificates.js');
    const certificates = await generateCertificates();
    
    // Store the certificates for the dev server
    const certsDir = path.join(process.cwd(), '.certificates');
    if (!fs.existsSync(certsDir)) {
      fs.mkdirSync(certsDir, { recursive: true });
    }
    
    fs.writeFileSync(path.join(certsDir, 'key.pem'), certificates.key);
    fs.writeFileSync(path.join(certsDir, 'cert.pem'), certificates.cert);
    
    console.log('SSL certificates generated successfully');
  } catch (error) {
    console.error('Failed to generate SSL certificates:', error);
  }
}

export default config;
