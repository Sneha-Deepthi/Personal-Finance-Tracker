
# Personal Finance Tracker 💰

A simple and intuitive web app to track your personal finances — built with Next.js, MongoDB, Recharts, and shadcn/ui.

---

## ✨ Features

- ✅ Add, edit, and delete transactions
- 📅 Monthly expense visualization with interactive bar charts
- 📊 Category-wise expense breakdown (coming soon)
- 🌐 Live deployment with Vercel
- ⚡ Responsive and dark mode-friendly UI

---

## 🚀 Live Demo

👉 [Click here to view the live app](https://personal-finance-tracker-beryl-eta.vercel.app)

---

## 🔗 GitHub Repository

👉 [https://github.com/Sneha-Deepthi/Personal-Finance-Tracker](https://github.com/Sneha-Deepthi/Personal-Finance-Tracker)

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Backend API**: Next.js API routes
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 📁 Project Structure (Key Files)

```
/app
  /api/transactions      # API routes for CRUD
  /components            # UI components 
  /page.tsx              # Main dashboard page
/components/ui           # shadcn/ui components
/lib/mongo.ts            # MongoDB connection utility
/models                  #MongoDB document schema
```

---

## 🧪 Local Development

1. **Clone the repo**:

```bash
git clone https://github.com/Sneha-Deepthi/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Create `.env.local`**:

```env
MONGODB_URI=your_mongodb_connection_string
```

4. **Run the development server**:

```bash
npm run dev
```

5. Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

The app is deployed on [Vercel](https://vercel.com). Every push to `main` automatically triggers a new deployment.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♀️ Author

Built with ❤️ by [Sneha Deepthi](https://github.com/Sneha-Deepthi)
