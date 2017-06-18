#!/bin/bash

echo "Resolving dependencies"
sudo npm install -g electron-packager
sudo npm install -g electron-installer-debian
sudo npm install -g electron-installer-redhat
electron-packager ~/git/Sandman Sandman --overwrite --ignore tests --ignore assets/Usage.gif --ignore scss --ignore build --ignore assets/giphy.gif --platform linux --arch ia32 --electronVersion 1.7.3 --out ~/git/Sandman/build/dist/  || { echo Error packaging 32 bit application ; exit 1; } && electron-installer-debian --src ~/git/Sandman/build/dist/Sandman-linux-ia32/  --arch x86 --config config.json  || { echo Error packaging 32 bit dpkg; exit 1; } &
electron-packager ~/git/Sandman Sandman --overwrite --ignore tests --ignore assets/Usage.gif --ignore scss --ignore build --ignore assets/giphy.gif  --platform linux --arch x64 --electronVersion 1.7.3 --out ~/git/Sandman/build/dist/   || { echo Error packaging 64 bit application; exit 1; } && electron-installer-debian --src ~/git/Sandman/build/dist/Sandman-linux-x64/ --arch amd64 --config config.json  || { echo Error packaging 64 bit dpkg; exit 1; }
electron-installer-redhat --src ~/git/Sandman/build/dist/Sandman-linux-x64/ --arch x86_64 --config config.json  || echo Error creating rpm
