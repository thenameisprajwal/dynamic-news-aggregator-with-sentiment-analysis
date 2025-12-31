📰 Dynamic News Aggregator with Sentiment Analysis
🔗 Live Deployment

Frontend (Vercel):
👉 https://dynamic-news-aggregator-w-git-567462-thenameisprajwals-projects.vercel.app/

Backend API (Render):
👉 https://dynamic-news-aggregator-with-sentiment-bmkw.onrender.com

Health Check:
👉 https://dynamic-news-aggregator-with-sentiment-bmkw.onrender.com/health

📌 Project Overview

Dynamic News Aggregator with Sentiment Analysis is a full-stack web application that automatically collects news articles from multiple sources, analyzes their sentiment and category, stores them persistently, and presents them through an interactive, filterable user interface.

The system is cloud-deployed, automated, scalable, and designed to mirror how real-world news aggregation platforms operate.

No local setup is required for evaluation.

🚀 Key Features
🔄 Automated News Scraping

Scrapes news from multiple sources using Cheerio

Deduplicates articles using URL-based checks

New articles are appended without deleting historical data

🧠 Sentiment Analysis

Classifies articles as Positive, Neutral, or Negative

Sentiment indicators are displayed clearly in the UI

🏷️ Category Classification

Categories supported:

Politics

Business

Technology

Sports

Health

Other

Category-based filtering supported

🎛️ Advanced Filtering

Filter by sentiment

Filter by category

Filters work consistently across old and newly added articles

⏱️ Scheduled Auto-Updates

GitHub Actions runs the scraper at scheduled intervals

Breaking news appears automatically without redeployment

Existing data remains intact

☁️ Cloud-Deployed Architecture

Frontend hosted on Vercel

Backend API hosted on Render

Database hosted on MongoDB Atlas

🧱 Tech Stack
Frontend

React.js

Vite

Axios

Deployed on Vercel

Backend

Node.js

Express.js

Cheerio (Web Scraping)

MongoDB & Mongoose

Deployed on Render

Database

MongoDB Atlas (Cloud-hosted)

Automation

GitHub Actions (scheduled scraping workflow)

AI & Analysis (Architecture-Ready)

Google Gemini API (AI-ready design)

The system is architected to support AI-powered sentiment analysis and topic classification using Google Gemini.
The current deployment uses an efficient backend analysis layer, with the pipeline designed to seamlessly integrate Gemini-based enrichment if enabled.

🏗️ System Architecture
Scraper Layer

Fetches articles from multiple sources

Normalizes and cleans scraped data

Processing Layer

Assigns sentiment and category

Prevents duplicates using article URLs

Database Layer

Stores articles permanently

Historical articles remain available

API Layer

RESTful endpoints with query-based filtering

Frontend Layer

Fetches data from deployed API

Renders responsive news cards

Provides sentiment & category filters

📡 API Usage
Get All News
GET /api/news

Filter by Sentiment
GET /api/news?sentiment=Positive

Filter by Category
GET /api/news?category=Technology

Combined Filters
GET /api/news?sentiment=Neutral&category=Business

🔄 Data Freshness & Updates

News updates automatically via scheduled scraping

Old articles are never deleted

New articles are appended continuously

Filters apply across the complete dataset

This mirrors real-world news aggregation systems.

🧪 Evaluation Notes

Application is fully deployed and operational

No local environment setup required

All features can be tested using the live URLs

Backend health endpoint confirms service availability

📂 Repository Structure
├── backend
│   ├── src
│   │   ├── config
│   │   ├── models
│   │   ├── routes
│   │   ├── scrapers
│   │   ├── services
│   │   └── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── .github
    └── workflows
        └── scrape.yml

✅ Conclusion

This project demonstrates:

End-to-end full-stack development

Automated data pipelines

Cloud deployment & scalability

Clean architecture with AI-ready design

Real-world engineering practices

