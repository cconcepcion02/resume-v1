# Chino Concepcion — 3D Resume

A cinematic, single-page résumé built with Next.js, React Three Fiber, Drei, and Motion.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Update your information

- Edit identity, contact links, skills, and projects in `content/resume.ts`.
- Replace `public/profile-placeholder.svg` and update `profileImage` in `content/resume.ts` if your filename changes.
- Replace `public/chino-concepcion-resume.pdf` with your final résumé while keeping the filename to preserve the download link.
- Run `npm run create:resume` only if you need to restore the placeholder PDF.

## Validation

```bash
npm run lint
npm run build
```
