// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const model = genAI.getGenerativeModel({
//     model: 'gemini-1.0-pro',
//     generationConfig: {
//         temperature: 0.2
//     }
// });



// const VALID_CATEGORIES = [
//     'Politics',
//     'Business',
//     'Technology',
//     'Sports',
//     'Health',
//     'Other'
// ];

// /**
//  * Analyze article sentiment + category in ONE call
//  */
// export const analyzeArticle = async (title, description, strict = false) => {
//     const content = `
// You are a strict news analysis engine.

// Analyze the following news article.

// Title:
// ${title}

// Description:
// ${description || title}

// Rules:
// - SentimentLabel MUST be exactly one of: Positive, Neutral, Negative
// - SentimentScore MUST be a number between -1 and 1
// - Category MUST be exactly one of:
//   Politics, Business, Technology, Sports, Health, Other
// - Do NOT default to Neutral or Other unless clearly justified
// - Do NOT include explanations
// - Do NOT include markdown
// - RETURN ONLY VALID JSON

// Required JSON format:
// {
//   "sentimentLabel": "Positive | Neutral | Negative",
//   "sentimentScore": number,
//   "category": "Politics | Business | Technology | Sports | Health | Other"
// }
// `;

//     try {
//         const result = await model.generateContent(content);
//         const raw = result.response.text().trim();

//         const clean = raw
//             .replace(/```json/g, '')
//             .replace(/```/g, '')
//             .trim();

//         const parsed = JSON.parse(clean);

//         if (
//             !['Positive', 'Neutral', 'Negative'].includes(parsed.sentimentLabel) ||
//             typeof parsed.sentimentScore !== 'number' ||
//             !VALID_CATEGORIES.includes(parsed.category)
//         ) {
//             throw new Error('Invalid Gemini response structure');
//         }

//         return {
//             sentimentLabel: parsed.sentimentLabel,
//             sentimentScore: parsed.sentimentScore,
//             category: parsed.category
//         };

//     } catch (error) {
//         console.error('❌ Gemini Analysis Failed:', error.message);
//         return null; // IMPORTANT: do NOT fallback
//     }
// };

// /**
//  * Decide whether dataset needs re-analysis
//  */
// export const shouldReanalyze = (articles) => {
//     if (articles.length < 5) return false;

//     const sentimentCounts = {
//         Positive: 0,
//         Neutral: 0,
//         Negative: 0
//     };

//     const categoryCounts = {
//         Politics: 0,
//         Business: 0,
//         Technology: 0,
//         Sports: 0,
//         Health: 0,
//         Other: 0
//     };

//     articles.forEach(article => {
//         sentimentCounts[article.sentimentLabel]++;
//         categoryCounts[article.category]++;
//     });

//     const neutralPct = (sentimentCounts.Neutral / articles.length) * 100;
//     const otherPct = (categoryCounts.Other / articles.length) * 100;
//     const uniqueCategories = Object.values(categoryCounts).filter(v => v > 0).length;

//     if (neutralPct > 80) {
//         console.warn('⚠️ Too many Neutral articles — reanalysis required');
//         return true;
//     }

//     if (otherPct > 80 || uniqueCategories < 2) {
//         console.warn('⚠️ Poor category diversity — reanalysis required');
//         return true;
//     }

//     return false;
// };


// backend/src/services/geminiService.js

// ---------------- SENTIMENT KEYWORDS ----------------


// Rule-based sentiment & category analyzer
// Stable replacement for Gemini (API-free, deterministic)

const POSITIVE_WORDS = [
    'growth', 'success', 'win', 'positive', 'benefit', 'improve', 'best', 'record',
    'profit', 'innovation', 'breakthrough', 'boost', 'funding', 'acquire', 'launch',
    'expansion', 'increase', 'surge'
];

const NEGATIVE_WORDS = [
    'loss', 'decline', 'fail', 'crisis', 'risk', 'threat', 'layoff', 'ban',
    'hack', 'lawsuit', 'fraud', 'cut', 'drop', 'shutdown', 'scandal'
];

const CATEGORY_KEYWORDS = {
    Politics: [
        'government', 'election', 'policy', 'minister', 'parliament',
        'law', 'regulation', 'war', 'sanction'
    ],
    Business: [
        'company', 'startup', 'market', 'revenue', 'profit',
        'investment', 'vc', 'funding', 'acquisition', 'ipo'
    ],
    Technology: [
        'ai', 'artificial intelligence', 'software', 'tech',
        'app', 'internet', 'cloud', 'device', 'chip', 'platform'
    ],
    Sports: [
        'match', 'tournament', 'player', 'league',
        'score', 'goal', 'win', 'loss', 'coach'
    ],
    Health: [
        'health', 'medical', 'disease', 'hospital',
        'covid', 'vaccine', 'drug', 'treatment'
    ]
};

/**
 * Analyze article sentiment and category
 */
export const analyzeArticle = async (title, description) => {
    const text = `${title} ${description}`.toLowerCase();

    let score = 0;

    POSITIVE_WORDS.forEach(word => {
        if (text.includes(word)) score++;
    });

    NEGATIVE_WORDS.forEach(word => {
        if (text.includes(word)) score--;
    });

    let sentimentLabel = 'Neutral';
    if (score >= 1) sentimentLabel = 'Positive';
    if (score <= -1) sentimentLabel = 'Negative';

    let category = 'Other';
    for (const [key, words] of Object.entries(CATEGORY_KEYWORDS)) {
        if (words.some(word => text.includes(word))) {
            category = key;
            break;
        }
    }

    return {
        sentimentLabel,
        sentimentScore: Math.max(-1, Math.min(1, score / 2)),
        category
    };
};

/**
 * No re-analysis needed for rule-based system
 */
export const shouldReanalyze = () => false;
