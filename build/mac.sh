#!/bin/bash

echo "Resolving dependencies"
sudo yarn global add electron-packager
sudo yarn global add create-dmg
electron-packager ~/git/Sandman Sandman --platform darwin --arch x64 --out ~/git/Sandman/build/dist/ --electronVersion 1.7.2 --overwrite --icon ~/git/Sandman/assets/sleep.icns || { echo Error packaging  application ; exit 1; } && create-dmg ~/git/Sandman/build/dist/Sandman-darwin-x64/Sandman.app
echo Removing temporary files
sudo rm -r dist
