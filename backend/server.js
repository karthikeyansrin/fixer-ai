import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const upload = multer();

app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Fixer.ai backend running");
});

// Analyze endpoint
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    const imageBase64 = req.file.buffer.toString("base64");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are Fixer.ai.

Analyze the image and detect any:
- safety hazards
- mechanical issues
- clutter problems

Return output in JSON with:
problem
severity (1-5)
fix_steps
`
                },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: imageBase64
                  }
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    let text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis returned";

    text = text.replace(/```json|```/g,"").trim()

    const problems = JSON.parse(text)

    let message = ""

    problems.forEach((p,i)=>{

    message += `⚠ Problem ${i+1}\n`
    message += `${p.problem}\n\n`

    message += `Severity: ${p.severity}/5\n\n`

    message += `🛠 Fix Steps\n`

    p.fix_steps.forEach(step=>{
    message += `• ${step}\n`
    })

    message += "\n----------------\n\n"

    })

    res.json({analysis:message})

  } catch (error) {
    console.error(error);
    res.status(500).send("Error analyzing image");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});