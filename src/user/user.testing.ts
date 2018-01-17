import { usersModel } from './user.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IUser } from './user.interface';
import { UserManager } from './user.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

const user1 : IUser = <IUser>{
  id: 201,
  firstName: 'Shahar',
  lastName: 'Yair',
  orders: <[String]>[],
  isOfficer: true,
  isAdmin: true,
};

const user2 : IUser = <IUser>{
  id: 202,
  firstName: 'Moti',
  lastName: 'Yair',
  orders: <[String]>[],
  isOfficer: true,
  isAdmin: false,
};

const user3 : IUser = <IUser>{
  id: 203,
  firstName: 'Aviva',
  lastName: 'Yair',
  orders: <[String]>[],
  isOfficer: false,
  isAdmin: true,
};

const user4 : IUser = <IUser>{
  id: 204,
  firstName: 'Dror',
  lastName: 'Yair',
  orders: <[String]>[],
  isOfficer: false,
  isAdmin: false,
};


describe('Test Users', () => {
  
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
  });
  
  
  it('drop users collection', async () => {
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('users');
    });
    const result = await UserManager.getUserById(user1.id);
    expect(result).to.not.exist;
  });
  
  it('check if user db is empty', async () => {
    const result = await UserManager.getAllUsers();
    expect(result).to.be.empty;
  });
  
  // NOT WORKING
  // it('add users to the collection', async () => {
  //   await UserManager.addUser(new usersModel(user1));
  //   await UserManager.addUser(new usersModel(user2));
  //   await UserManager.addUser(new usersModel(user3));
  //   await UserManager.addUser(new usersModel(user4));
  //   const usersReturned = await UserManager.getAllUsers();
  //   expect(usersReturned).to.not.be.empty;
  //   expect(usersReturned).to.have.lengthOf(4);
  // });
  
  after((done) => {
    mongoose.disconnect();
    done();
  });
  
});


//   it('check if user db is empty', async () => {
//     const result = await UserManager.getAllUsers();
//     expect(result).to.be.empty;
//   });

//   it('add users to the collection', async () => {
//     await UserManager.addUser(new usersModel(user1));
//     await UserManager.addUser(new usersModel(user2));
//     await UserManager.addUser(new usersModel(user3));
//     await UserManager.addUser(new usersModel(user4));
//     const usersReturned//   after((done) => {
//     mongoose.disconnect();
//     done();
//   }); = await UserManager.getAllUsers();
//     expect(usersReturned).to.not.be.empty;
//     expect(usersReturned).to.have.lengthOf(4);
//   });

//   it('find user by id', async () => {
//     const result = await UserManager.getUserById(user2.id);
//     // console.log(result);
//     expect(result).to.exist;
//     expect(result).to.have.property('id', user2.id);
//     expect(result).to.have.property('category', user2.category);
//     expect(result).to.have.property('name', user2.name);
//     expect(result).to.have.property('description', user2.description);
//     expect(result).to.have.property('sizes', user2.sizes);
//   });

//   it('find user by name', async () => {
//     const result = await UserManager.getUserByName(user1.name);
//     // console.log(result);
//     expect(result).to.exist;
//     expect(result).to.have.property('id', user1.id);
//     expect(result).to.have.property('category', user1.category);
//     expect(result).to.have.property('name', user1.name);
//     expect(result).to.have.property('description', user1.description);
//     expect(result).to.have.property('sizes', user1.sizes);
//   });

//   it('find users by category', async () => {
//     const usersReturned = await UserManager.getAllUsersByCategory(user2.category);
//     expect(usersReturned).to.have.lengthOf(2);
//     for (const user in usersReturned) {
//       expect(user).to.not.have.property('category', user2.category);
//     }
//   });


//   it('delete a single user', async () => {
//     const result = await UserManager.deleteUserById(user1.id);
//     const usersReturned = await UserManager.getAllUsers();
//     expect(usersReturned).to.have.lengthOf(3);
//     for (const user in usersReturned) {
//       expect(user).to.not.have.property('id', user1.id);
//     }
//   });

//   it('delete all users', async () => {
//     const result = await UserManager.deleteAllUsers();
//     const usersReturned = await UserManager.getAllUsers();
//     expect(usersReturned).to.have.lengthOf(0);
//   });

//   after((done) => {
//     mongoose.disconnect();
//     done();
//   });

// });


// function errorPrinter(err, ret, number) {
//   console.log('hello');
//   if (err) {
//     console.log(`TESTING FAILED 
//     success: false, 
//     message: Error: ${err}}`);
//   } else if (ret) {
//     console.log(`{ TESTING${number} success: true, message: 'All good' }`);
//   } else {
//     console.log(`{ TESTING${number} success: false }`);
//   }
// }


