import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generationConfig = {
    temperature: 0.3,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
};

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export async function generateCardDataFromAI(searchTerm: string): Promise<{ card?: any; error?: string }> {
    const prompt = `
You are an expert in Hanja (Korean Chinese characters). Your task is to generate data for a flashcard based on a given search term. The search term can be a single Hanja character, a Korean word/phrase, or an English word/phrase.

**Input Term:** "${searchTerm}"

**Instructions:**
1.  Analyze the input term. Determine the corresponding Hanja character.
2.  If the input term is nonsensical, invalid, or cannot be mapped to a specific Hanja, you MUST return an error.
3.  If a valid Hanja is identified, generate the following fields:
    *   **character**: The Hanja character itself (e.g., "人件費").
    *   **korean**: The Korean pronunciation and meaning (e.g., "인건비").
    *   **english**: A concise English definition of the Hanja (e.g., "Labor Cost").
    *   **examples**: An array containing exactly one pair of example sentences. The pair must be two strings: a Korean sentence using the Hanja character, followed by its English translation.

**Output Format:**
You must return the data in a strict JSON format.

**Success Case Example:**
If the term is "learn", the output should be:
{
  "card": {
    "character": "人件費",
    "korean": "인건비",
    "english": "Labor Cost",
    "examples": [
      "인건비 절감을 위해 효율적인 인력 관리가 필요합니다.",
      "Efficient human resource management is needed to reduce labor costs."
    ]
  }
}

**Error Case Example:**
If the term is "asdfghjkl", the output should be:
{
  "error": "The term 'asdfghjkl' is nonsensical and cannot be mapped to a Hanja character."
}

Now, process the input term and generate the response.
`;

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig,
            safetySettings,
        });
        const responseText = result.response.text();
        const responseObject = JSON.parse(responseText);

        if (responseObject.error) {
            return { error: responseObject.error };
        }
        if (responseObject.card) {
            // Basic validation of the returned card object
            const { character, korean, english, examples } = responseObject.card;
            if (character && korean && english && Array.isArray(examples) && examples.length === 2) {
                return { card: responseObject.card };
            }
        }
        return { error: "AI failed to generate a valid card structure." };

    } catch (error) {
        console.error("AI generation failed:", error);
        return { error: "An error occurred while communicating with the AI model." };
    }
}
