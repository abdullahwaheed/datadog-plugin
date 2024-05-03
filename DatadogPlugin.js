const fs = require('fs');

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

  apply(compiler){
    compiler.hooks.compilation.tap('DatadogPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'DatadogPlugin',
          stage: 'additional'
        }, () => 
        {
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
        compilation.emitAsset('custom.js', {
          source: () => customCode,
          size: () => customCode.length
        });
      });
    });
  }
}

module.exports = DatadogPlugin;
