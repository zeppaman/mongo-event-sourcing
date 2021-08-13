const { debug } = require('console');
const config = require('./config/config');
const axios = require('axios');

let defaultConfig=
{
    changeHook: async function (item,context) 
    {
        console.log('changeHook  base triggered');

        let pipeline=context.tryGet(item.ns.db, item.ns.coll,"pipeline");
        console.debug(pipeline);
        let result=item;
        for (const step of pipeline) 
        {
            let executable=context.actions[step.name];
            let stepConfig= {
                ...context.config.actions[step.name],
                ...step.config,
            };
             result= await executable(result,stepConfig,context)
        }
        return result;
    },
    config:
    {
        actions:
        {
            "dd":"dd"
        }
    },
    actions:
    {
        "log": async function (input,config,context)
        {
            console.log(input);
            return input;
        },
        "http": async function (input,config,context)
        {
            console.log("Posting", input);
            await axios.post(config.endpoint, input);
            return input;
        },
    },
    pipeline: [
        {
            name:"log",
            config: 
            {
                "myvar":"myname"
            }

        }
    ],
    tryGet:function (db, collection,name)
    {
        console.log(`testing ${db}.${collection}.${name}`);
        
        let specific=this.databases[db].collections[collection][name];
        if(!specific)
        {
            console.log(`not find, testing ${db}.${name}`);
            specific=this.databases[db][name];
        }

        if(!specific)
        {
            console.log(`not found, testing ${name}`);
            specific=this[name];
        }
        return specific;
    },
    invoke: async function (db, collection,method,args)
    {
        let specific=this.tryGet(db,collection,method);
        
        let result=await specific(...args);
        console.log(result);
        return result;
    }
};

let actualConfig = {
    ...defaultConfig,
    ...config
};

let actions= {
    ...actualConfig.actions,
    ...actualConfig.plugins
};
actualConfig.actions=actions;
delete  actualConfig.plugins;

console.debug(actualConfig);

module.exports =  actualConfig;