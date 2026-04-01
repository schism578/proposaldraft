import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateProposal(input: {
  businessName: string;
  contractorName: string;
  clientName: string;
  clientAddress: string;
  jobDescription: string;
  lineItems: { description: string; quantity: number; unitPrice: number }[];
  paymentTerms: string;
  validDays?: number;
}) {
  const { businessName, contractorName, clientName, clientAddress,
          jobDescription, lineItems, paymentTerms, validDays = 30 } = input;

  const lineItemsText = lineItems
    .map((item, i) =>
      `${i + 1}. ${item.description} — Qty: ${item.quantity} @ $${item.unitPrice}/unit`
    )
    .join("\n");

  const total = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 0
  );

  const systemPrompt = `
You are a professional proposal writer for home service contractors.
Your job is to transform raw job details into a polished, client-ready proposal.
Tone: confident, professional, and warm. Never robotic or salesy.
Format your response as a JSON object only — no markdown, no preamble.
`;

  const userPrompt = `
Generate a professional contractor proposal with the following details:

Business: ${businessName}
Contractor: ${contractorName}
Client: ${clientName}
Client Address: ${clientAddress}
Job Description: ${jobDescription}
Line Items:
${lineItemsText}
Total: $${total.toFixed(2)}
Payment Terms: ${paymentTerms}
Proposal Valid For: ${validDays} days

Return ONLY a JSON object with this exact shape:
{
  "proposalTitle": "string — a short, specific title for this job (e.g. 'Roof Replacement – 2,400 sq ft Asphalt Shingle')",
  "executiveSummary": "string — 2–3 sentences. Acknowledge the client's need, describe the solution confidently, and set a professional tone.",
  "scopeOfWork": ["string", "string", ...],  // 4–7 bullet points describing exactly what will be done
  "whatIsNotIncluded": ["string", ...],       // 2–4 exclusions to set clear expectations
  "timeline": "string — realistic project timeline with phases if applicable",
  "whyUs": "string — 2 sentences max. What makes ${businessName} the right choice. Keep it grounded, not boastful.",
  "callToAction": "string — a warm, low-pressure closing sentence encouraging the client to accept or reach out with questions",
  "lineItems": [
    { "description": "string", "quantity": number, "unitPrice": number, "lineTotal": number }
  ],
  "total": number,
  "paymentTerms": "string",
  "validUntil": "string — date ${validDays} days from today in Month DD, YYYY format"
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  const raw = response.choices[0].message.content ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}