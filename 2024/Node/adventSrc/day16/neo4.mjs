const { 
    NEO4J_URI, 
    NEO4J_USERNAME, 
    NEO4J_PASSWORD,
    AURA_INSTANCEID,
    AURA_INSTANCENAME 
} = process.env;

import neo4j from 'neo4j-driver';

export const neo = {};

(async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = NEO4J_URI
  const USER = NEO4J_USERNAME
  const PASSWORD = NEO4J_PASSWORD
  let driver

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    // const serverInfo = await driver.getServerInfo()
    // console.log('Connection established')
    // console.log(serverInfo)
    neo.driver = driver;
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();

