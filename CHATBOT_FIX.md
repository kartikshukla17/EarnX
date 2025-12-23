# Chatbot API Fix - Google GenAI Setup

## Issue Fixed

**Error:** `Could not load the default credentials`

**Root Cause:** Incorrect API usage for `@google/genai` package v1.6.0

## Changes Made

### 1. Fixed API Initialization
```typescript
// OLD (incorrect)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// NEW (correct)
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});
```

### 2. Fixed Model Usage
```typescript
// OLD (incorrect)
const model = ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: conversationContext,
  generationConfig: {...},
});
const response = await model;
let responseText = response.text;

// NEW (correct)
const model = genAI.models.get('gemini-1.5-flash');
const result = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: conversationContext }] }],
  generationConfig: {...},
});
let responseText = result.response.text();
```

### 3. Added API Key Validation
Added check to ensure `GEMINI_API_KEY` is configured before making API calls.

## Required: Add API Key to .env

You need to add your Gemini API key to your `.env` file:

```bash
# Add this to your .env file
GEMINI_API_KEY=your_gemini_api_key_here
```

### How to Get a Gemini API Key

1. Go to **Google AI Studio**: https://makersuite.google.com/app/apikey
2. Click **"Get API Key"** or **"Create API Key"**
3. Copy the generated API key
4. Add it to your `.env` file as shown above
5. Restart your development server: `npm run dev`

## Testing

After adding the API key:

1. Restart your dev server
2. Test the chatbot by sending a message
3. The chatbot should now respond without authentication errors

## Files Modified

- `app/api/chatbot/route.ts` - Fixed Google GenAI API usage

---

**Status:** ✅ Code fixed, waiting for API key configuration
