import axios from 'axios';

const API_BASE_URL = 'https://dynamic-news-aggregator-with-sentiment-bmkw.onrender.com';


/**
 * Fetch news articles with optional filters
 * @param {string} sentiment - 'All' | 'Positive' | 'Neutral' | 'Negative'
 * @param {string} category - 'All' | 'Politics' | 'Business' | 'Technology' | 'Sports' | 'Health' | 'Other'
 */
export const fetchNews = async (sentiment = 'All', category = 'All') => {
    try {
        const params = {};

        if (sentiment && sentiment !== 'All') {
            params.sentiment = sentiment;
        }

        if (category && category !== 'All') {
            params.category = category;
        }

        const response = await axios.get(`${API_BASE_URL}/news`, { params });

        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
