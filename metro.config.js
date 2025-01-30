const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this to handle symlinks properly
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = ['./node_modules'];

module.exports = config; 