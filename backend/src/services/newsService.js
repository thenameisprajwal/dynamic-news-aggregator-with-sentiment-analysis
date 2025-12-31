import scrapeBBC from '../scrapers/bbcScraper.js';
import scrapeTechCrunch from '../scrapers/techcrunchScraper.js';
import { analyzeArticle, shouldReanalyze } from './geminiService.js';
import Article from '../models/Article.js';

/**
 * Scrape news from all sources and process with AI
 */
export const scrapeAndProcessNews = async () => {
    try {
        console.log('🚀 Starting news scraping and processing...');

        // Step 1: Scrape from all sources
        const [bbcArticles, techCrunchArticles] = await Promise.all([
            scrapeBBC(),
            scrapeTechCrunch()
        ]);

        let allArticles = [...bbcArticles, ...techCrunchArticles];
        console.log(`📊 Total articles scraped: ${allArticles.length}`);

        // Step 2: Deduplicate by URL
        const uniqueArticles = [];
        const seenUrls = new Set();

        for (const article of allArticles) {
            if (!seenUrls.has(article.url)) {
                seenUrls.add(article.url);
                uniqueArticles.push(article);
            }
        }

        console.log(`🔍 Unique articles after deduplication: ${uniqueArticles.length}`);

        // Step 3: Ensure description is never empty
        uniqueArticles.forEach(article => {
            if (!article.description || article.description.trim() === '') {
                article.description = article.title;
            }
        });

        // Step 4: Process with AI (initial pass)
        console.log('🤖 Analyzing articles with Gemini AI...');
        const processedArticles = [];

        for (let i = 0; i < uniqueArticles.length; i++) {
            const article = uniqueArticles[i];
            console.log(`  Processing ${i + 1}/${uniqueArticles.length}: ${article.title.substring(0, 60)}...`);

            const analysis = await analyzeArticle(article.title, article.description, false);

            if (!analysis) {
                console.warn('⚠️ Skipping article due to AI failure:', article.title);
                continue;
            }

            processedArticles.push({
                ...article,
                category: analysis.category,
                sentimentLabel: analysis.sentimentLabel,
                sentimentScore: analysis.sentimentScore
            });

            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log(`✅ AI-processed articles: ${processedArticles.length}`);

        // Step 5: Reanalyze if dataset lacks diversity
        if (shouldReanalyze(processedArticles)) {
            console.log('🔄 Reanalyzing articles with stricter prompts...');

            for (let i = 0; i < processedArticles.length; i++) {
                const article = processedArticles[i];
                console.log(`  Reprocessing ${i + 1}/${processedArticles.length}: ${article.title.substring(0, 60)}...`);

                const analysis = await analyzeArticle(article.title, article.description, true);

                if (!analysis) {
                    console.warn('⚠️ Strict reanalysis failed, keeping previous result:', article.title);
                    continue;
                }

                processedArticles[i].category = analysis.category;
                processedArticles[i].sentimentLabel = analysis.sentimentLabel;
                processedArticles[i].sentimentScore = analysis.sentimentScore;

                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        // Step 6: Save to database
        console.log('💾 Saving articles to database...');
        let savedCount = 0;

        for (const article of processedArticles) {
            try {
                await Article.updateOne(
                    { url: article.url },
                    { $set: article },
                    { upsert: true }
                );
                savedCount++;
            } catch (error) {
                console.error(`❌ Error saving article: ${error.message}`);
            }
        }

        console.log(`✅ Successfully saved ${savedCount} articles`);

        // Step 7: Show statistics
        await showStatistics();

        return processedArticles;

    } catch (error) {
        console.error('❌ News Processing Error:', error.message);
        throw error;
    }
};

/**
 * Show statistics about the dataset
 */
export const showStatistics = async () => {
    try {
        const total = await Article.countDocuments();

        const sentimentStats = await Article.aggregate([
            { $group: { _id: '$sentimentLabel', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        const categoryStats = await Article.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);

        console.log('\n📊 Dataset Statistics:');
        console.log(`  Total Articles: ${total}`);

        console.log('\n  Sentiment Distribution:');
        sentimentStats.forEach(stat => {
            const pct = ((stat.count / total) * 100).toFixed(1);
            console.log(`    ${stat._id}: ${stat.count} (${pct}%)`);
        });

        console.log('\n  Category Distribution:');
        categoryStats.forEach(stat => {
            const pct = ((stat.count / total) * 100).toFixed(1);
            console.log(`    ${stat._id}: ${stat.count} (${pct}%)`);
        });
        console.log('');

    } catch (error) {
        console.error('Error getting statistics:', error.message);
    }
};

/**
 * Get articles with optional filters
 */
export const getArticles = async (filters = {}) => {
    try {
        const query = {};

        if (filters.sentiment && filters.sentiment !== 'All') {
            query.sentimentLabel = filters.sentiment;
        }

        if (filters.category && filters.category !== 'All') {
            query.category = filters.category;
        }

        return await Article.find(query)
            .sort({ publishDate: -1 })
            .lean();

    } catch (error) {
        console.error('Error fetching articles:', error.message);
        throw error;
    }
};
