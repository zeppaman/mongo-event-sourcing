const config = require('./action');

const { MongoClient } = require("mongodb");



module.exports =  async function watch(uri) {
   
      let client = new MongoClient(uri);
      client =  await client.connect();
      
        // List all the available databaes
      let defaultDb= await client.db();
      let adminDb=defaultDb.admin();
      let databases= await adminDb.listDatabases();

      console.log("Databases found", databases.databases);
      for (const element of databases.databases) 
      {
          //only selected databases
        
          console.log("Congifuring",element.name);
          let dbConfig=config.databases[element.name];
          
          if(!dbConfig)
          {
            console.log("database not selected, skip it");
            continue;
          }
          console.debug(dbConfig);

          let db=client.db(element.name);
          let collections= await db.listCollections().toArray();
          
          for (const collection of collections) 
          {
            
           
            if(dbConfig.collections && !dbConfig.collections.hasOwnProperty(collection.name))
            {
              console.log("collection not enabled, skip it");
              continue;
            }
            let collectionConf=dbConfig.collections[collection.name];
            console.debug(collectionConf);

            console.log("..Collection",collection.name);

            let changeStream = db.collection(collection.name).watch();
            changeStream.on("change", next => config.invoke(element.name,collection.name,"changeHook",[next,config]));
          }

      };
    //   const database = client.db("sample_mflix");
    //   changeStream = database.watch();

    //   changeStream.on("change", next => {
    //     // process any change event
    //     console.log("received a change to the collection: \t", next);
    //   });
    //   // use a timeout to ensure the listener is registered before the insertOne
    //   // operation is called.
     
      
  
  };