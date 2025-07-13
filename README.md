
# 💰 Personal Finance Tracker

A modern, responsive web application to **track, visualize, and manage personal finances** effectively — built using Next.js, MongoDB, Recharts, and shadcn/ui.

---

## 🚀 Live Demo

👉 [Live App on Vercel](https://personal-finance-tracker-beryl-eta.vercel.app)

## 🔗 GitHub Repository

👉 [GitHub: Sneha-Deepthi/Personal-Finance-Tracker](https://github.com/Sneha-Deepthi/Personal-Finance-Tracker)

---

## ✨ Features

### ✅ Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (with amount, date, and description)
- View transactions in a list
- Monthly expense chart (Bar graph)
- Basic form validations

### 📊 Stage 2: Categorization
- Predefined transaction categories
- Category-wise Pie Chart (for expense breakdown)
- Dashboard with:
  - 💸 Total Expenses card
  - 📂 Category Breakdown card
  - 🕒 Recent Transactions list

### 💡 Stage 3: Budgeting & Insights
- Create monthly budgets by category
- Budget vs Actual Comparison Chart (Bar graph)
- Smart spending insights for users

### 🌙 UI/UX & Experience
- Responsive layout across devices
- Fully supports Dark Mode
- Clean and user-friendly interface

---

## 🧠 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | Next.js, React                     |
| Styling/UI   | Tailwind CSS, shadcn/ui            |
| Charts       | Recharts                           |
| Backend      | Next.js API Routes                 |
| Database     | MongoDB Atlas                      |

---

## 🧱 Folder Structure

```
/src
 ├── app/
 │   ├── api/
 │   │   ├── transactions/    # API routes for transaction CRUD
 │   │   └── budgets/         # API routes for budgets
 │   ├── transactions/        # Transaction page components
 │   ├── budget/              # Budget form, chart, insights
 |   ├── NavBar/
 │   ├── layout.js
 │   ├── globals.css          # Global styles
 |   └── page.js
 ├── components/
 │   ├── ui/                  # shadcn/ui components
 │   ├── CategoryPieChart.js
 │   └── Dashboard.js
 ├── lib/
 │   ├── categories.js        # Predefined categories
 │   ├── mongo.js
 │   └── utils.js
 └── models/
     ├── Budget.js            # Mongoose model
     └── Transaction.js       # Mongoose model
```

---

## 🧪 Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/Sneha-Deepthi/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker

# 2. Install dependencies
npm install

# 3. Create the environment file
touch .env.local
```

Inside `.env.local`:

```
MONGODB_URI=your_mongodb_connection_string
```

```bash
# 4. Run the dev server
npm run dev

# 5. Open in browser
http://localhost:3000
```

---

## 🌍 Deployment

- Deployed on [Vercel](https://vercel.com/)
- Auto-deployment on every push to `main`

---

## 👩‍💻 Author

Built with ❤️ by [Sneha Deepthi](https://github.com/Sneha-Deepthi)
