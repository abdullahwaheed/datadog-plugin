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
    compiler.hooks.emit.tap('DatadogPlugin', (compilation) => {
      let customCode = '';

      try {
        // Read the contents of the code file
        customCode = fs.readFileSync('DatadogInit.js', 'utf8');
      } catch (error) {
        console.error(`Error reading file: ${error}`);
        return;
      }
      compilation.assets['custom.js'] = {
        source: () => customCode,
        size: () => customCode.length
      };
      // const customCode = this.options.customCode;

      // Add the custom code to the generated bundle
      // compilation.assets['custom.js'] = {
      //   source: () => customCode,
      //   size: () => customCode.length
      // };
    });
  }
}

module.exports = DatadogPlugin;
