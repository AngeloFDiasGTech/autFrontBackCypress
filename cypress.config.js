const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());

      const version = config.env.version || 'dev'
      config.env = require(`./cypress/config/${version}.json`);
      config.baseUrl = config.env.baseUrl;
      return config;
    },
  },
});
