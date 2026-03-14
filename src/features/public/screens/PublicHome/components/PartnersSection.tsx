import React from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { PARTNER_LOGOS } from '../data';

export const PartnersSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nos Partenaires</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {PARTNER_LOGOS.map((logo, index) => (
          <Animated.View
            key={index}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.logoContainer}
          >
            <Image source={{ uri: logo }} style={styles.logo} />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scroll: {
    paddingRight: 16,
  },
  logoContainer: {
    width: 100,
    height: 60,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
