# Crutastic home page

The welcome page for crutastic.com.

## Why Mark built it
People who see one of Mark's projects sometimes wonder what "Crutastic" is. Before this, crutastic.com showed a GoDaddy stock picture, which was confusing. Mark wanted a simple, encouraging page that says: this is my AI project space, I serve with Cru, and I'm learning to use AI in my work. It should say little about him, list a few safe projects quietly, and let people reach out without showing his email.

## How it works
- `index.html` is the whole page. `img/hero.jpg` is the mountain sunrise photo (free Unsplash photo).
- Hosted on GitHub Pages from the `main` branch.
- The "Say hello" form sends to a Google Apps Script (`apps-script/Code.js`) owned by Mark's Cru Google account. It emails each note to Mark, with Reply set to the visitor. Nothing else is saved.
- Spam guards: a hidden box bots fill in, and at most 30 notes an hour.

## Decisions
- 2026-11-16: Headline is "My AI project space." Mark didn't like "busywork"; welcome line ends "so more of my time goes to what matters."
- 2026-11-16: Projects listed: Flashcards, Ministry Product Framework, Cru High School Legacy, Sound Machine, Caption Cleanup. Left out the sensitive ones (see AGENTS.md).
- 2026-11-16: Form uses a Google script instead of a paid form service, so Mark gets an email and his address stays hidden. Mark chose email only, no sheet.
- 2026-11-16: Footer verse: Colossians 3:23.

## Ideas for later
- Show new notes in Home Base or Command Center.

## History
- 2026-11-16: Built the page and form.
