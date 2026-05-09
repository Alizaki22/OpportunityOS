import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Send, Mic, MicOff, Volume2, VolumeX, Loader2,
  FileText, Target, GraduationCap, Code2, Trophy,
  ChevronDown, RotateCcw,
} from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateSpeech } from '@/lib/elevenlabs';
import { generateAiResponse } from '@/lib/ai';
import type { ChatMessage } from '@/lib/types';

const modes = [
  { id: 'career', icon: Target, label: 'Career Mentor', color: 'from-violet-500 to-purple-600', desc: 'Get personalized career roadmaps and goal guidance' },
  { id: 'scholar', icon: GraduationCap, label: 'Scholarship Advisor', color: 'from-blue-500 to-cyan-500', desc: 'Expert scholarship search and application support' },
  { id: 'interview', icon: Trophy, label: 'Interview Prep', color: 'from-amber-500 to-orange-500', desc: 'Practice interviews for top companies and roles' },
  { id: 'hackathon', icon: Code2, label: 'Hackathon Coach', color: 'from-green-500 to-emerald-500', desc: 'Build winning projects and pitches for hackathons' },
];

const suggestions = [
  { icon: FileText, label: 'Polish my resume', prompt: 'Help me improve my resume for AI/ML engineering roles at top tech companies' },
  { icon: GraduationCap, label: 'Write my SOP', prompt: 'Write a Statement of Purpose for a Computer Science Masters at Stanford' },
  { icon: Target, label: '6-month roadmap', prompt: 'Generate a 6-month career roadmap for becoming a Solana developer' },
  { icon: Sparkles, label: 'Find scholarships', prompt: 'Suggest the best scholarships for international CS students in 2025' },
];

function WaveformBars({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-full transition-all duration-300 ${active ? 'bg-primary' : 'bg-muted-foreground/40'}`}
          style={{
            height: active ? `${Math.random() * 16 + 4}px` : '4px',
            animation: active ? `waveform ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite` : 'none',
          }}
        />
      ))}
    </div>
  );
}

export default function AiAssistant() {
  const { chatMessages, addChatMessage } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [showModes, setShowModes] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;

    addChatMessage({
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    });

    setInput('');
    setIsTyping(true);

    generateAiResponse(text, chatMessages)
      .then(async (aiResponse) => {
        addChatMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
        });
        setIsTyping(false);

        if (voiceEnabled) {
          setIsGeneratingVoice(true);
          setIsSpeaking(false);
          try {
            const audio = await generateSpeech(aiResponse.slice(0, 400));
            setIsSpeaking(true);
            audio.onended = () => { setIsSpeaking(false); setIsGeneratingVoice(false); };
            await audio.play().catch(() => { setIsSpeaking(false); setIsGeneratingVoice(false); });
          } catch {
            setIsGeneratingVoice(false);
          }
        }
      })
      .catch((error) => {
        addChatMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `I'm having a moment: ${error.message || 'Unknown error'}. Please try again! 🙏`,
          timestamp: new Date().toISOString(),
        });
        setIsTyping(false);
      });
  }, [chatMessages, voiceEnabled, addChatMessage]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: SpeechRecognitionEvent) => handleSend(e.results[0][0].transcript);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); };

  const isEmpty = chatMessages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100dvh-56px-env(safe-area-inset-bottom))] max-w-4xl mx-auto page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass-strong shrink-0">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center relative shrink-0"
          style={{ background: `linear-gradient(135deg, ${activeMode.color.replace('from-', '').split(' ')[0]}, ${activeMode.color.split('to-')[1]})` }}
        >
          {(isSpeaking || isListening) && (
            <div className="absolute inset-0 rounded-xl pulse-ring" style={{ background: 'var(--gradient-primary)' }} />
          )}
          <activeMode.icon className="w-5 h-5 text-white relative z-10" />
        </div>

        <div className="flex-1 min-w-0">
          <button
            onClick={() => setShowModes(!showModes)}
            className="flex items-center gap-1 font-semibold text-sm text-foreground hover:text-primary transition-colors touch-active"
          >
            {activeMode.label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showModes ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-1.5">
            <WaveformBars active={isSpeaking || isListening} />
            <span className="text-[11px] text-muted-foreground">
              {isListening ? 'Listening...' : isTyping ? 'Thinking...' : isSpeaking ? 'Speaking...' : isGeneratingVoice ? 'Generating voice...' : 'Ready to help'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {chatMessages.length > 0 && (
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg hover:bg-secondary transition-colors touch-active text-muted-foreground"
              title="New conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border touch-active ${
              voiceEnabled
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'bg-secondary text-muted-foreground border-border'
            }`}
          >
            {isGeneratingVoice ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : voiceEnabled ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            {isGeneratingVoice ? 'Gen...' : voiceEnabled ? 'Voice' : 'Muted'}
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <AnimatePresence>
        {showModes && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border overflow-hidden bg-background shrink-0"
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              {modes.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => { setActiveMode(mode); setShowModes(false); }}
                  className={`flex items-start gap-2.5 p-3 rounded-xl text-left transition-all touch-active ${
                    activeMode.id === mode.id
                      ? 'bg-primary/10 border border-primary/30'
                      : 'bg-secondary/50 border border-transparent hover:border-border'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center shrink-0`}>
                    <mode.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground leading-tight">{mode.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">{mode.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full px-5 py-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 float"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-2xl font-bold text-foreground mb-2"
            >
              How can I help your career?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground max-w-sm mb-8"
            >
              I'm your AI-native career copilot — powered by Gemini. Ask me anything or tap a suggestion to begin.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3 w-full max-w-md"
            >
              {suggestions.map((s, i) => (
                <motion.button
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  onClick={() => handleSend(s.prompt)}
                  className="flex flex-col items-start p-3.5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:bg-secondary/30 transition-all text-left touch-active"
                >
                  <div className="flex items-center gap-2 text-primary mb-1.5">
                    <s.icon className="w-4 h-4" />
                    <span className="text-xs font-semibold">{s.label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{s.prompt}</p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        ) : (
          /* Messages */
          <div className="p-4 space-y-4">
            <AnimatePresence>
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 max-w-[88%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-accent/20 text-accent'
                      : ''
                  }`}
                    style={msg.role === 'assistant' ? { background: 'var(--gradient-primary)' } : {}}
                  >
                    {msg.role === 'user'
                      ? <span className="text-xs font-bold">U</span>
                      : <Sparkles className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent text-accent-foreground rounded-tr-sm'
                      : 'bg-secondary/60 border border-border text-foreground rounded-tl-sm whitespace-pre-line'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2.5 max-w-[88%]"
                >
                  <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-sm bg-secondary/60 border border-border flex items-center gap-1.5">
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                        style={{ animation: `waveform 1.0s ease-in-out ${i * 0.18}s infinite` }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Speaking waveform */}
            <AnimatePresence>
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-1.5 py-2"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full"
                      style={{
                        background: 'var(--gradient-primary)',
                        height: `${12 + Math.sin(i * 0.8) * 8}px`,
                        animation: `waveform ${0.7 + i * 0.05}s ease-in-out ${i * 0.06}s infinite`,
                      }}
                    />
                  ))}
                  <span className="ml-2 text-xs text-primary font-medium">Playing</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 px-4 py-3 border-t border-border glass-strong safe-area-bottom">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2 bg-secondary/40 border border-border rounded-2xl p-2 pr-1.5 focus-within:border-primary/50 transition-colors"
        >
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-2.5 rounded-xl transition-all touch-active ${
              isListening
                ? 'bg-destructive text-destructive-foreground pulse-ring'
                : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'Listening...' : 'Message your AI mentor...'}
            className="flex-1 bg-transparent py-1.5 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-opacity touch-active"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
          Powered by Gemini · ElevenLabs voice · Solana-native
        </p>
      </div>
    </div>
  );
}
