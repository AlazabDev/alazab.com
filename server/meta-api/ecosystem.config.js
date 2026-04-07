module.exports = {
  apps: [
    {
      name: 'alazab-meta-api',
      script: 'index.js',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        META_API_PORT: 3004,
        PG_HOST: 'localhost',
        PG_PORT: 5432,
        PG_DATABASE: 'alazab_meta',
        PG_USER: 'postgres',
        PG_PASSWORD: '',
        CORS_ORIGIN: 'https://alazab.com,https://alazab-site.lovable.app',
      },
      env_development: {
        NODE_ENV: 'development',
        META_API_PORT: 3004,
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,
    },
  ],
};
