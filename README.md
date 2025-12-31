# AI News Pulse – Dynamic News Aggregator with Sentiment Analysis

A production-ready, full-stack news aggregator powered by AI that scrapes news from multiple sources, performs sentiment analysis and topic classification using Google Gemini AI, and presents them in a beautiful, responsive interface.

![AI News Pulse](https://img.shields.io/badge/Node.js-18.x-green) ![React](https://img.shields.io/badge/React-18.x-blue) ![Vite](https://img.shields.io/badge/Vite-5.x-purple)

## 🎯 Project Overview

AI News Pulse is a sophisticated news aggregation platform that:
- **Scrapes** news from BBC News and TechCrunch
- **Analyzes** sentiment using Google Gemini AI (Positive/Neutral/Negative)
- **Classifies** articles into categories (Politics, Business, Technology, Sports, Health, Other)
- **Filters** articles by sentiment and category
- **Displays** news in a premium, portfolio-ready UI

## 🏗️ Architecture

### Backend Architecture
```
Backend (Node.js 18 + Express)
├── Scrapers (Cheerio)
│   ├── BBC News Scraper
│   └── TechCrunch Scraper
├── AI Services (Google Gemini)
│   ├── Sentiment Analysis
│   ├── Category Classification
│   └── Data Diversity Checks
├── Database (MongoDB + Mongoose)
│   └── Article Storage
└── REST API
    └── GET /api/news (with filters)
```

**Tech Stack:**
- **Runtime:** Node.js 18.x
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Scraping:** Cheerio + Axios
- **AI:** Google Gemini API (@google/generative-ai)

### Frontend Architecture
```
Frontend (React 18 + Vite 5)
├── Components
│   ├── FilterBar (Sticky)
│   ├── NewsCard
│   ├── SentimentBadge (Color-coded)
│   └── CategoryChip
├── Services
│   └── API Client (Axios)
└── App (State Management)
```

**Tech Stack:**
- **Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **HTTP Client:** Axios
- **Styling:** Modern CSS with gradients, animations

## 🤖 AI Pipeline

### How It Works

1. **Scraping Phase**
   - Scrapes BBC News and TechCrunch homepages
   - Extracts title, description, URL, source, and publish date
   - Deduplicates articles by URL
   - Ensures descriptions are never empty

2. **AI Analysis Phase**
   - Sends each article (title + description) to Google Gemini AI
   - **Sentiment Analysis:** Returns score from -1 to 1
     - `score > 0.2` → Positive
     - `-0.2 ≤ score ≤ 0.2` → Neutral
     - `score < -0.2` → Negative
   - **Category Classification:** Analyzes content to determine category
     - Politics, Business, Technology, Sports, Health, or Other

3. **Data Diversity Strategy**
   - After initial processing, checks dataset distribution
   - If >80% articles are Neutral OR >80% are "Other", triggers re-analysis
   - Re-analyzes with stricter prompts to ensure meaningful diversity
   - **Does NOT fabricate data** - only re-classifies more precisely

4. **Storage Phase**
   - Saves processed articles to MongoDB
   - Creates indexes for efficient filtering
   - Displays statistics (sentiment & category distribution)

### AI Prompt Engineering

The system uses carefully crafted prompts to ensure:
- Accurate sentiment scoring with clear reasoning
- Precise category classification
- Avoidance of default/neutral classifications
- Consideration of context and nuances

## 🔍 Filtering Logic

### API Endpoint
```
GET /api/news?sentiment=<value>&category=<value>
```

**Query Parameters:**
- `sentiment`: `Positive`, `Neutral`, `Negative`, or `All`
- `category`: `Politics`, `Business`, `Technology`, `Sports`, `Health`, `Other`, or `All`

**Examples:**
```bash
# All articles
GET /api/news

# Only positive articles
GET /api/news?sentiment=Positive

# Only technology articles
GET /api/news?category=Technology

# Negative business articles
GET /api/news?sentiment=Negative&category=Business
```

### Frontend Filters
- **Sticky filter bar** stays visible while scrolling
- **Multiple active filters** work together (AND logic)
- **Real-time filtering** fetches data on filter change
- **Visual feedback** shows active filter states
- **Smart empty states** guide users when no results

## 📦 Version Choices

### Why Node.js 18?
- **Long-term Support (LTS)** release
- **Stable** for production environments
- **Compatible** with all dependencies
- **Avoids** experimental features of v19/v20

### Why React 18?
- **Production-ready** concurrent features
- **Improved performance** with automatic batching
- **Stable API** unlike React 19 (experimental)
- **Wide ecosystem support**

### Why Vite 5?
- **Fastest** build tool for React
- **Stable version** (Vite 6/7 are too new)
- **Excellent DX** with HMR
- **Compatible** with React 18

## 🚀 Local Setup

### Prerequisites
- **Node.js 18.x** ([Download](https://nodejs.org))
- **MongoDB** installed and running
- **Google Gemini API Key** ([Get one](https://makersuite.google.com/app/apikey))

### Installation

#### 1. Clone or Navigate to Project
```bash
cd Dynamic-news-aggregator-with-sentiment-analysis
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/news-aggregator
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### Running the Application

#### Terminal 1: Start MongoDB
```bash
# Windows (if MongoDB is not running as service)
mongod

# Or on macOS/Linux
sudo systemctl start mongod
```

#### Terminal 2: Scrape News (First Time)
```bash
cd backend
npm run scrape
```

**Expected Output:**
```
✅ MongoDB Connected
📰 Scraping BBC News...
📰 Scraping TechCrunch...
🤖 Analyzing articles with Gemini AI...
💾 Saving articles to database...
📊 Dataset Statistics:
  Total Articles: 25
  Sentiment Distribution:
    Positive: 8 (32%)
    Neutral: 12 (48%)
    Negative: 5 (20%)
  Category Distribution:
    Technology: 12 (48%)
    Business: 7 (28%)
    Politics: 4 (16%)
    Other: 2 (8%)
```

#### Terminal 3: Start Backend Server
```bash
cd backend
npm start
```

Server runs at: `http://localhost:5000`

#### Terminal 4: Start Frontend
```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Accessing the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📡 API Documentation

### GET /api/news

Retrieve filtered news articles.

**Query Parameters:**
| Parameter | Type | Values | Default |
|-----------|------|--------|---------|
| `sentiment` | string | `Positive`, `Neutral`, `Negative`, `All` | `All` |
| `category` | string | `Politics`, `Business`, `Technology`, `Sports`, `Health`, `Other`, `All` | `All` |

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://...",
      "source": "BBC News",
      "publishDate": "2025-12-31T07:00:00.000Z",
      "category": "Technology",
      "sentimentLabel": "Positive",
      "sentimentScore": 0.65,
      "createdAt": "2025-12-31T07:54:00.000Z"
    }
  ]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "AI News Pulse API is running"
}
```

## 📂 Project Structure

```
Dynamic-news-aggregator-with-sentiment-analysis/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   └── Article.js         # Mongoose schema
│   │   ├── scrapers/
│   │   │   ├── bbcScraper.js      # BBC News scraper
│   │   │   └── techcrunchScraper.js # TechCrunch scraper
│   │   ├── services/
│   │   │   ├── geminiService.js   # AI sentiment & categorization
│   │   │   └── newsService.js     # Business logic
│   │   ├── routes/
│   │   │   └── news.js            # API routes
│   │   ├── scripts/
│   │   │   └── scrapeNews.js      # Scraper script
│   │   └── server.js              # Express server
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NewsCard.jsx       # Article card component
│   │   │   ├── FilterBar.jsx      # Sticky filter bar
│   │   │   ├── SentimentBadge.jsx # Color-coded badges
│   │   │   └── CategoryChip.jsx   # Category chips
│   │   ├── services/
│   │   │   └── api.js             # API client
│   │   ├── App.jsx                # Main app component
│   │   ├── App.css                # Styles
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🎨 UI Features

### Professional Design Elements
- **Dark theme** with purple gradient accents
- **Card-based layout** with hover effects and shadows
- **Color-coded sentiment badges:**
  - 🟢 Green = Positive
  - 🟡 Yellow = Neutral  
  - 🔴 Red = Negative
- **Category chips** with distinct colors
- **Sticky filter bar** for easy navigation
- **Smooth animations** and transitions
- **Responsive design** (desktop, tablet, mobile)
- **Loading states** with animated spinner
- **Empty states** with helpful messages
- **Error handling** with retry functionality

### Typography
- **Font:** Inter (Google Fonts)
- **Proper hierarchy:** Headings, body text, labels
- **Readable line heights** and spacing

## 🔧 Troubleshooting

### No Articles Showing?
1. Make sure you ran `npm run scrape` to populate the database
2. Check MongoDB is running (`mongod`)
3. Verify backend server is running on port 5000

### Backend Won't Start?
1. Verify Node.js version: `node --version` (should be 18.x)
2. Check MongoDB connection in `.env`
3. Ensure Gemini API key is valid

### Frontend Build Errors?
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Verify React 18 and Vite 5 versions in `package.json`

### AI Analysis Taking Long?
- Normal! Gemini API processes each article individually
- Typical time: 30-60 seconds for 20-30 articles
- Includes 300ms delay between requests to avoid rate limits

## 🚀 Future Enhancements

- [ ] **More news sources** (CNN, Reuters, etc.)
- [ ] **Real-time updates** with WebSockets
- [ ] **User accounts** and saved articles
- [ ] **Advanced search** functionality
- [ ] **Chart visualizations** for sentiment trends
- [ ] **Email digests** with top stories
- [ ] **Dark/Light mode** toggle
- [ ] **Share articles** on social media
- [ ] **Bookmark** favorite articles
- [ ] **PWA support** for mobile

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Credits

- **News Sources:** BBC News, TechCrunch
- **AI:** Google Gemini API
- **Icons:** Emoji
- **Fonts:** Google Fonts (Inter)

---

**Built with ❤️ using Node.js 18, React 18, Vite 5, MongoDB, and Google Gemini AI**
