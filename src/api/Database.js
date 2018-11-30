import uuid from 'uuid';
import Promise from 'bluebird';

const DATABASE_FILENAME =  'photos.json';

let files = [];

const Database = {
  getImageList: async () => {
    let filesString = await blockstack.getFile(DATABASE_FILENAME);
    if (filesString) {
      files = JSON.parse(filesString);
    }

    return files;
  },
  loadImages: async (files) => {
    return Promise.map(files, (file) => {
      return blockstack.getFile(file.id)
        .catch(() => null);
    }, {
      concurrency: 3
    })
    .then((images) =>  images.filter((image) => (image !== null)));
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