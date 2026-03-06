# DOFLAMINGO - Mongolian E-Commerce Store

🛍️ **Static React app ready for Netlify deployment**

## 🚀 Quick Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com) and log in
2. Drag the entire `Doflamingo` folder onto the Netlify dashboard
3. Done! Your site is live

### Option 2: Git Deploy (Recommended)
1. Create a new GitHub repository
2. Push this folder to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. In Netlify, click "New site from Git"
4. Connect your GitHub repo
5. Deploy settings are auto-detected from `netlify.toml`

### Option 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 📁 Files Included

- `index.html` - Main HTML file
- `app.js` - React application (static, no backend needed)
- `Doflamingo.css` - Styles
- `netlify.toml` - Netlify configuration
- `_redirects` - SPA routing configuration
- `.gitignore` - Git ignore rules

## ✨ Features

- 6 Mongolian products pre-loaded
- Shopping cart functionality
- Checkout form (static demo)
- Fully responsive design
- No database or backend required
- Fast static hosting

## 🛠️ Customization

To change products, edit the `PRODUCTS` array in `app.js`:

```javascript
const PRODUCTS = [
  { id: 1, name: "Product Name", price: 50000, description: "...", category: "...", image: "" },
  // Add more products here
];
```

## 📝 Notes

- This is a **static demo version** - checkout form doesn't process real payments
- To add real payment processing, integrate Stripe or another payment gateway
- Product images can be added by setting the `image` property to a URL

## 🎨 Tech Stack

- React 18 (CDN)
- Vanilla CSS
- No build tools required
- Netlify hosting

---

**Built for Netlify** • Ready to deploy in seconds ⚡
