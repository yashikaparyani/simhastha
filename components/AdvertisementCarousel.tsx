import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

interface Advertisement {
  id: string;
  image: any;
  title: string;
  description: string;
  actionText?: string;
}

interface AdvertisementCarouselProps {
  advertisements?: Advertisement[];
}

const defaultAdvertisements: Advertisement[] = [
  {
    id: '1',
    image: { uri: 'https://d3jbu7vaxvlagf.cloudfront.net/small/v2/category_media/image_859551727257430.jpg' },
    title: 'Simhastha Mela 2028',
    description: 'Experience the divine journey',
    actionText: 'Learn More',
  },
  {
    id: '2',
    image: { uri: 'https://substackcdn.com/image/fetch/$s_!Epfl!,w_1272,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4e612a51-3bb2-4aab-bf31-6209f846d2a3_1536x1024.png' },
    title: 'Special Darshan',
    description: 'Book your temple slots now',
    actionText: 'Book Now',
  },
  {
    id: '3',
    image: { uri: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=400&fit=crop&crop=center' },
    title: 'Parking Available',
    description: 'Secure parking zones ready',
    actionText: 'Find Parking',
  },
  {
    id: '4',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs7syM2aT9kCW80hf1LFhlvwsrPMMISWTP0Q&s' },
    title: 'Emergency Services',
    description: '24x7 help available',
    actionText: 'Get Help',
  },
  {
    id: '5',
    image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnLVy5WUUgjaRH_-KVGkKeY6-sfiIp1D0EHBLrDonSbebXWSbP1M2vCMA8N1oLMYfeP8&usqp=CAU' },
    title: 'Live Map',
    description: 'Navigate with ease',
    actionText: 'View Map',
  },
];

export default function AdvertisementCarousel({ 
  advertisements = defaultAdvertisements 
}: AdvertisementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % advertisements.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (screenWidth - 24), // Match slide width
          animated: true,
        });
        return nextIndex;
      });
    }, 2500); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [advertisements.length]);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (screenWidth - 24));
    setCurrentIndex(index);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * (screenWidth - 24),
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {advertisements.map((ad, index) => (
          <View key={ad.id} style={styles.slide}>
            <ExpoImage
              source={ad.image}
              style={styles.adImage}
              contentFit="cover"
            />
            <View style={styles.adOverlay}>
              <Text style={styles.adTitle}>{ad.title}</Text>
              <Text style={styles.adDescription}>{ad.description}</Text>
              {ad.actionText && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{ad.actionText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {advertisements.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot,
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
    paddingHorizontal: 0,
  },
  scrollView: {
    width: '100%',
  },
  slide: {
    width: screenWidth - 24, // Even better fit for phone screen
    height: 180,
    position: 'relative',
    marginHorizontal: 12,
  },
  adImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  adOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  adTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  adDescription: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: Colors.light.accentOrange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.light.accentBlue,
    width: 12,
  },
});
