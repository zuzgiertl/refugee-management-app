require('dotenv').config()
const { faker } = require('@faker-js/faker');
const fs = require('fs')
const { MongoClient } = require('mongodb');

const NUM_RESOURCES = 30
const NUM_USERS = 100
const NUM_CASES = 1000

async function main() {

  const uri = process.env.MDB_URI
  const databaseName = process.env.TARGET_DATABASE
  const dropExisting = process.env.DROP_EXISTING_DB

  const client = uri ? new MongoClient(uri) : null;
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    const db = client.db(databaseName);
    if (dropExisting !== 'false') {
      console.log(`Dropping existing database ${databaseName}`);
      await db.dropDatabase()
    }

    const volunteers = await loadUsers(db)
    await loadResources(db)
    await loadCases(db, volunteers)

  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);

// LOAD USER DATA
async function loadUsers(db) {
  let refs = []
  console.log(`====> LOADING USERS`);
  const collection_name = `users`

  for (let i = 0; i < NUM_USERS; i++) {
    const docs = []
    let doc = {
      "name": faker.name.findName(),
      "type": faker.random.arrayElement(['volunteer', 'admin']),
      "specialCases": faker.random.arrayElements(["lgbtqi", "pregnant", "disabled", "jewishCommunity", "orphan", "singleMother", "surrogateBaby", "elderly"], faker.datatype.number({min: 0, max: 2})), // resource catgories
      "languages": faker.random.arrayElements(["english", "ukrainian", "russian", "polish", "romanian", "hungarian", "slovak", "czech", "german"]), 
      "contact": [
        { 
          "value": faker.phone.phoneNumber(),
          "type": faker.random.arrayElement(["phone", "whatsApp"]),
          "email": faker.internet.email(),
          "social": [{
            "value": faker.internet.userName(),
            "platform": "twitter"
          }]
        }
      ]
    }
    let refId = await writeDoc(db, collection_name, doc)
    refs.push(refId.insertedId)
  }
  return refs
}

// LOAD RESOURCE DATA
async function loadResources(db) {
  let refs = []
  console.log(`====> LOADING RESOURCES`);
  const collection_name = `resources`

  for (let i = 0; i < NUM_RESOURCES; i++) {
    const docs = []
    let doc ={
      "stoplight": faker.random.arrayElement(["red", "yellow", "green"]),
      "category": faker.random.arrayElement(["Accomodation", "Animals", "Border", "Disabilities & Healthcare", "General", "Legal", "Safety", "Supplies", "Transport"]),
      "subCategory": `${faker.lorem.word().toUpperCase()} Sub Category`,
      "website": faker.internet.url(),
      "phoneNumber": faker.phone.phoneNumber(),
      "additionalDetails": faker.lorem.paragraphs(2),
      "dateAdded": faker.date.recent(),
      "dateVerified": new Date(),
      "verified": true,
      "reputation": {
        "clicks": 100,
        "likes": faker.datatype.number({min: 30, max: 100}),
      }
    }
    let refId = await writeDoc(db, collection_name, doc)
    refs.push(refId.insertedId)
  }
  return refs
}

// LOAD CASE DATA
async function loadCases(db, volunteers) {

  const caseManagers = faker.random.arrayElements(volunteers, faker.datatype.number({min: 1, max: 2}))
  let refs = []
  console.log(`====> LOADING CASES`);
  const collection_name = `cases`

  for (let i = 0; i < NUM_CASES; i++) {
    const docs = []
    let doc = {
      "status": faker.random.arrayElement([ "CLOSED", "OPEN", "IN PROGRESS", "NO RESPONSE", "HIT A WALL"]),
      "caseNumber": faker.finance.account(),
      "resourcesNeeded": faker.random.arrayElements(["Accomodation", "Animals", "Border", "Disabilities & Healthcare", "General", "Legal", "Safety", "Supplies", "Transport"], faker.datatype.number({min: 1, max: 2})),
      "specialCases": faker.random.arrayElements(["lgbtqi", "pregnant", "disabled", "jewishCommunity", "orphan", "singleMother", "surrogateBaby", "elderly"], faker.datatype.number({min: 0, max: 2})), // resource catgories
      "refugeeName": faker.name.findName(),
      "refugeeContact": [
        { 
          "value": faker.phone.phoneNumber(),
          "type": faker.random.arrayElement(["phone", "whatsApp"]),
          "email": faker.internet.email(),
          "social": [{
            "value": faker.internet.userName(),
            "platform": "twitter"
          }]
        }
      ],
      "numberOfAdults": faker.datatype.number({min: 1, max: 4}),
      "numberOfMinors": faker.datatype.number({min: 0, max: 4}),
      "numberOfPets": faker.datatype.number({min: 0, max: 2}),
      "currentLocation": {
        "city": "Kyiv",
        "geo": {
          "type": "Point",
          "coordinates": [30.523333, 50.45]
        }
      },
      "originatingLocation": {
        "city": "Mariupol",
        "geo": {
          "type": "Point",
          "coordinates": [37.549444, 47.095833]
        }
      },
      "destinationLocation": {
        "city": "Berlin",
        "geo": {
          "type": "Point",
          "coordinates": [13.405, 52.52]
        }
      },
     
      "caseManager": caseManagers.map(cm => {
        return {
          "volunteer": cm,
          "active": true,
          "dateAssigned": faker.date.recent()
        }
      }),
      "dateCreated": faker.date.past(),
      "zone": faker.random.arrayElement(["red", "orange", "yellow", "green"]),
      "notes": [
        {
          "author": caseManagers[0],
          "date": new Date(),
          "text": faker.lorem.paragraphs(2)
        }
      ],
      "medical": {
        "isMobile": true,
        "notes": [
          {
            "author": caseManagers[0],
            "date": new Date(),
            "text": faker.lorem.paragraphs(2)
          }
        ]
      }
    }
    let refId = await writeDoc(db, collection_name, doc)
    refs.push(refId.insertedId)
  }
  return refs
}


// UTILITY FUNCTIONS
async function writeDoc(db, collection_name, doc) {
  // === write to console
  // console.log(`==== ${collection_name}`);
  const data = JSON.stringify(doc, null, 2)
  console.log(data);
  // return faker.datatype.uuid()

  // === write to file
  // fs.writeFileSync(`./out/${colname}.json`, data, (err) => {
  //   // In case of a error throw err.
  //   if (err) throw err;
  // })

  // === write to database
  const collection = db.collection(collection_name)
  const result = await collection.insertOne(doc)
  return result
}
