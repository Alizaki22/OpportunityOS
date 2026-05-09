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
  const isDev = import.meta.env.DEV;
  const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;

  if (isDev && !ELEVENLABS_API_KEY) {
    console.error('[ElevenLabs] API Key is missing locally!');
    throw new Error('ElevenLabs API Key is missing. Please add VITE_ELEVENLABS_API_KEY to your .env file.');
  }

  console.log(`[ElevenLabs] Generating speech for text: "${text.substring(0, 50)}..." using voice: ${voiceId}`);

  try {
    let url = isDev ? `/api/elevenlabs/text-to-speech/${voiceId}` : '/api/tts';
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (isDev) {
      headers['xi-api-key'] = ELEVENLABS_API_KEY as string;
    }

    const bodyPayload = isDev ? {
      text: text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    } : { text, voiceId };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(bodyPayload),
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.detail?.message || errorData.message || response.statusText;
      } catch (e) {
        // failed to parse json
      }
      console.error(`[ElevenLabs] API Error (${response.status}):`, errorMessage);
      throw new Error(`ElevenLabs API error: ${errorMessage}`);
    }

    console.log('[ElevenLabs] API Success, received audio stream');
    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    
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
