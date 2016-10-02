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
          loaders : [
               {
                    test : /\.jsx?$/,
                    exclude : /node_modules/,
                    loader : 'babel?presets[]=react&plugins[]=transform-runtime&plugins[]=transform-object-rest-spread&plugins[]=transform-regenerator&plugins[]=react-hot-loader/babel'
               }
          ]
     }

}
