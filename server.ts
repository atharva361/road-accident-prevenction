import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Server-side Gemini initialization
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint 1: Comprehensive Accident Case Analysis
app.post('/api/ai/accident-analysis', async (req: Request, res: Response) => {
  try {
    const { scenario, jurisdiction, collisionType, injuries, vehiclesInvolved, driverRole } = req.body;

    if (!scenario || typeof scenario !== 'string') {
      return res.status(400).json({ error: 'Scenario description is required.' });
    }

    const prompt = `You are a Senior Motor Vehicle Legal & Insurance Procedural Advisor.
A person was involved in a road traffic incident and needs clear, authoritative, calming, and step-by-step procedural legal guidance.

User Case Details:
- Country / Jurisdiction: ${jurisdiction || 'General / International Motor Law (specify local statutory equivalents)'}
- Collision Type: ${collisionType || 'Unspecified'}
- Injuries Reported: ${injuries ? 'Yes, injuries or medical distress present' : 'No apparent severe physical injuries'}
- Driver Role: ${driverRole || 'Driver'}
- Vehicles Involved: ${vehiclesInvolved || '2 vehicles'}
- Incident Description: "${scenario}"

Please analyze this situation thoroughly and provide your output in structured JSON format with the following keys:
{
  "urgencyLevel": "CRITICAL" | "HIGH" | "STANDARD",
  "immediateSafetyActions": ["3-5 crisp chronological immediate safety steps at the scene"],
  "legalObligations": {
    "policeReporting": "Explicit legal rule on whether police/FIR/Collision Report is legally mandatory for this scenario and statutory time limit",
    "faultStatementWarning": "Exact guidance on what NEVER to say or admit to avoid prejudicing liability or voiding insurance",
    "informationExchange": "Exact statutory details they must legally exchange with other parties"
  },
  "liabilityAssessment": {
    "primaFaciePresumption": "Standard legal doctrine applicable (e.g. rear-end presumption, boulevard rule, right-of-way statutory breach)",
    "likelyFaultDistribution": "Objective liability factors police/adjusters will assess",
    "defensiveSteps": "How the user can safeguard their legal standing"
  },
  "mandatoryEvidenceList": [
    { "category": "Scene", "items": ["Item 1", "Item 2"] },
    { "category": "Documentation", "items": ["Item 1", "Item 2"] },
    { "category": "Witness & Third-Party", "items": ["Item 1", "Item 2"] }
  ],
  "insuranceProcedureSteps": [
    { "step": 1, "title": "...", "description": "...", "timeline": "..." }
  ],
  "criticalPitfallsToAvoid": ["4-5 major traps e.g. signing quick releases, delayed medical check, failing to document minor symptoms, verbal settlements"],
  "officialAssistanceGuidance": "Which authorities (Police station jurisdiction, Legal Aid, Insurance Ombudsman, Motor Accident Claims Tribunal / Small Claims) to contact and how.",
  "executiveSummary": "A concise 2-sentence empowering summary for someone shaken up right now."
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating accident analysis:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze accident scenario.',
      fallbackAvailable: true,
    });
  }
});

// Endpoint 2: Vehicle Damage & Scene Photo Multimodal Analysis
app.post('/api/ai/analyze-damage-photo', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType, description } = req.body;

    if (!imageBase64 || !mimeType) {
      return res.status(400).json({ error: 'Image base64 data and mimeType are required.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };

    const textPart = {
      text: `You are an expert Motor Vehicle Insurance Surveyor & Forensic Accident Scene Analyst.
Analyze this accident photo carefully. Additional user note: "${description || 'None provided'}".

Provide a structured JSON output with:
{
  "damageZone": "Specific location on vehicle (e.g., Rear Left Quarter Panel, Front Bumper & Radiator, T-bone driver door)",
  "severityRating": "Minor Cosmetic" | "Moderate Functional" | "Severe Structural" | "Critical / Total Loss Risk",
  "visibleDamageItems": ["List 3-6 specific visible damage points e.g. crumple zone compression, headlamp fixture fracture, wheel alignment offset, paint transfer"],
  "drivabilityStatus": {
    "isDrivable": boolean,
    "reasoning": "Clear explanation whether driving this vehicle risks mechanical seizure, suspension failure, or legal violation",
    "recommendation": "Drive to nearest authorized workshop OR Call flatbed tow truck immediately"
  },
  "insuranceClaimEvidenceTips": [
    "List 3-4 specific photo angles or evidentiary elements needed to satisfy the surveyor for this specific type of damage"
  ],
  "potentialHiddenDamages": [
    "List internal parts likely affected behind this visible exterior damage (e.g. sensor wiring harness, radiator support, steering rack, exhaust manifold)"
  ],
  "surveyorQuestionPreparation": "What question the insurance adjuster will ask about this specific point of impact and how to answer factually."
}
Return only valid JSON.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error analyzing damage photo:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to analyze vehicle damage photo.',
    });
  }
});

// Endpoint 3: Automated Legal & Insurance Notice Generator
app.post('/api/ai/draft-notices', async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      contactPhone,
      incidentDate,
      incidentTime,
      incidentLocation,
      vehicleRegistration,
      insurancePolicyNumber,
      insurerName,
      otherVehicleDetails,
      otherDriverDetails,
      factualDescription,
      jurisdiction,
    } = req.body;

    const prompt = `You are a Legal Drafting Specialist for Motor Vehicle Accidents.
Generate two formal, legally robust, fact-focused written communications for this incident:
1. Formal Insurance Claim Intimation Notice (to prompt surveyor deputation and safeguard claim statutory deadline).
2. Formal Police Traffic Incident Intimation / Self-Report (without admitting premature liability, focusing on objective facts).

Incident Data:
- Claimant Name: ${fullName || '[Claimant Name]'}
- Contact: ${contactPhone || '[Phone Number]'}
- Date & Time: ${incidentDate || '[Date]'} at ${incidentTime || '[Time]'}
- Exact Location: ${incidentLocation || '[Exact Location / Landmark / City]'}
- Vehicle Reg Number: ${vehicleRegistration || '[Vehicle Reg No]'}
- Insurance Policy & Insurer: ${insurancePolicyNumber || '[Policy No]'} with ${insurerName || '[Insurance Provider]'}
- Other Vehicle / Driver Involved: ${otherVehicleDetails || '[Other Vehicle Number / Make]'} / ${otherDriverDetails || '[Other Driver Name/Contact]'}
- Factual Statement: "${factualDescription || 'Vehicles collided during transit. Full evidence gathered at scene.'}"
- Jurisdiction: ${jurisdiction || 'General'}

Provide output in JSON format:
{
  "insuranceNotice": {
    "subject": "Formal Claim Intimation Subject line",
    "body": "Complete letter text with professional formatting, policy references, spot survey request, cashless garage notice, and preservation of rights",
    "nextActions": ["Action 1", "Action 2"]
  },
  "policeIntimation": {
    "subject": "Traffic Collision Intimation Subject",
    "body": "Complete formal statement to the Station House Officer / Traffic Police Division describing the incident chronologically, listing other vehicle info, requesting incident acknowledgment (GD Entry / FIR copy)",
    "statutoryReminders": ["Rule 1", "Rule 2"]
  }
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error drafting notices:', error);
    return res.status(500).json({ error: error?.message || 'Failed to draft notices.' });
  }
});

// Endpoint 4: Interactive Legal & Procedural Q&A Copilot
app.post('/api/ai/copilot-chat', async (req: Request, res: Response) => {
  try {
    const { question, conversationHistory, context } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const systemInstruction = `You are "AcciGuide AI Copilot", a specialized, compassionate, and precise motor legal procedure advisor.
You provide clear guidance on:
- Immediate actions at road collision scenes
- Evidence preservation rules (photographs, skid marks, dashcam footage, witness affidavits)
- Police reporting laws (FIR, Daily Diary / GD entry, Police Accident Report, hit-and-run mandates)
- Motor insurance claims (cashless settlement vs reimbursement, spot survey, deductibles, third-party liability vs own damage, total loss threshold, no-claim bonus)
- Dispute resolution (uninsured motorist, disputing liability, legal aid, Motor Accident Claims Tribunal / Small Claims Court)

Tone: Calm, supportive, legally precise, non-jargon, highly actionable.
Important: Always maintain standard ethical legal boundaries: remind users that while this guidance is based on statutory motor law and insurance regulations, complex injuries or high-stake disputed liability warrants formal consultation with a licensed legal practitioner or their official insurer.`;

    const contents = [];
    if (context) {
      contents.push({
        role: 'user',
        parts: [{ text: `Current Case Context: ${JSON.stringify(context)}` }],
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'I understand your accident context. What specific procedural or legal question do you need help with?' }],
      });
    }

    if (Array.isArray(conversationHistory)) {
      for (const msg of conversationHistory) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: question }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3,
      },
    });

    const answer = response.text || 'Unable to generate response. Please try again.';
    return res.json({ success: true, answer: answer });
  } catch (error: any) {
    console.error('Error in copilot chat:', error);
    return res.status(500).json({ error: error?.message || 'Chat service encountered an issue.' });
  }
});

// Serve frontend with Vite in dev, static files in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: port,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AcciGuide AI Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
