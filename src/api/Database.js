const uuid = require('uuid');

const DATABASE_FILENAME =  'photos.json';

let files = [];

const Database = {
  getImageList: async () => {
    let filesString = await blockstack.getFile(DATABASE_FILENAME);
    files = JSON.parse(filesString);
    return files;
  },
  loadImages: async (files) => {
    let promises = [];
    files.forEach((file) => {
      promises.push(blockstack.getFile(file.id));
    });
    return Promise.all(promises);
  },
  saveDatabase: () => {
    return blockstack.putFile(DATABASE_FILENAME, JSON.stringify(files));
  },
  uploadImage: async (file, content) => {
    file.id = uuid.v4();
    await blockstack.putFile(file.id, content);
    files.push(file);
    return Database.saveDatabase();
  },
};

export default Database;