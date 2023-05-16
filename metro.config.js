const { getDefaultConfig } = require('expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
	...defaultConfig,
	resolver: {
		...defaultConfig.resolver,
		assetExts: [...defaultConfig.resolver.assetExts, 'obj', 'mtl', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'bin', 'arobject', 'gif'],
		extraNodeModules: {
			...defaultConfig.resolver.extraNodeModules,
			'net': require.resolve('react-native-tcp'),
			'crypto': require.resolve('expo-crypto'),
			'http': require.resolve('stream-http'),
			'https': require.resolve('stream-http'),
			'zlib': require.resolve('react-zlib-js'),
			'url': require.resolve('react-native-url-polyfill'),
		}
	},
  };