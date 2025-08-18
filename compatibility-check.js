const { dependencies } = require('./package.json');
const reactVersion = dependencies.react;

console.log(`React version: ${reactVersion}`);

const compatiblePackages = {
  'next-video': '>=0.7.0-canary.1',
  'framer-motion': '>=12.0.0',
  'react-player': '>=2.12.0'
};

Object.entries(compatiblePackages).forEach(([pkg, version]) => {
  console.log(`${pkg} should be ${version} for React 19`);
});
