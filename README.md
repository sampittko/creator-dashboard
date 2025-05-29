# [free with tech](https://fwt.wtf) - Creator Dashboard

A transparent, open-source dashboard to track the weekly progress of building a content brand from scratch. This project documents content creation, time investment, and resources spent — all in the open.

## ✨ Why this project?

[**free with tech**](https://fwt.wtf) is about showing the real journey behind building something online. The dashboard shows week-by-week:

- Topics covered
- Hours worked
- Blog and video publishing activity
- Creator streaks and progress metrics

It’s part experiment, part accountability, part resource for other creators.

## 🧱 Tech Stack

- **Next.js + TypeScript**
- **Tailwind CSS** for styling
- **Local JSON data** (`/data/weeks.json`)

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/sampittko/dash-fwtwtf-website.git
cd dash-fwtwtf-website
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📁 Project Structure

```bash

/data                # Weekly data (JSON)
/lib                 # Utility functions (e.g., stats aggregation)
/types               # TypeScript types
/app                 # Next.js app routes and components

```

## 📊 Add your own data

To track your own weekly progress:

1. Copy the structure from /data/weeks.json
2. Replace with your own data (make sure it matches the `WeeklyEntry` type)
3. Extend or tweak the stats logic in `/lib/stats.ts` if needed

## 🤝 Contributing

Pull requests welcome! Feel free to open an issue or PR if you'd like to:

- Improve the design
- Add new insights or metrics
- Add export features (CSV, JSON, etc.)
- ...

## 💡 Inspiration

This project was inspired by a desire to build in public and stay accountable — while also giving others a blueprint to follow.

## ☕ Support

If you find this project valuable, [consider buying me a coffee](https://www.buymeacoffee.com/sampittko)!

---

**Part of the [free with tech](https://freewith.tech) ecosystem** - helping people build a healthier relationship with technology.
