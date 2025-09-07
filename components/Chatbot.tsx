import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

type Language = 'en' | 'hi';

type Message = {
  id: string;
  author: 'bot' | 'user';
  text: string;
};

const FAQ: Record<Language, { question: string; answer: string }[]> = {
  en: [
    { question: 'What is Simhastha?', answer: 'Simhastha is a major Hindu festival and pilgrimage held every 12 years.' },
    { question: 'How to plan my trip?', answer: 'Use the Plan My Trip section to choose dates, transport, and accommodation.' },
    { question: 'Emergency contacts?', answer: 'Use the Emergency screen. You can call helplines or send SOS from the app.' },
    { question: 'Temple slot booking?', answer: 'Go to Temple Slot screen and select a time slot. Carry ID proof while visiting.' },
  ],
  hi: [
    { question: 'सिंहस्थ क्या है?', answer: 'सिंहस्थ हर 12 वर्षों में होने वाला प्रमुख हिन्दू पर्व और तीर्थ है।' },
    { question: 'यात्रा कैसे प्लान करें?', answer: 'Plan My Trip में तारीख, परिवहन और ठहरने की व्यवस्था चुनें।' },
    { question: 'आपातकालीन संपर्क?', answer: 'Emergency स्क्रीन से हेल्पलाइन कॉल करें या SOS भेजें।' },
    { question: 'मंदिर स्लॉट बुकिंग?', answer: 'Temple Slot स्क्रीन से समय स्लॉट चुनें। यात्रा के समय पहचान पत्र साथ रखें।' },
  ],
};

export default function Chatbot({ onClose }: { onClose: () => void }) {
  const [lang, setLang] = useState<Language>('en');
  const [messages, setMessages] = useState<Message[]>([{
    id: 'm0',
    author: 'bot',
    text: 'Namaste! Please choose language: English or हिन्दी?',
  }]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const faqs = useMemo(() => FAQ[lang], [lang]);

  const sendUser = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), author: 'user', text }]);
    setInput('');
    setTimeout(() => answer(text), 200);
  };

  const answer = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('english')) {
      setLang('en');
      setMessages(prev => [...prev, { id: Date.now().toString(), author: 'bot', text: 'Language set to English.' }]);
      return;
    }
    if (lower.includes('hindi') || lower.includes('हिन्दी') || lower.includes('hindi me')) {
      setLang('hi');
      setMessages(prev => [...prev, { id: Date.now().toString(), author: 'bot', text: 'भाषा हिन्दी सेट कर दी गई है।' }]);
      return;
    }
    const match = faqs.find(f => lower.includes(f.question.toLowerCase().split(' ')[0]));
    if (match) {
      setMessages(prev => [...prev, { id: Date.now().toString(), author: 'bot', text: match.answer }]);
    } else {
      const fallback = lang === 'en' ? 'Sorry, I can answer common questions listed below.' : 'क्षमा करें, नीचे दिए सामान्य प्रश्नों के उत्तर उपलब्ध हैं।';
      setMessages(prev => [...prev, { id: Date.now().toString(), author: 'bot', text: fallback }]);
    }
  };

  const renderFAQButtons = () => (
    <View style={styles.faqRow}>
      {faqs.map((f, idx) => (
        <TouchableOpacity key={idx.toString()} style={styles.faqBtn} onPress={() => sendUser(f.question)}>
          <Text style={styles.faqBtnText}>{f.question}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{lang === 'en' ? 'Simhastha Assistant' : 'सिंहस्थ सहायक'}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollRef} 
        style={styles.messages} 
        contentContainerStyle={{ padding: 12 }} 
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {messages.map(m => (
          <View key={m.id} style={[styles.bubble, m.author === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.bubbleText, m.author === 'user' ? styles.userBubbleText : styles.botBubbleText]}>{m.text}</Text>
          </View>
        ))}
        {renderFAQButtons()}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          placeholder={lang === 'en' ? 'Type a message' : 'संदेश लिखें'}
          placeholderTextColor={Colors.light.icon}
          style={styles.input}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendUser(input)}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendUser(input)}>
          <Text style={styles.sendText}>{lang === 'en' ? 'Send' : 'भेजें'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 320,
    maxHeight: 460,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: Colors.light.accentBlue,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: { color: '#fff', fontWeight: 'bold' },
  closeBtn: { padding: 6 },
  closeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  messages: { backgroundColor: Colors.light.background },
  bubble: { marginVertical: 4, maxWidth: '88%', borderRadius: 10, padding: 10 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: Colors.light.accentBlue },
  botBubble: { alignSelf: 'flex-start', backgroundColor: Colors.light.card, borderWidth: 1, borderColor: Colors.light.border },
  bubbleText: { fontSize: 14 },
  userBubbleText: { color: '#fff' },
  botBubbleText: { color: Colors.light.text },
  faqRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  faqBtn: { borderWidth: 1, borderColor: Colors.light.border, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 10, marginRight: 6, marginBottom: 6, backgroundColor: Colors.light.background },
  faqBtnText: { color: Colors.light.text, fontSize: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: Colors.light.border, backgroundColor: Colors.light.card },
  input: { flex: 1, borderWidth: 1, borderColor: Colors.light.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8, backgroundColor: Colors.light.background, color: Colors.light.text },
  sendBtn: { backgroundColor: Colors.light.accentBlue, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  sendText: { color: '#fff', fontWeight: '600' },
});


