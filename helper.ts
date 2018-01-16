import mongoose = require('mongoose');
import { config } from './app';

const mochaAsync = (fn) => {
  return async (done) => {
    try {
      await fn();
      done();
    } catch (err) {
      done(err);
    }
  };
};

before(async () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/bucketlist', { useMongoClient: true });

});


after((done) => {
  mongoose.disconnect();

  done();
});
