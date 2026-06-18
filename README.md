# CSAT Campaign Builder

A simplified **Customer Satisfaction (CSAT) Campaign Builder** built as part of the AppVersal Frontend Intern Assignment. It allows users to configure a CSAT feedback popup through a Content tab and a Styling tab, with a live mobile preview that updates in real time.

---

## 🚀 Live Demo

🔗 [View Deployed App](https://csat-builder.vercel.app) <!-- Replace with your actual Vercel URL -->

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| JavaScript (JSX) | Component Logic |
| CSS-in-JS (inline styles) | Styling |
| Vite | Build Tool & Dev Server |
| Vercel | Deployment |

---

## ✨ Features

### Content Tab
- **Initial Screen** — Configure title and subtitle
- **Feedback Screen** — Choose rating style (Stars or Numbers 1–5), add/delete dynamic options, toggle additional comment field, customize submit button text
- **Thank You Screen** — Upload media (PNG, JPG, JPEG, GIF, Lottie JSON), set title, subtitle, and button text

### Styling Tab
- Background color, Title color, Subtitle color
- Button color, Button text color
- Font size & font weight
- Border radius
- Button width & height
- Rating selected / unselected colors

### Live Mobile Preview
- Real-time phone frame preview on the right side
- Switch between Initial, Feedback, and Thank You screens
- No save button required — all changes reflect instantly

---

## 📁 Folder Structure

```
csat-builder/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main application (all components)
│   ├── App.css          # Base styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18 or above
- npm v9 or above

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/rituraj005/csat-Builder.git
cd csat-Builder
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
```

---

## 📦 Deployment

This project is deployed on **Vercel**.

To deploy your own:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Vite — just click **Deploy**

---

## 📄 License

This project was built for the AppVersal Frontend Intern Assignment.
