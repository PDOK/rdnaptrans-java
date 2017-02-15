#!/usr/bin/env bash
bash -c "./node_modules/.bin/mocha --recursive -R spec --bail --check-leaks test/server &&
./node_modules/.bin/karma start --browsers Firefox --single-run"
