import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import { scrapeAndProcessNews } from '../services/newsService.js';

dotenv.config();

/**
 * Script to scrape news and populate database
 */
const runScraper = async () => {
    try {
        console.log('🎯 AI News Pulse - News Scraper\n');

        // Connect to database
        await connectDB();

        // Scrape and process news
        await scrapeAndProcessNews();

        console.log('✅ Scraping completed successfully!\n');
        process.exit(0);

    } catch (error) {
        console.error('❌ Scraping failed:', error.message);
        process.exit(1);
    }
};

runScraper();
