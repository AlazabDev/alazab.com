module.exports = {
  apps: [{
    name: 'alazab-api',
    script: 'index.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '256M',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3004,
    },
  }],
};
