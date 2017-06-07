#!/bin/bash

echo "Resolving dependencies"
sudo yarn global add electron-packager
sudo yarn global add electron-installer-debian
sudo yarn global add electron-installer-redhat
electron-packager ~/git/Sandman Sandman --platform linux --arch ia32 --out ~/git/Sandman/build/dist/  || { echo Error packaging 32 bit application ; exit 1; } && electron-installer-debian --src ~/git/Sandman/build/dist/Sandman-linux-ia32/  --arch x86 --config config.json  || { echo Error packaging 32 bit dpkg; exit 1; } &
electron-packager ~/git/Sandman Sandman --platform linux --arch x64 --out ~/git/Sandman/build/dist/   || { echo Error packaging 64 bit application; exit 1; } && electron-installer-debian --src ~/git/Sandman/build/dist/Sandman-linux-x64/ --arch amd64 --config config.json  || { echo Error packaging 64 bit dpkg; exit 1; }
electron-installer-redhat --src ~/git/Sandman/build/dist/Sandman-linux-x64/ --arch x86_64 --config config.json  || echo Error creating rpm
