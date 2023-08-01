import {
  openDB
} from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {
        keyPath: 'id',
        autoIncrement: true
      });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database')

  // Create a connection to the database, version we want to use
  const jateDb = await openDB('jate', 1)

  // Create a new transaction and choose the database and privelige is read n write
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the object store
  const store = tx.objectStore('jate');

  // Get information of the req
  const request = store.put({
    id: 1,
    value: content
  });

  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all from the database')

  // Create a connection to the database, version we want to use
  const jateDb = await openDB('jate', 1);

  // Create new transaction, choose db, privelige is readonly
  const tx = jateDb.transaction('jate', 'readonly');

  // open up object store 
  const store = tx.objectStore('jate');

  // Get information from the store
  const request = store.getAll();

  // Waits for the information from request
  const result = await request;

  console.log('result.value', result);
  // Returns information from result
  return result.value;
};

initdb();