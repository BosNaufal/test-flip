module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            stores: "./stores",
            components: "./components",
            screens: "./screens",
            utils: "./utils",
            services: "./services",
            stores: "./stores",
            themes: "./themes",
            assets: "./assets",
          },
        },
      ],
    ],
  };
};
