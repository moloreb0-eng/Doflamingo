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

## 💻 Connecting Your GitHub Account to VS Code

Follow these steps to open and edit this repository directly in VS Code:

### Step 1 – Sign in to GitHub in VS Code
1. Open **VS Code**.
2. Click the **Accounts** icon in the bottom-left corner of the Activity Bar (looks like a person).
3. Choose **Sign in with GitHub**.
4. A browser window will open — log in to your GitHub account and click **Authorize Visual Studio Code**.
5. VS Code is now connected to your GitHub account.

### Step 2 – Clone this Repository
1. Press **Ctrl+Shift+P** (Windows/Linux) or **Cmd+Shift+P** (Mac) to open the Command Palette.
2. Type **Git: Clone** and select it.
3. Paste the repository URL (replace with your own fork's URL if you have forked this repo):
   ```
   https://github.com/moloreb0-eng/Doflamingo.git
   ```
4. Choose a local folder where the project will be saved.
5. Click **Open** when VS Code asks if you want to open the cloned repository.

### Step 3 – Open with the Workspace File (Optional)
This repo includes a `Doflamingo.code-workspace` file, which provides pre-configured project-specific settings (such as recommended extensions and editor preferences).  
Open it directly in VS Code for the best editing experience:
```
File → Open Workspace from File… → Doflamingo.code-workspace
```

### Step 4 – Make Changes and Push Back to GitHub
```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Your change description"

# Push to GitHub
git push
```

You can also use the **Source Control** panel (the branch icon in the Activity Bar) to stage, commit, and push changes without using the terminal.

---

## 🤖 Enabling GitHub Copilot Pro in VS Code

GitHub Copilot Pro gives you AI-powered code suggestions directly inside VS Code. Follow these steps to activate it using your GitHub account.

### Prerequisites
- You must have an active **GitHub Copilot Pro** (or Copilot Individual/Business) subscription.  
  If you don't have one yet, subscribe at [github.com/features/copilot](https://github.com/features/copilot).
- Your GitHub account must already be connected to VS Code (see **Step 1** above).

### Step 1 – Install the GitHub Copilot Extension
1. Open VS Code.
2. Click the **Extensions** icon in the Activity Bar (or press **Ctrl+Shift+X** / **Cmd+Shift+X**).
3. Search for **GitHub Copilot**.
4. Click **Install** on the extension published by **GitHub**.
5. *(Recommended)* Also install **GitHub Copilot Chat** for the conversational AI sidebar.

### Step 2 – Sign in with Your GitHub Account
1. After the extension installs, a sign-in prompt will appear in the bottom-right corner — click **Sign in to GitHub**.
2. If no prompt appears, click the **Accounts** icon (bottom-left Activity Bar) and choose **Sign in with GitHub to use GitHub Copilot**.
3. A browser window will open — log in and click **Authorize GitHub Copilot Plugin**.
4. Return to VS Code. You should see a ✅ Copilot icon in the status bar at the bottom, confirming it is active.

### Step 3 – Verify Copilot is Working
1. Open any file in this project (e.g., `app.js`).
2. Start typing a comment or a new line of code — Copilot will suggest completions in grey text.
3. Press **Tab** to accept a suggestion, or **Esc** to dismiss it.
4. To open Copilot Chat, click the **chat bubble** icon in the Activity Bar or press **Ctrl+Alt+I** / **Cmd+Alt+I**.

### Troubleshooting
| Problem | Solution |
|---------|----------|
| Copilot icon is red or missing | Click the Accounts icon → sign out and sign back in |
| "Not authorized" error | Make sure your GitHub account has an active Copilot subscription at [github.com/settings/copilot](https://github.com/settings/copilot) |
| Suggestions not appearing | Check that Copilot is enabled: `View → Command Palette → GitHub Copilot: Enable` |
| Wrong GitHub account signed in | Click Accounts icon → sign out → sign in with the correct account |

---

**Built for Netlify** • Ready to deploy in seconds ⚡
