# humsana.com  static site

The full Humsana marketing site as static pages, ready for GitHub Pages. No build
step. Pages: Home, Voice (Signal), Developers, Partners, Swan, Privacy. Shared
styling in `style.css`.

This replaces the site that was served from the DigitalOcean droplet.

## Deploy on GitHub Pages

Publish to a repo named exactly `sriramnatrajhen.github.io` (a user site), or any
repo with Pages enabled.

```bash
cd humsana-site
git init -b main
git add -A
git commit -m "Humsana static site"
git remote add origin git@github.com:sriramnatrajhen/sriramnatrajhen.github.io.git
git push -u origin main
```

On GitHub: Settings, Pages, Source: `main` / root. The `CNAME` file already sets
the custom domain to `humsana.com`.

## Point humsana.com at GitHub Pages

At your DNS provider (where humsana.com is registered), replace the records that
currently point to the droplet:

For the apex `humsana.com`, add four A records to GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www.humsana.com`, add a CNAME record pointing to `sriramnatrajhen.github.io`.

Then in GitHub, Settings, Pages, Custom domain: enter `humsana.com` and enable
Enforce HTTPS once the certificate is issued (can take a few minutes to an hour).

## Order of operations before deleting the droplet

1. Push this site and confirm it loads on the `github.io` URL.
2. Repoint DNS as above and wait until `https://humsana.com` serves this site.
3. Confirm every page loads over HTTPS.
4. Only then delete the DigitalOcean droplet.

Doing it in this order means the domain never goes dark.

## Notes

- The old live demos (Swan audio upload, Signal mic) ran on the droplet backend and
  are intentionally gone. The Swan page now links to the open-source repo; the Voice
  page shows integration docs. If you later host `run_bioauth.py` on a free tier,
  you can wire a demo back in.
- Links use the `sriramnatrajhen` GitHub namespace. Update them if any repo or
  account name changes.
