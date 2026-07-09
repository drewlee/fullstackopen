#!/bin/bash
rm -rf public
cd ../phonebook-frontend
npm run build
cp -r dist ../phonebook-backend
cd -
mv dist public
