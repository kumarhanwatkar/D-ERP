import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, MessageCircle, CircleUserRound, Clock3, ArrowUpRight } from 'lucide-react';
import { backendApi } from '@/lib/backendApi';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  onQuery?: (query: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Hi! I\'m D-ERP AI Assistant. I can help you with:\n• "Optimize payroll" - Get yield optimization suggestions\n• "Analyze yield performance" - See detailed yield analytics\n• "Compare employees" - View employee stats\n• "Show trends" - Display historical trends\n• "Calculate ROI" - Get ROI projections\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sampleQueries = [
    'Optimize payroll',
    'Analyze yield performance',
    'Show employee stats',
    'Calculate ROI',
    'Compare departments',
  ];

  const scrollToLatest = (behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  useEffect(() => {
    if (!isOpen) return;

    if (isNearBottom) {
      scrollToLatest('smooth');
    }
  }, [messages, isOpen, isLoading, isNearBottom]);

  useLayoutEffect(() => {
    if (isOpen) {
      scrollToLatest('auto');
    }
  }, [isOpen]);

  const formatTime = (value: Date) =>
    value.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    onQuery?.(messageText);

    try {
      const response = await backendApi.chatRespond(messageText);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(response.timestamp),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackReply =
        'I understand you\'re asking about: ' +
        messageText +
        '\n\n💡 I can help with:\n• Payroll optimization\n• Yield analysis\n• Employee metrics\n• ROI calculations\n• Department comparisons\n• Trend forecasting\n\nWould you like me to provide analysis on any of these areas?';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground shadow-[0_20px_40px_hsl(217_91%_60%/0.26)] ring-1 ring-primary/20 transition-all backdrop-blur-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-6 z-40 w-[min(420px,calc(100vw-1.5rem))] h-[min(680px,calc(100vh-8rem))] overflow-visible"
          >
            <div className="chat-shell relative flex h-full min-h-0 flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card/90 backdrop-blur-2xl shadow-[0_30px_80px_hsl(222_40%_10%/0.28)]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 opacity-70 pointer-events-none bg-[radial-gradient(circle_at_top_right,hsl(187_100%_50%/0.08),transparent_38%)]" />

              <div className="relative z-10 flex h-full min-h-0 flex-col">
                <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-primary/10 via-background/10 to-secondary/10 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/15">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm leading-tight">D-ERP AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Smart guidance for payroll, yield, and analytics</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>

                <div
                  ref={scrollRef}
                  className="chat-scroll-area flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 pr-3 space-y-4 scroll-smooth touch-pan-y"
                  onScroll={() => {
                    const container = scrollRef.current;
                    if (!container) return;

                    const remaining = container.scrollHeight - container.scrollTop - container.clientHeight;
                    setIsNearBottom(remaining < 96);
                  }}
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-card/70 text-primary">
                          <Bot className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          msg.role === 'user'
                            ? 'rounded-2xl rounded-br-sm bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_12px_24px_hsl(217_91%_60%/0.18)]'
                            : 'rounded-2xl rounded-bl-sm border border-border/60 bg-muted/70 text-foreground shadow-sm'
                        }`}
                      >
                        <div className={`mb-1.5 flex items-center gap-1 text-[11px] font-medium ${msg.role === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          <Clock3 className="h-3 w-3" />
                          <span>{formatTime(msg.timestamp)}</span>
                        </div>
                        {msg.content}
                      </div>
                      {msg.role === 'user' && (
                        <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                          <CircleUserRound className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary/60" />
                      <div className="h-2 w-2 rounded-full bg-secondary/60" />
                      <div className="h-2 w-2 rounded-full bg-primary/60" />
                    </motion.div>
                  )}
                  <div ref={bottomRef} aria-hidden="true" />
                </div>

                {!isNearBottom && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-[88px] flex justify-center px-4">
                    <button
                      type="button"
                      onClick={() => scrollToLatest('smooth')}
                      className="pointer-events-auto rounded-full border border-primary/30 bg-card/90 px-4 py-2 text-xs font-semibold text-primary shadow-[0_12px_30px_hsl(217_91%_60%/0.18)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-primary/10"
                    >
                      Jump to latest
                    </button>
                  </div>
                )}

                {messages.length <= 1 && (
                  <div className="border-t border-border/60 px-4 py-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Try</p>
                    <div className="grid grid-cols-2 gap-2">
                      {sampleQueries.map((query) => (
                        <button
                          key={query}
                          onClick={() => handleSendMessage(query)}
                          className="group rounded-xl border border-border/60 bg-card/70 px-3 py-2 text-left text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                        >
                          <span className="inline-flex items-center gap-1">
                            <ArrowUpRight className="h-3 w-3 opacity-70 group-hover:opacity-100" />
                            {query}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 border-t border-border/60 bg-background/40 p-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1 rounded-xl border border-border/60 bg-card/80 px-3 py-2.5 text-sm leading-relaxed shadow-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[0_12px_24px_hsl(217_91%_60%/0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_30px_hsl(217_91%_60%/0.26)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
