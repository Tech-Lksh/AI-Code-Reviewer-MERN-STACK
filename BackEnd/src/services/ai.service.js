const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
You are a senior code reviewer with 7+ years of experience.
Focus on code quality, best practices, performance, security,
scalability, and maintainability. Provide constructive feedback
with clear examples and improvements.
`
});

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    // 🔥 IMPORTANT: Do NOT crash server
    console.error("Gemini API Error:", error.message);

    if (error.status === 429) {
      throw {
        status: 429,
        message: "AI quota exceeded. Please try again later."
      };
    }

    throw {
      status: 500,
      message: "AI service failed"
    };
  }
}

module.exports = generateContent;
