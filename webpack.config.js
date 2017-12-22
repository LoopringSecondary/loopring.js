/*

  Copyright 2017 Loopring Project Ltd (Loopring Foundation).

  Licensed under the Apache License, Version 2.0 (the 'License');
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an 'AS IS' BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './2.0/index.ts',
    resolve: {
        modules: [
            'bower_components',
            'node_modules'
        ],
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: Path.join(__dirname, '/dist'),
        // library: 'loopring',
        // libraryTarget: 'umd',
        filename: 'loopring.min.js'
    },
    plugins: [
        new UglifyJSPlugin({
            exclude: /\/node_modules/,
            parallel: true,
            uglifyOptions: {
                beautify: false,
                ecma: 6,
                compress: true,
                comments: false
            }
        })
    ],
    externals: {
        axios: 'axios',
        'bignumber.js': 'BigNumber',
        'bn.js': 'BN',
        lodash: '_'
    },
    module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
      }
};
