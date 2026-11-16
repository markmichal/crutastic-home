# Crutastic home page: notes for any AI helper

The simple welcome page at crutastic.com. Read README.md next. Mark is not a coder: plain words, explain tech terms, no em dashes, every web address a clickable link.

## Rules
- This repo is public. Keep private details out of every file here (no email addresses, no personal info).
- Keep the page simple and low key. It is a "what is this place?" page, not a portfolio.
- Never list or link these here: the projects hub, Design Templates, Thrive Instagram, GTTC revamp, LaunchWeek, the Cru Store dashboard, or any demo page that links back to the hub (Home Base, Slideshow Creator, Theme Lab). Before adding a project, check its page has no link to projects.crutastic.com.
- The form posts to the Google script in `apps-script/`. After changing Code.js: `clasp push --force`, then `clasp update-deployment <id from index.html> -d "Crutastic form"` so the web address stays the same.
- crutastic.com DNS is run by Cru DevOps (Terraform, via Mike Albert), not GoDaddy.

## End of session
Follow ~/AI Projects/AGENTS.md.
