import express from 'express';
import { getArticles } from '../services/newsService.js';

const router = express.Router();

/**
 * GET /api/news
 * Query params:
 *   - sentiment: 'Positive' | 'Neutral' | 'Negative' | 'All'
 *   - category: 'Politics' | 'Business' | 'Technology' | 'Sports' | 'Health' | 'Other' | 'All'
 */
router.get('/news', async (req, res) => {
    try {
        const { sentiment, category } = req.query;

        const filters = {};

        if (sentiment) {
            filters.sentiment = sentiment;
        }

        if (category) {
            filters.category = category;
        }

        const articles = await getArticles(filters);

        res.json({
            success: true,
            count: articles.length,
            data: articles
        });

    } catch (error) {
        console.error('API Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching articles',
            error: error.message
        });
    }
});

export default router;
