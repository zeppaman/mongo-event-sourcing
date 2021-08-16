#!/bin/sh
echo "ENTRYPOINT DOCKER"
echo "ARGS"
echo $@
echo "working in"
pwd 
if [ -z "$NPM_PLUGINS" ]; then echo "NPM_PLUGINS is blank"; else npm install ${NPM_PLUGINS} --save; fi
if [ -z "$PRELOAD_SCRIPT" ]; then echo "PRELOAD_SCRIPT is blank"; else npm install ${PRELOAD_SCRIPT} --save; fi
npm run serve
