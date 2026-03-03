const { nanoId, nanoid } = require("nanoid");
const URL = require("../Model/url");

const genarateShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }

        const shortId = nanoid(5);

        await URL.create({
            shortId,
            requireUrl: url,
            visitHistory: []
        });

        return res.status(201).json({ shortId });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const shortUrl = async (req, res) => {
    const shortId = req.params.id;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );

    if (!entry) {
        return res.status(404).json({ message: "Short URL not found" });
    }

    res.redirect(entry.requireUrl);
}

const analyticUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });

        res.json({
            TotalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    genarateShortUrl,
    shortUrl,
    analyticUrl,
}