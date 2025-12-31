# Quick Start Guide - AI News Pulse

## 🚀 Getting Started in 5 Steps

### Step 1: Add Your Gemini API Key ⚡

1. Get your API key from: https://makersuite.google.com/app/apikey
2. Open `backend/.env.example`
3. Copy it and rename to `backend/.env`
4. Replace `YOUR_ACTUAL_GEMINI_API_KEY_HERE` with your real key

Example `.env` file:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/news-aggregator
GEMINI_API_KEY=AIzaSyD... (your actual key here)
PORT=5000
```

### Step 2: Start MongoDB 🗄️

Make sure MongoDB is running:
```bash
mongod
```

Or if running as a service, it should already be active.

### Step 3: Scrape News 📰

Open Terminal 1:
```bash
cd backend
npm run scrape
```

**What this does:**
- Scrapes BBC News + TechCrunch
- Analyzes sentiment with Gemini AI
- Classifies categories
- Saves to MongoDB

**Time:** ~30-60 seconds for 20-30 articles

### Step 4: Start Backend 🔧

Open Terminal 2:
```bash
cd backend
npm start
```

✅ Backend running at: http://localhost:5000

### Step 5: Start Frontend 🎨

Open Terminal 3:
```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:5173

---

## 🌐 Open in Browser

Navigate to: **http://localhost:5173**

You should see:
- ✅ Purple gradient header
- ✅ Sticky filter bar (Sentiment + Category)
- ✅ News cards with color-coded badges
- ✅ Beautiful dark theme

---

## 🎯 Testing the App

1. **All Articles:** Default view shows all articles
2. **Filter by Sentiment:** Click Positive/Neutral/Negative
3. **Filter by Category:** Click Technology/Business/Politics/etc.
4. **Combined Filters:** Select both sentiment and category
5. **Dynamic Updates:** Filters work in real-time

---

## 🔄 Re-scraping News

To get fresh news articles:

```bash
cd backend
npm run scrape
```

This will fetch the latest articles from BBC and TechCrunch.

---

## 📊 Expected Data Distribution

After scraping, you should see diverse data:
- ✅ Mix of Positive, Neutral, and Negative sentiments
- ✅ Articles across multiple categories
- ✅ NOT all neutral or "Other"

The AI ensures diversity through retry logic!

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify Gemini API key in `.env`
- Ensure Node.js 18.x: `node --version`

**No articles showing?**
- Run `npm run scrape` first to populate database
- Check backend terminal for errors

**Frontend errors?**
- Make sure backend is running on port 5000
- Check browser console for errors

---

## 📚 Full Documentation

See [README.md](file:///c:/Users/Prajwal/Documents/Dynamic-news-aggregator-with-sentiment-analysis/README.md) for:
- Complete architecture
- AI pipeline details
- API documentation
- Troubleshooting guide

---

**Ready to launch! 🚀**
