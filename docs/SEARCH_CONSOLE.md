# Google Search Console Setup (Post-Launch)

## 1) Verify ownership
- Add a DNS TXT record for the domain in your DNS provider.
- Alternatively, use the HTML file verification method if DNS is not available.

## 2) Submit sitemap
- Open **Sitemaps** in Search Console.
- Submit: `https://your-domain.com/sitemap.xml`.

## 3) Check indexing
- Use **URL Inspection** to request indexing for key pages.
- Monitor coverage and fix any reported errors.

## 4) Ongoing monitoring
- Review **Performance** and **Core Web Vitals** weekly.
- Fix any structured data or mobile usability issues.

> Ensure `NEXT_PUBLIC_SITE_URL` is set to your production domain.
