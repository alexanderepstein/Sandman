#!/bin/bash

electron-packager ~/git/Sandman Sandman --platform linux --arch x64 --out ~/git/Sandman/build/dist/ --overwrite  || { echo Error packaging 64 bit application; exit 1; } && electron-installer-debian --src ~/git/Sandman/dist/Sandman-linux-x64/ --arch amd64 --config config.json --overwrite || { echo Error packaging 64 bit dpkg; exit 1; } &

electron-packager ~/git/Sandman Sandman --platform linux --arch ia32 --out ~/git/Sandman/build/dist/ || { echo Error packaging 32 bit application ; exit 1; } && electron-installer-debian --src ~/git/Sandman/dist/Sandman-linux-ia32/ --out ~/git/Sandman/dist/--arch x86 --config config.json || { echo Error packaging 32 bit dpkg; exit 1; }
