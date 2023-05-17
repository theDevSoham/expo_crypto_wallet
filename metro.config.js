// const { getDefaultConfig } = require('expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);

// module.exports = {
// 	...defaultConfig,
// 	resolver: {
// 		...defaultConfig.resolver,
// 		assetExts: [...defaultConfig.resolver.assetExts, 'obj', 'mtl', 'JPG', 'vrx', 'hdr', 'gltf', 'glb', 'bin', 'arobject', 'gif'],
// 		extraNodeModules: {
// 			...defaultConfig.resolver.extraNodeModules,
// 		}
// 	},
//   };

module.exports = {
  resolver: {
    extraNodeModules: require("node-libs-expo"),
  },
};
