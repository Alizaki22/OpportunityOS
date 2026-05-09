/**
 * ElevenLabs API Utility
 * Handles text-to-speech generation and audio playback.
 */

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel

/**
 * Converts text to speech using ElevenLabs API
 * @param text The text to convert to speech
 * @param voiceId Optional voice ID (defaults to Rachel)
 * @returns A promise that resolves to an Audio object
 */
export async function generateSpeech(text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<HTMLAudioElement> {
  if (!ELEVENLABS_API_KEY) {
    console.error('[ElevenLabs] API Key is missing!');
    throw new Error('ElevenLabs API Key is missing. Please add VITE_ELEVENLABS_API_KEY to your .env file.');
  }

  console.log(`[ElevenLabs] Generating speech for text: "${text.substring(0, 50)}..." using voice: ${voiceId}`);

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail?.message || response.statusText;
      console.error(`[ElevenLabs] API Error (${response.status}):`, errorMessage);
      throw new Error(`ElevenLabs API error: ${errorMessage}`);
    }

    console.log('[ElevenLabs] API Success, received audio stream');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    
    return audio;
  } catch (error) {
    console.error('[ElevenLabs] Request failed:', error);
    throw error;
  }
}

/**
 * Plays a simple sound effect or audio object
 */
export function playAudio(audio: HTMLAudioElement): Promise<void> {
  return audio.play();
}
