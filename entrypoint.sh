#!/bin/sh
echo "ENTRYPOINT DOCKER"
echo "ARGS"
echo $@
echo "working in"
pwd 

if [ -z "$NPM_PLUGINS" ]; then 
    echo "NPM_PLUGINS is blank"; 
else
    echo "Installing NPM_PLUGINS"; 
    npm install ${NPM_PLUGINS} --save; 
fi

if [ -z "$PRELOAD_SCRIPT" ]; then 
    echo "PRELOAD_SCRIPT is blank"; 
else  
    echo "Executing PRELOAD_SCRIPT"; 
    ${PRELOAD_SCRIPT} 
fi

npm run serve
