import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceConversationProps {
  agentId: string;
  voices: { id: string; name: string }[];
  onClose: () => void;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const VoiceConversation: React.FC<VoiceConversationProps> = ({ agentId, voices, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(voices[0]?.id || '');
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [transcripts, setTranscripts] = useState<{ role: 'user' | 'agent'; text: string }[]>([]);
  const [volume, setVolume] = useState(0.8);
  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('ElevenLabs connected');
    },
    onDisconnect: () => {
      console.log('ElevenLabs disconnected');
    },
    onMessage: (message: any) => {
      if (message.type === 'user_transcript') {
        setTranscripts(prev => [...prev, { role: 'user', text: message.user_transcription_event?.user_transcript || '' }]);
      } else if (message.type === 'agent_response') {
        setTranscripts(prev => [...prev, { role: 'agent', text: message.agent_response_event?.agent_response || '' }]);
      } else if (message.type === 'agent_response_correction') {
        setTranscripts(prev => {
          const updated = [...prev];
        let lastAgent = -1;
          for (let j = updated.length - 1; j >= 0; j--) {
            if (updated[j].role === 'agent') { lastAgent = j; break; }
          }
          if (lastAgent !== -1) {
            updated[lastAgent] = { role: 'agent', text: message.agent_response_correction_event?.corrected_agent_response || '' };
          }
          return updated;
        });
      }
    },
    onError: (error: any) => {
      console.error('ElevenLabs error:', error);
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [transcripts]);

  const startConversation = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/elevenlabs-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ agentId }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const data = await resp.json();
      if (!data.signed_url) throw new Error('No signed URL received');

      const overrides: any = {};
      if (selectedVoice) {
        overrides.tts = { voiceId: selectedVoice };
      }

      await conversation.startSession({
        signedUrl: data.signed_url,
        overrides: Object.keys(overrides).length > 0 ? overrides : undefined,
      });

      await conversation.setVolume({ volume });
    } catch (error: any) {
      console.error('Failed to start voice conversation:', error);
      alert(error.message || 'فشل في بدء المحادثة الصوتية');
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, agentId, selectedVoice, volume]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
    setTranscripts([]);
  }, [conversation]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    conversation.setVolume({ volume: newMuted ? 0 : volume });
  }, [isMuted, conversation, volume]);

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  return (
    <div className="flex flex-col h-full" dir="rtl">
      {/* Voice Picker */}
      {!isConnected && (
        <div className="p-3 border-b border-border">
          <div className="relative">
            <button
              onClick={() => setShowVoicePicker(!showVoicePicker)}
              className="w-full flex items-center justify-between px-3 py-2 bg-muted rounded-lg text-xs"
            >
              <span>{voices.find(v => v.id === selectedVoice)?.name || 'اختر الصوت'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showVoicePicker ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showVoicePicker && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-10 overflow-hidden"
                >
                  {voices.map(voice => (
                    <button
                      key={voice.id}
                      onClick={() => { setSelectedVoice(voice.id); setShowVoicePicker(false); }}
                      className={`w-full text-right px-3 py-2 text-xs hover:bg-muted transition-colors ${selectedVoice === voice.id ? 'bg-construction-accent/10 text-construction-primary font-bold' : ''}`}
                    >
                      {voice.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Conversation Transcripts */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        {transcripts.length === 0 && !isConnected && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-construction-accent/10 flex items-center justify-center mx-auto mb-3">
              <Mic className="w-8 h-8 text-construction-accent" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">محادثة صوتية مع عزبوت</p>
            <p className="text-xs text-muted-foreground">اضغط على زر الاتصال لبدء المحادثة</p>
          </div>
        )}
        {transcripts.length === 0 && isConnected && (
          <div className="text-center py-8">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-16 h-16 rounded-full bg-construction-accent/20 flex items-center justify-center mx-auto mb-3"
            >
              <Mic className="w-8 h-8 text-construction-accent" />
            </motion.div>
            <p className="text-sm font-bold text-foreground mb-1">
              {isSpeaking ? 'عزبوت يتحدث...' : 'جاهز للاستماع...'}
            </p>
            <p className="text-xs text-muted-foreground">تحدث الآن</p>
          </div>
        )}
        {transcripts.map((t, i) => (
          <div key={i} className={`flex gap-2 ${t.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${
              t.role === 'user'
                ? 'bg-construction-primary text-white rounded-br-sm'
                : 'bg-muted rounded-bl-sm'
            }`}>
              {t.text}
            </div>
          </div>
        ))}
      </div>

      {/* Conversation Bar */}
      <div className="p-3 border-t border-border flex-shrink-0">
        <div className="flex items-center justify-center gap-3">
          {isConnected && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="h-10 w-10 rounded-full"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          )}

          {!isConnected ? (
            <Button
              onClick={startConversation}
              disabled={isConnecting}
              className="h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            >
              {isConnecting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                  <Phone className="w-5 h-5" />
                </motion.div>
              ) : (
                <Phone className="w-5 h-5" />
              )}
            </Button>
          ) : (
            <Button
              onClick={stopConversation}
              className="h-12 w-12 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          )}

          {isConnected && (
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isSpeaking ? 'bg-construction-accent/20' : 'bg-muted'}`}>
              <motion.div
                animate={isSpeaking ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.6 }}
              >
                {isSpeaking ? <Volume2 className="w-4 h-4 text-construction-accent" /> : <Mic className="w-4 h-4 text-muted-foreground" />}
              </motion.div>
            </div>
          )}
        </div>

        {isConnected && (
          <p className="text-[9px] text-muted-foreground text-center mt-2">
            {isSpeaking ? '🔊 عزبوت يتحدث...' : '🎤 يستمع إليك...'}
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceConversation;
