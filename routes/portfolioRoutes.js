const express = require("express");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");
const Portfolio = require("../models/Portfolio");

const router = express.Router();

// @route   POST /api/portfolios
// @desc    Create a new portfolio (empty by default)
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { title, sections } = req.body;
    const portfolio = new Portfolio({
      user: req.user.id,
      title: title || "Untitled Portfolio",
      sections: sections || [],
    });

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/portfolios/my
// @desc    Get all portfolios for logged-in user
// @access  Private
router.get("/my", auth, async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user.id });
    res.json(portfolios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET /api/portfolios/:id
// @desc    Get single portfolio by ID
// @access  Public (for sharing)
router.get("/:id", async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate(
      "user",
      "name role"
    );
    if (!portfolio) return res.status(404).json({ msg: "Portfolio not found" });

    // If not published, don't allow others to view
    if (!portfolio.published) {
      return res.status(403).json({ msg: "This portfolio is private" });
    }

    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT /api/portfolios/:id
// @desc    Update portfolio (title, sections, etc.)
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) return res.status(404).json({ msg: "Portfolio not found" });

    if (portfolio.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const { title, sections, published } = req.body;

    if (title) portfolio.title = title;
    if (sections) portfolio.sections = sections;
    if (published !== undefined) {
      portfolio.published = published;
      if (published && !portfolio.shareableLink) {
        portfolio.shareableLink = uuidv4(); // generate unique link
      }
    }

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
