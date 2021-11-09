const metadataOpt = {
  site: {
    lang: 'en',
    author: 'Adam Surdyk'
  }
}

const markdownOpt = {}

const layoutsOpt = {
  pattern: '**/*.html',
  default: 'default.pug',
  directory: 'layouts'
}

const componentsOpt = {
  'componentDirectory': 'node_modules',
  'components': {
    'bootstrap': {
      'dist/css/bootstrap.min.css': 'css'
    }
  }
}

const beautifyOpt = {}

const Metalsmith      = require('metalsmith')(__dirname);
const debugUi         = require('metalsmith-debug-ui').report;
const markdown        = require('metalsmith-markdown')(markdownOpt);
const layouts         = require('metalsmith-layouts')(layoutsOpt);
const beautify        = require('metalsmith-beautify')(beautifyOpt);
const components      = require('metalsmith-components')(componentsOpt);

Metalsmith
  .clean(false).destination('./out').use(debugUi('Init'))
  .metadata(metadataOpt)            .use(debugUi('Native Metadata'))
  .use(components)                  .use(debugUi('Components'))
  .use(markdown)                    .use(debugUi('Markdown'))
  .use(layouts)                     .use(debugUi('Layouts'))
  .use(beautify)                    .use(debugUi('Beautify'))
  .build(err => {
    if(err) console.log(err);
    console.log('Rendering Metalsmith complited');
  })
