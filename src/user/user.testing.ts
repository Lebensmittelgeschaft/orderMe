import { usersModel } from './user.model';
import { expect } from 'chai';
import * as mocha from 'mocha';
import { IUser } from './user.interface';
import { UserManager } from './user.manager';
import * as mongoose from 'mongoose'; 
import { config } from '../../app';

export const testingUsers = {
  
  user1 : <IUser>{
    id: 201,
    firstName: 'Shahar',
    lastName: 'Yair',
    orders: <[String]>['301', '302'],
    isOfficer: true,
    isAdmin: true,
  },
  
  user2 : <IUser>{
    id: 202,
    firstName: 'Moti',
    lastName: 'Yair',
    orders: <[String]>[''],
    isOfficer: true,
    isAdmin: false,
  },
  
  user3 : <IUser>{
    id: 203,
    firstName: 'Aviva',
    lastName: 'Yair',
    orders: <[String]>[''],
    isOfficer: false,
    isAdmin: true,
  },
  
  user4 : <IUser>{
    id: 204,
    firstName: 'Dror',
    lastName: 'Yair',
    orders: <[String]>[''],
    isOfficer: false,
    isAdmin: false,
  },
  
  user5 :  <IUser>{
    id: 205,
    firstName: 'Shahar',
    lastName: 'Yair',
    orders: <[String]>[''],
    isOfficer: false,
    isAdmin: false,
  },
};

const user1 = testingUsers.user1;
const user2 = testingUsers.user2;
const user3 = testingUsers.user3;
const user4 = testingUsers.user4;
const user5 = testingUsers.user5;

describe('Test Users', () => {
  
  before(async () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/bucketlist', { useMongoClient: true });
  });
  
  it('drop users collection', async () => {
    mongoose.connection.once('connected', () => {
      mongoose.connection.db.dropCollection('users');
    });
    const result = await UserManager.getUserById(testingUsers.user1.id);
    expect(result).to.not.exist;
  });
  
  it('check if user db is empty', async () => {
    const result = await UserManager.getAllUsers();
    expect(result).to.be.empty;
  });
  
  // NOT WORKING
  it('add users to the collection', async () => {
    await UserManager.addUser(new usersModel(user1));
    await UserManager.addUser(new usersModel(user2));
    await UserManager.addUser(new usersModel(user3));
    await UserManager.addUser(new usersModel(user4));
    await UserManager.addUser(new usersModel(user5));
    const usersReturned = await UserManager.getAllUsers();
    expect(usersReturned).to.not.be.empty;
    expect(usersReturned).to.have.lengthOf(5);
  });
  
  it('find user by id', async () => {
    const result = await UserManager.getUserById(user2.id);
    // console.log(result);
    expect(result).to.exist;
    expect(result).to.have.property('id', user2.id);
    expect(result).to.have.property('firstName', user2.firstName);
    expect(result).to.have.property('lastName', user2.lastName);
    expect(result).to.have.property('isAdmin', user2.isAdmin);
    expect(result).to.have.property('isOfficer', user2.isOfficer);
    expect(diffArrays(result.orders, user2.orders)).to.be.true;
  });
  
  it('find user by name', async () => {
    const result = await UserManager.getUserByName(user1.firstName, user1.lastName);
    expect(result).to.have.lengthOf(2);
    
    const res1 = result[0];
    expect(res1).to.exist;
    expect(res1).to.have.property('id', user1.id);
    expect(res1).to.have.property('firstName', user1.firstName);
    expect(res1).to.have.property('lastName', user1.lastName);
    
    const res2 = result[1];
    expect(res2).to.exist;
    expect(res2).to.have.property('id', user5.id);
    expect(res2).to.have.property('firstName', user5.firstName);
    expect(res2).to.have.property('lastName', user5.lastName);
  });
  
  it('update an user by id', async () => {
    const before = await UserManager.getUserById(testingUsers.user2.id);
    
    const newFisrtName = 'Mordechai';
    const newLastName = 'Meiri';
    
    const result = await UserManager.updateUser( 
      testingUsers.user2.id, 
      { firstName: newFisrtName, lastName : newLastName },
    );
    const result2 = await UserManager.getUserById(testingUsers.user2.id);
    expect(result).to.not.have.property('firstName', before.firstName);
    expect(result2).to.have.property('firstName', newFisrtName);
    expect(result).to.not.have.property('lastName', before.newLastName);
    expect(result2).to.have.property('lastName', newLastName);
  });
  
  it('delete a single user', async () => {
    const usersReturnedBefore = await UserManager.getAllUsers();
    const result = await UserManager.deleteUserById(user1.id);
    const usersReturnedAfter = await UserManager.getAllUsers();
    expect(usersReturnedAfter).to.have.lengthOf(usersReturnedBefore.length - 1);
    for (const user in usersReturnedAfter) {
      expect(user).to.not.have.property('id', user1.id);
    }
  });
  
  it('delete all users', async () => {
    const result = await UserManager.deleteAllUsers();
    const usersReturned = await UserManager.getAllUsers();
    expect(usersReturned).to.have.lengthOf(0);
  });
  
  
  after((done) => {
    mongoose.disconnect();
    done();
  });
  
});

function diffArrays(array1, array2) {
  if (array1.length === array2.length) {
    array1.sort();
    array2.sort();
    for (let i = 0 ; i < array1.length ; i += 1) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}




