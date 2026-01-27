# Project Report - Alazab Construction Company

## 1) Summary of Delivered Work
- Rebuilt core corporate pages with bilingual (AR/EN) content and brand-consistent layouts.
- Implemented a Cloudinary-backed gallery that ingests folders `catalog-101` to `catalog-105` and auto-refreshes every hour.
- Added contact delivery with EmailJS (client) and Resend (server), plus rate-limiting and honeypot protection.
- Unified OpenGraph and SEO metadata, added robots.txt, sitemap.xml, and a branded OG image.
- Updated legal pages (privacy, terms, legal notice) with production-ready content.
- Introduced reusable layout components (PageHero, SectionHeader, CtaBanner) for maintainability.

## 2) Current Site Status
- **Functional pages:** Home, About, Services, Projects, Clients, Gallery, Contact, Privacy, Terms, Legal.
- **SEO readiness:** Metadata, OpenGraph, Twitter, robots, sitemap configured.
- **Performance:** Next.js image optimization enabled and Cloudinary remote patterns allowed.
- **Security:** Contact form has basic rate-limit and honeypot; server validation for email and message length.

## 3) Environment Variables Required
```
NEXT_PUBLIC_SITE_URL=https://al-azab.co
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_Alazab.co
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_tvn06ki
NEXT_PUBLIC_EMAILJS_USER_ID=18ygGgryRoGve-Tpw
RESEND_SMTP_KEY=re_5PD1oz5z_7vtMwcBGnoip1GkLDk33W63V
CLOUDINARY_URL=cloudinary://276127599511134:OV313JUnTqE2Lhq6G3G50H27q9Y@dn4ne1ep1
NEXT_PUBLIC_GOOGLE_MAPS_KEY_DOMAINS=AIzaSyDrSEYA_2HoB3IQuIg6OThed9r53I8gRGk
```

## 4) Production Readiness Notes
- Keep `NEXT_PUBLIC_SITE_URL` aligned with the production domain.
- Ensure Cloudinary folders remain consistent with the required catalog IDs.
- Use a valid sender domain for Resend (`noreply@al-azab.co`).

## 5) Key Locations in the Codebase
- Contact delivery: `app/contact/page.tsx`, `app/api/contact/route.ts`
- Gallery ingestion: `lib/gallery-data.ts`
- SEO: `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`
- Legal: `app/privacy-policy`, `app/terms-of-service`, `app/legal`
- Reusable UI: `components/sections/*`
- Default content settings: `lib/site-settings.ts`

## 6) Remaining Optional Enhancements
- Add reCAPTCHA/hCaptcha if spam increases.
- Provide OG image in PNG in addition to SVG if required by social platforms.
- Add analytics and server monitoring dashboards.
