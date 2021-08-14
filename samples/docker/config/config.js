module.exports =  {
    //  changeHook: async function (item) 
    //     {
    //         console.log('changeHook  base triggered - global override');
    //         console.log(item);
    //         return true
    //     },
    pipeline: [
        {
            name:"log",
            config: 
            {
                "myvar":"myname"
            }

        },
        {
            name:"http",
            config: 
            {
                "endpoint":"https://enusprb2hskaq.x.pipedream.net"
            }

        },
        {
            name:"dummy",
            config: 
            {
               
            }

        }
    ],
    plugins:
    {
        "dummy": async function (input,config,context)
        {
            console.log("NOTHING");
            return input;
        }
    },
    databases:
    {
        

        "test01":
         {
            // changeHook: async function (item) 
            // {
            //     console.log('changeHook  base triggered - databaselevel override');
            //     console.log(item);
            //     return true
            // },
             collections:
             {
                 test:
                 {
                        //  changeHook: async function (item) 
                        //     {
                        //         console.log('changeHook  base triggered - collection override');
                        //         console.log(item);
                        //         return true
                        //     },
                 }

             }
         },
         "test02":
         {
             collections:
             {
                 
             }
         }
    }
};
