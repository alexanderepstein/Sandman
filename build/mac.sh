#!/bin/bash

electron-packager ~/git/Sandman Sandman --platform darwin --arch x64 --out ~/git/Sandman/build/dist/ --electronVersion 1.7.2 --overwrite --icon ~/git/Sandman/assets/sleep.icns || { echo Error packaging  application ; exit 1; } && create-dmg ~/git/Sandman/build/dist/Sandman-darwin-x64/Sandman.app 
