const { join } = require('path');
const mkcert = require('mkcert');

async function generateCertificates() {
  console.log('Generating SSL certificates for local development...');
  
  // Create a certificate authority
  const ca = await mkcert.createCA({
    organization: 'Roots IMS Dev CA',
    countryCode: 'US',
    state: 'Development',
    locality: 'Local',
    validityDays: 365
  });

  // Create a certificate signed by the CA
  const cert = await mkcert.createCert({
    domains: ['localhost', '127.0.0.1'],
    validityDays: 365,
    caKey: ca.key,
    caCert: ca.cert
  });

  console.log('Successfully generated certificates!');
  return { key: cert.key, cert: cert.cert };
}

// Export the function to be used in next.config.js
module.exports = { generateCertificates }; 