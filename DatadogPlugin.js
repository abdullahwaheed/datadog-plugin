const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class DatadogPlugin {
  constructor(options) {
    this.options = {
      accountID: undefined,
      agentID: undefined,
      applicationID: undefined,
      licenseKey: undefined,
      trustKey: undefined,
      ...options,
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('DatadogPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
        'DatadogPlugin',
        (data) => {
          try {
            // Read the contents of the code file
            console.error('\n\n\n\n\n\n\nstart');
            customCode = fs.readFileSync('../node_modules/datadog-testing-plugin/DatadogInit.js', 'utf8');
            
          } catch (error) {
            console.error(`Error reading file: ${error}`);
            return;
          }
          console.error('\n\n\n\n\n\n\nsuccess');
          const newRelicScriptTag = HtmlWebpackPlugin.createHtmlTagObject(
            'script',
            { type: 'text/javascript' },
            customCode,
          );
          data.headTags.unshift(newRelicScriptTag);
        },
      );
    });
  }
}

module.exports = DatadogPlugin;
