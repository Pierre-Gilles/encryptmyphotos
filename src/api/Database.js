const uuid = require('uuid');

const DATABASE_FILENAME =  'photos.json';

let files = [];

const Database = {
  getImageList: async () => {
    let filesString = await blockstack.getFile(DATABASE_FILENAME, {
      decrypt: true
    });
    if (filesString) {
      files = JSON.parse(filesString);
    }

    return files;
  },
  loadImages: async (files) => {
    let promises = [];
    files.forEach((file) => {
      promises.push(blockstack.getFile(file.id, {
        decrypt: true
      }));
    });
    return Promise.all(promises);
  },
  initAccount: () => {
    return blockstack.putFile(DATABASE_FILENAME, JSON.stringify([], {
      encrypt: true
    }));
  },
  saveDatabase: () => {
    return blockstack.putFile(DATABASE_FILENAME, JSON.stringify(files), {
      encrypt: true
    });
  },
  uploadImage: async (file, content) => {
    file.id = uuid.v4();
    await blockstack.putFile(file.id, content, {
      encrypt: true
    });
    files.push(file);
    await Database.saveDatabase();
    return content;
  },
};

export default Database;