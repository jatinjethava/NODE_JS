const express = require("express");
const router = express.Router();
const { genarateShortUrl, shortUrl, analyticUrl } = require("../Controller/urlController");

router.post("/", genarateShortUrl);
router.get("/:id", shortUrl)
router.get("/analytic/:shortId", analyticUrl)

module.exports = router;