import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }, 3000);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://e0.pxfuel.com/wallpapers/352/76/desktop-wallpaper-bitcoin-crypto-thumbnail.jpg'}}
        style={styles.backgroundImage}
      />
	  <View style={styles.overlay} />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Expo Crypto Wallet
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
	width: '100%',
	height: '100%',
	zIndex: -2,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
	...StyleSheet.absoluteFillObject,
	backgroundColor: 'rgba(0,0,0,0.5)',
	zIndex: -1,
	width: '100%',
	height: '100%',
  },
});

export default SplashScreen;