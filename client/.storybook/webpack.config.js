module.exports = async ({ config, mode }) => {
  config.devServer = {
    stats: 'errors-only' // suppresses warnings in the terminal
  };

  config.module.rules.push({
    test: /\.stories\.ts?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });

  return config;
};
