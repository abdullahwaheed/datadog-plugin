const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { minify } = require('terser');

async function minifyCode(code) {
  try {
    const result = await minify(code, {
      ecma: 1, // Use ECMAScript 6 syntax
      keep_classnames: true, // Preserve class names
      keep_fnames: true, // Preserve function names
      mangle: false, // Disable variable name mangling
      compress: true, // Enable code compression
      output: {
          comments: false // Remove comments
      }
  });
    return result.code;
  } catch (error) {
    console.error('Error during code minification:', error);
    return null;
  }
}


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
          let customCode = '';
          try {
            // Read the contents of the code file
            console.error('\n\n\n\n\n\n\nstart');
            customCode = fs.readFileSync('../node_modules/datadog-testing-plugin/DatadogInit.js', 'utf8');
            
          } catch (error) {
            console.error(`Error reading file: ${error}`);
            return;
          }
          console.error('\n\n\n\n\n\n\nsuccess');
          minifyCode(customCode).then(minifiedCode => {
            const newRelicScriptTag = HtmlWebpackPlugin.createHtmlTagObject(
              'script',
              { type: 'text/javascript' },
              minifiedCode,
            );
            data.headTags.unshift(newRelicScriptTag);
          });
        },
      );
    });
  }
}

module.exports = DatadogPlugin;
