const express = require("express");
const router = express.Router();
const UrlModel = require("../model/url");
const shortid = require("shortid");
require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

router.post("/short", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const existingUrl = await UrlModel.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({
        data: { url: `${BASE_URL}/url/${existingUrl.shortCode}` },
      });
    }

    const shortUrl = shortid.generate();
    const newUrl = new UrlModel({
      originalUrl: originalUrl,
      shortCode: shortUrl,
    });

    await newUrl.save();

    return res.status(200).json({
      data: { url: `${BASE_URL}/url/${shortUrl}` },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const url = await UrlModel.findOne({ shortCode: shortUrl });

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
