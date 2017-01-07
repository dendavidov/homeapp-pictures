#!/usr/bin/env bash

rm -rf ../build
mkdir ../build
webpack --config webpack.config.js
node front-server