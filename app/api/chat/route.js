
import { GoogleGenerativeAI } from "@google/generative-ai"



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ...





export async function POST(req) {
  let { prompt } = await req.json();
  if (!prompt || prompt === '') {
    return new Response(JSON.stringify({ message: 'Error sending message' }), {
      status: 400,
    })
  }
  prompt = prompt.toLowerCase()

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContentStream(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);



  return new Response(JSON.stringify({ res: text }))


}