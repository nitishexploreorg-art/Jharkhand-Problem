# Deploying Samadhan Jharkhand to Netlify

This application is fully pre-configured for one-click deployment to [Netlify](https://www.netlify.com/).

---

## 1. Quick Deploy via GitHub (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   - Make sure `netlify.toml`, `public/_redirects`, and `.node-version` are committed.

2. **Log into Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com/) and sign in.
   - Click **"Add new site"** > **"Import an existing project"**.
   - Select your Git provider (e.g., GitHub) and select your `samadhan-jharkhand` repository.

3. **Netlify Build Settings** (Automatically detected from `netlify.toml`):
   - **Base directory**: *(leave empty)*
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node.js Version**: `20` (configured automatically via `netlify.toml` and `.node-version`)

4. **Click "Deploy site"**:
   - Netlify will install dependencies, build the Vite application into `dist`, and publish it with global CDN routing.
   - All SPA routes (`/track-problem`, `/challenges`, `/social-audit`, `/admin`, etc.) will route seamlessly to `/index.html` via the pre-configured redirect rules without 404 errors.

---

## 2. Deploy via Netlify CLI

If you prefer deploying directly from your terminal:

```bash
# 1. Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli

# 2. Build the production bundle
npm run build

# 3. Deploy to Netlify
netlify deploy --prod --dir=dist
```

---

## 3. Pre-Configured Files Included

- **`netlify.toml`**: Configures the build command (`npm run build`), publish directory (`dist`), Node version (`20`), SPA redirects (`/* -> /index.html`), and caching headers for static assets.
- **`public/_redirects`**: Secondary Netlify SPA fallback rule (`/* /index.html 200`) ensuring zero 404 errors on deep route reloads.
- **`.node-version`**: Pins Node version to 20 for consistent CI/CD execution across Netlify build workers.
