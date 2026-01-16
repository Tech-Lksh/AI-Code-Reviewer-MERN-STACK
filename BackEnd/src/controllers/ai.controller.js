const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await aiService(code);

    res.status(200).json({
      success: true,
      review: response
    });
  } catch (error) {
    console.error("Controller Error:", error.message);

    if (error.status === 429) {
      return res.status(429).json({
        error: "AI quota exceeded. Please wait and try again."
      });
    }

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};
