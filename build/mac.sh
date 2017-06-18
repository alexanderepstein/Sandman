#!/bin/bash

echo "Resolving dependencies"
sudo npm install -g electron-packager
npm install -g create-dmg
electron-packager ~/git/Sandman Sandman --ignore tests --ignore assets/Usage.gif --ignore scss --ignore build --ignore assets/giphy.gif --platform darwin --arch x64 --out ~/git/Sandman/build/dist/ --electronVersion 1.7.3 --overwrite --icon ~/git/Sandman/assets/sleep.icns || { echo Error packaging  application ; exit 1; } && create-dmg ~/git/Sandman/build/dist/Sandman-darwin-x64/Sandman.app
echo Removing temporary files
sudo rm -r dist
