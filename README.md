# Yuyue Zhou — Portfolio

Personal portfolio site: SCAMP Piano Pieces, Lost & Sound, Flowing Light, and CV.

Plain HTML, CSS and JavaScript. No build step.

## Run it

```
cd website
python3 -m http.server 8000
```

Open http://localhost:8000

## Structure

All site files are in `website/`.

```
index.html          pages (routed by #home, #scamp-pieces, #lost-and-sound, #flowing-light, #cv)
css/style.css       styles
js/main.js          covers, routing, chart, score viewer, video chapters
score/              Flowing Light score pages
scamp/              SCAMP piece score pages
*.mp4, *.jpg, *.png videos, posters, portrait
```

## Publish with GitHub Pages

1. Create a GitHub repo and push this folder.
2. Repo → Settings → Pages → Source: "GitHub Actions", and add a workflow that uploads the `website/` folder
   (branch deploy only supports `/` or `/docs`, not `/website`).
3. The site appears at `https://<your-username>.github.io/<repo-name>/`.
