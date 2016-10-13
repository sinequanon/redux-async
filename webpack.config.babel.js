// Plugin for using cssnext features
import postcssnext from 'postcss-cssnext';
// Use precss as replacement for sass lib due to apparent speed up and much 
// faster compilation using postcss
import precss from 'precss';
// Include postcss-import to fix a hot loading bug in imported css files
import postcssImport from 'postcss-import';
// Reporter for postcss process
import postcssReporter from 'postcss-reporter';
// Linting for styles
import stylelintPlugin from 'stylelint-webpack-plugin';

export default {
  entry : [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output : {
    filename : 'index.js',
  },
  devtool : 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module : {
    preLoaders : [
      // Run js code through eslint. This also could have been written
      // as an additional loader in the loaders section for js* files
      // eg 'babel?presets[]...!eslint'
      {
        test    : /\.jsx?$/,
          exclude : /node_modules/,
          loader  : 'eslint?{cache: true}',
      }
    ],
    loaders : [
      {
        test : /\.jsx?$/,
        exclude : /node_modules/,
        loader : 'babel?presets[]=react&plugins[]=transform-object-rest-spread&plugins[]=react-hot-loader/babel'
      },
      // Convert from sass -> postcss -> css -> style
      {
        test : /\.s?css$/,
          loader :  // Use plugin to emit file that is processed and
          // minimized
          'style!css?sourceMap!postcss?sourceMap'
        // Could also be written :
        // loaders : [ 'style', 'css?sourceMap', 'postcss', 'sass?sourceMap' ]
      }
    ]

  },
  // Post css function for additional css compilation
  postcss : function(webpack) {
    return [ 
      // Fixes a bug where file @imports are not recompiled during hot
      // loading. Remove once precss fixes this.
      // This must be first in order for @imports to hot load during
      // development.
      postcssImport({ addDependencyTo: webpack }), 
      // Allow sass syntax in css
      precss,
      // Allow next gen css syntax
      postcssnext(),
      // postcss logging
      postcssReporter({ clearMessages : true }),
    ];
  },
  plugins : [
    // Add linting to CSS using stylelint. We are extending
    // stylelint-config-standard
    new stylelintPlugin({
      syntax: 'scss',
      files: ['**/*.s?css']
    }),
  ]
}
