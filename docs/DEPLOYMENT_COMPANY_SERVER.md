# Deployment Guide - Company Server (Production)

## 1) Server Requirements
- Ubuntu 22.04 LTS (or equivalent)
- Node.js 18+ and pnpm
- Nginx
- SSL (Let's Encrypt)
- PM2 or systemd

## 2) Directory Layout
```
/var/www/alazab
├── current
├── releases
└── shared
    └── .env.production
```

## 3) Install & Build
```
pnpm install
pnpm build
```

## 4) Environment Setup
Place production variables in `/var/www/alazab/shared/.env.production`.

## 5) Run with PM2
```
pm2 start "pnpm start" --name alazab
pm2 save
```

## 6) Nginx Reverse Proxy
```
server {
  listen 80;
  server_name al-azab.co www.al-azab.co;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

## 7) SSL
```
sudo certbot --nginx -d al-azab.co -d www.al-azab.co
```

## 8) Logs & Monitoring
- `pm2 logs alazab`
- Set up log rotation and uptime monitoring.

## 9) Release Workflow
1. Pull or deploy release.
2. Install dependencies.
3. Build.
4. Restart PM2.

## 10) Rolling Back
Switch `current` symlink to a previous release and restart PM2.
