#!/bin/bash
rm -rf public
cd ../../part2/notes-frontend
npm run build
cp -r dist ../../part3/notes-backend
cd -
mv dist public
