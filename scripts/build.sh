#!/bin/bash

ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

echo "🗑 Cleaning '/build'..."
rm -rf ${ROOT_DIR}/build

# Build app
echo "🏗 Building for '${NODE_ENV}'"
${ROOT_DIR}/node_modules/.bin/webpack --config ${ROOT_DIR}/webpack/${NODE_ENV}.config.js --display-error-details
