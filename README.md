# NEWSMAG — News & Magazine HTML Template

> Stories That Matter.

A bold, editorial HTML template for online magazines, news publications, and digital storytelling. Built with pure HTML5, CSS3, and vanilla JavaScript — zero frameworks, zero dependencies.

## 📄 Pages

| Page | Description | Link |
|------|-------------|------|
| Home | Breaking news ticker, featured stories, category grids, trending sidebar | [index.html](index.html) |
| Article | Full article view with hero image, author bio, related stories | [article.html](article.html) |
| Category | Filtered article listings by topic with sidebar widgets | [category.html](category.html) |
| Contact | Contact form, editorial office info, advertising inquiry | [contact.html](contact.html) |

## ✨ Features

- **Editorial Typography** — Merriweather serif headings paired with Open Sans body text for readability
- **Breaking News Ticker** — Animated scrolling headline bar for real-time updates
- **Category Grid** — Organized story sections with image cards and hover effects
- **Trending Sidebar** — Most-read stories ranked with numbered badges
- **Article Cards** — Multiple card layouts (horizontal, vertical, featured) with category tags
- **Author Profiles** — Author avatars, bios, and social links on article pages
- **Responsive Layout** — Works beautifully on desktop, tablet, and mobile
- **Scroll Animations** — IntersectionObserver-powered reveal effects
- **Mobile Navigation** — Hamburger menu with smooth transitions
- **Reduced Motion Support** — Respects `prefers-reduced-motion` setting

## 🚀 Quick Start

1. Open `index.html` in a browser — no build step needed
2. Replace images in `assets/img/` with your own
3. Edit content directly in the HTML files
4. Customize colors in `assets/css/style.css` via CSS custom properties

## 🎨 Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--clr-dark` | `#111827` | Primary dark backgrounds |
| `--clr-red` | `#DC2626` | Accent / breaking news |
| `--clr-red-dark` | `#B91C1C` | Hover state |
| `--clr-gray` | `#F3F4F6` | Section backgrounds |
| `--clr-gray-dark` | `#6B7280` | Body text |

### Typography
- **Headings:** Merriweather (Google Fonts) — classic editorial serif
- **Body:** Open Sans (Google Fonts) — clean, highly readable sans-serif

## 📁 File Structure

```
news-magazine-html-template/
├── index.html          # Home — breaking news, featured stories, categories
├── article.html        # Full article view
├── category.html       # Category-filtered listings
├── contact.html        # Contact & advertising
├── assets/
│   ├── css/
│   │   └── style.css   # Full design system
│   ├── js/
│   │   └── main.js     # All interactions
│   └── img/            # Template images
└── README.md           # This file
```

## 🔧 Customization

1. **Colors:** Edit CSS custom properties in `:root` block of `style.css`
2. **Fonts:** Change Google Fonts `@import` URL and update `--ff-heading` / `--ff-body`
3. **Content:** Edit text directly in HTML files
4. **Images:** Replace files in `assets/img/` keeping same filenames, or update `src` attributes
5. **Breaking Ticker:** Update the scrolling text in the `header__breaking-ticker` element

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

Free for personal and commercial use. Attribution appreciated.

---

[![Build Something Together](https://img.shields.io/badge/Let's_Build_Something_Together-🚀-DC2626)](https://tally.so/r/q4q1L9)
