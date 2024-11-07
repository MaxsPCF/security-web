const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Añadir regla para manejar archivos .geojson
  singleSpaWebpackConfig.module.rules.push({
    test: /\.geojson$/,
    use: "json-loader",
  });
  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
