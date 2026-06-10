# Testimonials Carousel - Be LOVE™ Growth Engineer Assessment

A reusable Shopify theme section that lets the marketing team manage testimonials entirely from the theme editor, no code required. Supports two content modes (metaobjects and blocks), a configurable carousel, and responsive layout across desktop and mobile.

## What I Built

### Files

| File | Purpose |
|------|---------|
| `sections/testimonials.liquid` | Section entry point: schema, settings, and markup |
| `snippets/testimonials.liquid` | Renders individual testimonial cards |
| `assets/testimonial-carousel.js` | Custom element that initializes the Splide carousel |
| `assets/section-testimonials.css` | Section and card styles |

### Content Modes

The section supports two modes, toggled via a setting in the theme editor:

**Metaobject mode** - testimonials are pulled from a `Testimonial Group` metaobject, which bundles individual `Testimonial Entry` records. The marketing team selects a group in the theme editor; all entries in that group render automatically.

**Block mode** - testimonials are added manually as blocks directly in the theme editor. Better for one-off landing pages or quick setup.

The `testimonials.liquid` snippet handles both via a single conditional:

```liquid
{% if section.settings.content_mode %}
  {# read from metaobject references #}
{% else %}
  {# read from block settings #}
{% endif %}
```

### Metaobject Schema

Metaobjects are structured in two tiers to give the marketing team flexible control without touching code.

**`Testimonial Entry`** - the master record for a single testimonial:

| Field | Type |
|-------|------|
| `image` | File reference |
| `name` | Single line text |
| `title` | Single line text |
| `body` | Multi-line text |
| `rating` | Integer (1–5) |

**`Testimonial Group`** - a named bundle of entries:

| Field | Type |
|-------|------|
| `title` | Single line text |
| `testimonials` | List of `Testimonial Entry` references |

Instead of selecting individual testimonials on every page, the marketing team picks a Group. Groups can be curated by theme (ie. social, star ratings, product team, and so on), while all entries live in one managed master list. Adding or editing an entry updates it everywhere it's referenced automatically.

### Section Schema Settings

Configurable from the Shopify theme editor:

| Setting | Type | Description |
|---------|------|-------------|
| Section title | Text | Displayed above the carousel |
| Section subtitle | Text | Displayed below the title |
| Content mode | Checkbox | Toggle between metaobject and block mode |
| Desktop slides | Range | Number of cards visible on desktop |
| Mobile slides | Range | Number of cards visible on mobile |

### Testimonial Card

Each card displays:

- Avatar image (optional, falls back to a placeholder SVG)
- Customer name
- Customer title
- Star rating (1–5, rendered as inline SVGs)
- Body copy (quote)

### Carousel

Built with [Splide.js](https://splidejs.com/). The `<testimonial-component>` custom element reads `data-desktop-slides` and `data-mobile-slides` from the DOM and initializes Splide with the correct `perPage` values per breakpoint.

## Demo

Store URL: https://ada-belove-tech-challenge.myshopify.com

If no blocks or metaobjects are assigned to the section, no content will display.

**With metaobjects configured:**

| Page | URL |
|------|-----|
| Index | https://ada-belove-tech-challenge.myshopify.com |
| Product | https://ada-belove-tech-challenge.myshopify.com/products/the-multi-managed-snowboard |
| Product | https://ada-belove-tech-challenge.myshopify.com/products/the-multi-location-snowboard |
| Page | https://ada-belove-tech-challenge.myshopify.com/pages/test-page |

**Without metaobjects (block mode):**

| Page | URL |
|------|-----|
| Product | https://ada-belove-tech-challenge.myshopify.com/products/the-3p-fulfilled-snowboard |
| Page | https://ada-belove-tech-challenge.myshopify.com/pages/test-page-2 |

## Trade-offs & Decisions

- **Splide over other libraries** - lightweight, no jQuery dependency, good breakpoint support out of the box.
- **Custom element (`<testimonial-component>`)** - keeps JS scoped to the section and avoids global init collisions if the section appears multiple times.
- **Inline SVG stars** - avoids an icon font or image request dependency for a simple 1–5 rating.
- **Fallback avatar** - rather than hiding the image slot when none is provided, a neutral SVG placeholder keeps the card layout consistent.
- **Two-tier metaobject architecture** - separating Entries from Groups means the master list is managed once, and marketing can freely create, swap, or reorganize groups without risking data duplication or inconsistency.

## Dependencies

```liquid
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/css/splide.min.css">
<script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/js/splide.min.js"></script>
```
