# Voice AI Stack Evaluation for "Digital Replica"

**Goal:** Real-time conversational agent with Rakesh Roushan's cloned voice.

## 1. ElevenLabs (Conversational AI) - **RECOMMENDED**

- **Voice Cloning:** Best in class. You can "Instant Clone" your voice from a few minutes of audio.
- **Realtime Capability:** High. They have a dedicated WebSocket API and React SDK (`@11labs/react`) handling VAD (Voice Activity Detection) and interruption handling.
- **Knowledge Base:** You can upload your "Manifesto" and "Essays" directly to their agent dashboard.
- **Vibe:** Professional, crisp, high fidelity.

## 2. Hume AI (EVI - Empathic Voice Interface)

- **Voice Cloning:** Currently limited for custom voices (mostly enterprise/beta). Their stock voices are incredible (they laugh, pause, sigh), but getting _your_ specific voice is harder than ElevenLabs.
- **Vibe:** Highly emotional, maybe too "chatty" for a "Systems Architect" brand.

## 3. OpenAI Realtime API (GPT-4o)

- **Voice Cloning:** **Not available** for safety reasons. You must use their preset voices (Alloy, Echo, etc.).
- **Vibe:** Generic ChatGPT feel.

---

## Implementation Plan (ElevenLabs)

1.  **Account Setup**: Go to [ElevenLabs.io](https://elevenlabs.io).
2.  **Voice Clone**: Record 5 mins of you talking about your work. Use "Instant Voice Cloning".
3.  **Create Agent**: Go to "Conversational AI" tab.
    - **Prompt**: "You are the digital replica of Rakesh Roushan..." (Copy from `os/brand/voice.md`)
    - **Knowledge**: Upload `os/brand/positioning.md` and `os/brand/story.md`.
    - **Voice**: Select your clone.
4.  **Get ID**: Copy the `agent_id`.

I will build the **Frontend Interface** (Visualizer + Connection Logic) assuming we will plug in the ElevenLabs SDK later.
