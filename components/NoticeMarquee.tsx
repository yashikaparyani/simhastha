import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface NoticeMarqueeProps {
  notices?: string[];
  speed?: number;
}

const defaultNotices = [
  'सिंहस्थ मेला 2028 में आपका स्वागत है - Welcome to Simhastha Mela 2028',
  'महाकालेश्वर मंदिर में विशेष दर्शन की व्यवस्था - Special darshan arrangements at Mahakaleshwar Temple',
  'पार्किंग सुविधा उपलब्ध - Parking facilities available',
  'आपातकालीन सेवाएं 24x7 उपलब्ध - Emergency services available 24x7',
  'सुरक्षा के लिए सभी नियमों का पालन करें - Follow all rules for safety',
];

export default function NoticeMarquee({ 
  notices = defaultNotices,
  speed = 50 
}: NoticeMarqueeProps) {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000); // Change notice every 5 seconds

    return () => clearInterval(interval);
  }, [notices.length]);

  useEffect(() => {
    if (textWidth > 0) {
      const animation = Animated.loop(
        Animated.timing(scrollX, {
          toValue: -textWidth - screenWidth,
          duration: (textWidth + screenWidth) * speed,
          useNativeDriver: true,
        })
      );
      animation.start();

      return () => animation.stop();
    }
  }, [textWidth, scrollX, speed]);

  const currentNotice = notices[currentNoticeIndex];

  return (
    <View style={styles.container}>
      <View style={styles.marqueeContainer}>
        <Animated.Text
          style={[
            styles.marqueeText,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
          onLayout={(event) => {
            setTextWidth(event.nativeEvent.layout.width);
          }}
        >
          {currentNotice}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  marqueeContainer: {
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  marqueeText: {
    color: Colors.light.accentOrange,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
});
