import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: true,
        enum: ['Politics', 'Business', 'Technology', 'Sports', 'Health', 'Other'],
        default: 'Other'
    },
    sentimentLabel: {
        type: String,
        required: true,
        enum: ['Positive', 'Neutral', 'Negative'],
        default: 'Neutral'
    },
    sentimentScore: {
        type: Number,
        required: true,
        min: -1,
        max: 1,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster filtering
articleSchema.index({ sentimentLabel: 1, category: 1 });
articleSchema.index({ publishDate: -1 });

const Article = mongoose.model('Article', articleSchema);

export default Article;
