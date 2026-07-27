# Our Village — Website

A small, fast website for our village: population, school, markets, temple,
the river & nature, and village life. Plain HTML/CSS/JS — no build step,
no framework. **Visitors can only view it. Only the repository owner can change it**
(by editing these files and pushing to GitHub).

## Project structure
```
village-website/
├── index.html        # the page content (text you edit)
├── css/
│   └── styles.css    # all styling, colours, layout, light/dark theme
├── js/
│   └── main.js       # small extras: scroll animation + theme toggle
└── images/           # put your photos here
```

## How to change the content (owner only)
1. Open `index.html` in any text editor.
2. Change the wording between the tags (population numbers, school details,
   market timings, temple info, etc.).
3. **To add a photo:** copy the image into the `images/` folder, then find the
   matching photo box and un-comment its `<img ...>` line
   (remove the `<!--` and `-->`). See `images/README.txt` for the file names.
4. Save, then commit and push:
   ```bash
   git add .
   git commit -m "Update village details"
   git push
   ```
   The live site updates in about a minute.

## Preview locally
Just open `index.html` in your browser. (For images to load, open the whole
folder — double-clicking the file works fine.)

## Publish with GitHub Pages
1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages**.
3. **Source:** *Deploy from a branch* · **Branch:** `main` · folder: `/ (root)` → **Save**.
4. Live at `https://<username>.github.io/<repo>/`.
