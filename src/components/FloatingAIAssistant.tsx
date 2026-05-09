import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Mic, MicOff, Volume2, VolumeX, Sparkles, Send,
  GraduationCap, Target, Code2, Trophy, ChevronDown,
} from 'lucide-react';
import { generateAiResponse } from '@/lib/ai';
import { generateSpeech } from '@/lib/elevenlabs';

const modes = [
  { id: 'mentor', label: 'Career Mentor', icon: Target, color: 'text-primary', prompt: "I'm your career mentor. Tell me your goals and I'll guide you." },
  { id: 'scholar', label: 'Scholarship Advisor', icon: GraduationCap, color: 'text-accent', prompt: "I specialize in scholarship applications. Ask me anything!" },
  { id: 'interview', label: 'Interview Prep', icon: Trophy, color: 'text-warning', prompt: "Let's practice interviews. Which company or role would you like to prep for?" },
  { id: 'hackathon', label: 'Hackathon Coach', icon: Code2, color: 'text-success', prompt: "Ready to build something amazing? Tell me about your hackathon idea." },
];

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showModes, setShowModes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', text: activeMode.prompt }]);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || isThinking) return;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text }]);
    setIsThinking(true);

    try {
      const history = messages.map(m => ({
        id: Math.random().toString(),
        role: m.role,
        content: m.text,
        timestamp: new Date().toISOString(),
      }));
      const response = await generateAiResponse(text, history);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);

      if (voiceEnabled) {
        setIsSpeaking(true);
        try {
          const audio = await generateSpeech(response.slice(0, 300));
          audio.onended = () => setIsSpeaking(false);
          await audio.play().catch(() => setIsSpeaking(false));
        } catch {
          setIsSpeaking(false);
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm having a moment. Please try again!" }]);
    } finally {
      setIsThinking(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const handleModeChange = (mode: typeof modes[0]) => {
    setActiveMode(mode);
    setShowModes(false);
    setMessages([{ role: 'assistant', text: mode.prompt }]);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl touch-active lg:bottom-8 lg:right-8"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: 'var(--gradient-primary)' }} />
            <Sparkles className="w-6 h-6 text-white relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[60] h-[85dvh] glass-strong border-t border-border rounded-t-3xl flex flex-col overflow-hidden
                         lg:bottom-6 lg:right-6 lg:left-auto lg:w-[420px] lg:h-[600px] lg:rounded-2xl lg:border"
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {isSpeaking && (
                    <div className="absolute inset-0 rounded-xl pulse-ring" />
                  )}
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <button
                    onClick={() => setShowModes(!showModes)}
                    className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors touch-active"
                  >
                    {activeMode.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showModes ? 'rotate-180' : ''}`} />
                  </button>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-warning animate-pulse' : 'bg-success'}`} />
                    {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Ready'}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`p-2 rounded-lg transition-colors touch-active ${voiceEnabled ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary'}`}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors touch-active"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Mode Selector Dropdown */}
              <AnimatePresence>
                {showModes && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-border overflow-hidden"
                  >
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {modes.map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => handleModeChange(mode)}
                          className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium transition-all touch-active ${
                            activeMode.id === mode.id
                              ? 'bg-primary/10 border border-primary/30 text-primary'
                              : 'bg-secondary/50 border border-transparent text-muted-foreground hover:border-border'
                          }`}
                        >
                          <mode.icon className={`w-4 h-4 ${mode.color}`} />
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-secondary/60 border border-border text-foreground rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-sm bg-secondary/60 border border-border flex items-center gap-2">
                      {/* Typing dots */}
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          style={{ animation: `waveform 1.2s ease-in-out ${i * 0.2}s infinite` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Voice waveform indicator */}
                {isSpeaking && (
                  <div className="flex items-center justify-center gap-1 py-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-full bg-primary"
                        style={{
                          height: `${Math.random() * 20 + 8}px`,
                          animation: `waveform 0.8s ease-in-out ${i * 0.1}s infinite`,
                        }}
                      />
                    ))}
                    <span className="ml-2 text-xs text-primary font-medium">Speaking</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border safe-area-bottom">
                <div className="flex items-center gap-2 bg-secondary/50 border border-border rounded-2xl p-2 focus-within:border-primary/50 transition-colors">
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend(message)}
                    placeholder="Ask your AI mentor..."
                    className="flex-1 bg-transparent px-2 py-1 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`p-2 rounded-xl transition-all touch-active ${
                      isListening
                        ? 'bg-destructive text-destructive-foreground pulse-ring'
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleSend(message)}
                    disabled={!message.trim() || isThinking}
                    className="p-2 rounded-xl text-primary-foreground disabled:opacity-50 transition-opacity touch-active"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
