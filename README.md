# Attachment Mirror

Attachment Mirror is a cinematic attachment style and relationship-pattern web app.

## Publish with GitHub Pages

1. Create a new GitHub repository named `attachment-mirror`.
2. Upload these files to the repository root: `index.html`, `styles.css`, `app.js`, `robots.txt`, `sitemap.xml`, and `.nojekyll`.
3. Open the repository Settings.
4. Go to Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select `main` and `/root`, then Save.

Your live URL will look like:

```text
https://YOUR-GITHUB-USERNAME.github.io/attachment-mirror/
```

## Publish on Google Firebase Hosting

1. Create a Firebase project named `attachment-mirror`.
2. Enable Firebase Hosting.
3. From this folder, connect the project and deploy:

```bash
firebase login
firebase use --add
firebase deploy
```

After deploy, update `robots.txt` and `sitemap.xml` if Firebase gives you a different public URL.
