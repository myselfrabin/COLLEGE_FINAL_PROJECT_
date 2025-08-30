import { textOnly } from "../utils/textOnly.js";
import { textAndImage } from "../utils/textAndImage.js";

const SYSTEM_PROMPT = `You are a real-time conversational assistant for a tourist guide website focused on Nepal. When a user sends a message, respond instantly and contextually using the latest tourist spot data, cultural insights, and travel tips. Maintain a friendly and informative tone. If the user asks about places, suggest relevant destinations based on their interests (e.g., nature, history, adventure). If they ask follow-up questions, continue the conversation naturally. Always keep responses concise, engaging, and suitable for a live chat experience. Keep your answers concise and under 5 sentences unless the user asks for more detail.`;

export const aiController = async (req, res) => {
  // If the request is from the frontend chatbot, it will have { message: string }
  if (req.body.message) {
    const prompt = `${SYSTEM_PROMPT}\nUser: ${req.body.message}`;
    const botReply = await textOnly(prompt);
    if (botReply?.Error) {
      return res.status(500).json({ response: botReply.Error });
    }
    return res.status(200).json({ response: botReply.result });
  }

  // Backward compatibility for modelType (API, Postman, etc.)
  const modelType = req.body.modelType;
  if (modelType === "text_only") {
    const botReply = await textOnly(req.body.prompt);
    if (botReply?.Error) {
      return res.status(404).json({ Error: botReply.Error });
    }
    res.status(200).json({ result: botReply.result });
  } else if (modelType === "text_and_image") {
    const botReply = await textAndImage(req.body.prompt, req.body.imageParts);
    if (botReply?.Error) {
      return res.status(404).json({ Error: botReply.Error });
    }
    res.status(200).json({ result: botReply.result });
  } else {
    res.status(404).json({ result: "Invalid Model Selected" });
  }
};
