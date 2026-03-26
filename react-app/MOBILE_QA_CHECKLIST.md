# Mobile First QA Checklist

Use this checklist before release to prevent text clipping and layout regressions on mobile.

## Viewports To Test First

- `320x568`
- `360x800`
- `390x844`

Only after mobile passes:

- `768x1024`
- `1024x768`

## Route Checklist

- `#/wants-vs-needs`
- `#/compound-savings-investment-age`
- `#/index-investing`
- `#/ikigai-personality-onboarding`
- `#/cv-template-israeli`

## Validation Rules

- No horizontal scrolling in any route.
- No clipped/hidden text in headings, badges, cards, or buttons.
- Long Hebrew text wraps correctly (`overflow-wrap` and no forced `nowrap`).
- Inputs and CTA buttons stay visible and clickable.
- Salary bar, add-row, and legends wrap without overlap.
- KPI values and subtitles remain readable at 320px.

## Optional Visual Regression

- Add one screenshot assertion for the main route (`#/wants-vs-needs`) at `390x844`.
- Add one screenshot assertion for dense layout route (`#/compound-savings-investment-age`) at `320x568`.
