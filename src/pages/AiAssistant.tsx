import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, FileText, Target, GraduationCap, Loader2, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '@/lib/context';
import { generateSpeech } from '@/lib/elevenlabs';
import { generateAiResponse } from '@/lib/ai';
import type { ChatMessage } from '@/lib/types';

const suggestions = [
  { icon: FileText, label: 'Improve my resume', prompt: 'Help me improve my resume for tech internships' },
  { icon: GraduationCap, label: 'Write an SOP', prompt: 'Write a Statement of Purpose for a CS masters program at MIT' },
  { icon: Target, label: 'Career roadmap', prompt: 'Generate a 6-month career roadmap for becoming an AI Engineer' },
  { icon: Sparkles, label: 'Find opportunities', prompt: 'Suggest scholarships for international CS students in the USA' },
];


export default function AiAssistant() {
  const { chatMessages, addChatMessage } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    addChatMessage({
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    });
    
    setInput('');
    setIsTyping(true);

    // Real AI response
    generateAiResponse(text, chatMessages)
      .then(async (aiResponse) => {
        addChatMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString()
        });
        setIsTyping(false);

        // Real voice playback
        if (voiceEnabled) {
          console.log('[AiAssistant] AI response ready, starting voice generation...');
          setIsGeneratingVoice(true);
          generateSpeech(aiResponse)
            .then(audio => {
              console.log('[AiAssistant] Audio generated, playing now');
              audio.play().catch(pErr => {
                console.warn('[AiAssistant] Playback blocked by browser:', pErr);
              });
            })
            .catch(err => {
              console.error('[AiAssistant] Voice generation failed:', err);
            })
            .finally(() => {
              setIsGeneratingVoice(false);
            });
        }
      })
      .catch(err => {
        console.error('[AiAssistant] AI Request failed:', err);
        addChatMessage({
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again in a moment.",
          timestamp: new Date().toISOString()
        });
        setIsTyping(false);
      });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] sm:h-[calc(100vh-theme(spacing.8))] max-w-4xl mx-auto border border-border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border bg-card/50">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary bg-primary/10">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground">AI Career Copilot</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            Online and ready to help
          </p>
        </div>
        <div className="ml-auto">
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
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
            {isGeneratingVoice ? 'Generating...' : `Voice ${voiceEnabled ? 'On' : 'Off'}`}
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary bg-primary/10 mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">How can I help your career today?</h3>
            <p className="text-sm text-muted-foreground max-w-md mb-8">
              I can analyze your profile to suggest opportunities, review your resume, or help draft application essays.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSend(s.prompt)}
                  className="flex flex-col items-start p-4 rounded-xl border border-border bg-background hover:border-primary/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <s.icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{s.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.prompt}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'
                }`}>
                  {msg.role === 'user' ? <UserIcon /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-accent text-accent-foreground rounded-tr-sm' 
                    : 'bg-secondary/50 border border-border text-foreground rounded-tl-sm whitespace-pre-line'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center gap-2 rounded-tl-sm">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2 bg-background border border-border rounded-xl p-1 pr-2 focus-within:border-primary/50 transition-colors"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message the copilot..."
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-50 transition-opacity"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
