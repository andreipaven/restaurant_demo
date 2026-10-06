# Project Rules

## Tech Stack
- Next.js
- JavaScript
- Material UI
- Next intl
- Motion (for animations)

## Coding Rules
- Prefer Server Components when possible.
- Keep existing folder structure.
- Reuse existing components before creating new ones.
- Follow the current coding style.
- Never change architecture unless asked.
- Keep changes as small as possible.
- Do not rename files unless necessary.
- Match the existing coding style used throughout the project.
- Never make assumptions about missing code. Ask for the relevant file.
- If multiple solutions exist, explain the pros and cons before implementing one.
- Do not modify more than one feature in a single task.
- Do not introduce new libraries unless explicitly approved.
- Do not remove existing functionality unless explicitly requested.
- Preserve backward compatibility whenever possible.
- Prefer fixing the root cause instead of applying temporary workarounds.
  -All names, variables, and code must be written in English.

## Architecture

File layout for a bilingual site on the App Router. Keep the same shape in new
projects; the folder names are the contract.

```
app/
  [locale]/
    layout.js            fonts, theme, header, footer, metadata defaults
    page.js              home
    <route>/page.js      one folder per public page
    <route>/actions.js   server actions for that route ("use server")
    admin/               internal tools, guarded in proxy.js
    not-found.js         404 inside a locale
    [...rest]/page.js    catch-all that calls notFound()
    opengraph-image.js   social preview, generated per locale
  api/<name>/route.js    HTTP endpoints (see Data and forms)
  globals.css            base rules only
  icon.svg               favicon
  robots.js, sitemap.js  metadata routes
  siteUrl.js             one source for the public base URL
  pageMetadata.js        canonical, hreflang, Open Graph per page
components/
  layout/                header, footer, logo — the shell
  ui/                    shared pieces used by more than one page
  <feature>/             everything a single feature owns
content/                 data that is not copy: projects, prices
i18n/                    routing.js, navigation.js, request.js
messages/                ro.json, en.json — every visible string
theme/                   palette, MUI theme, shared style helpers
proxy.js                 locale routing + route guards (Next 16 middleware)
```

## Data and forms

- **The contact form, and any form that reaches a third-party service, goes
  through `app/api/<name>/route.js`.** The route handler validates the input
  again on the server, calls the external service, and returns a JSON result.
  The client component posts to it with `fetch` and renders the outcome.
- **Secrets are read inside the route handler**, from environment variables
  without the `NEXT_PUBLIC_` prefix, and are never logged.
- **Validation lives in one shared module** imported by both the form and the
  route, so the browser and the server apply the same rules.
- **Every endpoint that sends mail or writes data is rate limited by sender.**
- Server Actions stay for internal pages (admin), where no public HTTP
  endpoint is wanted.

## Colours

- **Every colour comes from `theme/palette.js`.** No colour literal is written
  anywhere else: not in a component, not in `sx`, not in `globals.css`, not in
  an inline SVG.
- Components import the `palette` object and read a token from it.
- `globals.css` and any other plain CSS read the `--ob-*` custom properties,
  which `theme/ThemeRegistry.js` publishes on `:root` from the same tokens.
- Inline SVG uses `currentColor`, or a token passed in as a prop.
- A colour that does not exist yet is added to `theme/palette.js` first, with a
  name that says what it is for, and then used by its token.

## Security
- Never print API keys or secrets.
- Never read or modify .env files.
- Never expose secrets in code or logs.
- Never change Stripe webhook configuration.
- Never remove authentication or authorization checks.

## Workflow
- Explain the problem before proposing a solution.
- Ask for confirmation before major refactors.
- Ask before installing or removing packages.
- If information is missing, ask instead of guessing.
- Explain every significant code change.