# Pure Wave Intelligence – Static Site (Dockerized)

This repository contains the static marketing site for **Pure Wave Intelligence**, packaged to run as a lightweight Docker container using **nginx**.

## Project Structure

- `app/` – All static assets served by nginx:
  - `index.html` – Main site entrypoint
  - `styles.css` – Global styles and layout
  - `main.js` – Front-end interactions and animations
  - `robots.txt` – Crawler rules
  - `sitemap.xml` – XML sitemap
- `docker/`
  - `nginx.conf` – Custom nginx configuration for serving the static site
- `Dockerfile` – Build definition for the nginx-based image

> Note: There may also be root-level copies of `index.html`, `styles.css`, `main.js`, etc. The **Docker image only uses the files under `app/`**.

## Running Locally with Docker

From the project root:

### 1. Build the image

```bash
docker build -t purewave-static .
```

### 2. Run the container

```bash
docker run --rm -p 8080:80 purewave-static
```

Then open `http://localhost:8080` in your browser.

## Editing the Site

- Make content and layout changes in `app/index.html`.
- Update styles in `app/styles.css`.
- Update behavior/interaction in `app/main.js`.
- Adjust SEO/crawling behavior via:
  - `app/robots.txt`
  - `app/sitemap.xml`

After changes, rebuild and re-run the Docker container to see them reflected:

```bash
docker build -t purewave-static .
docker run --rm -p 8080:80 purewave-static
```


