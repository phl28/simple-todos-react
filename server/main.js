import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

const insertTask = ( taskText, user ) => 
  TasksCollection.insert({ 
    text: taskText, 
    userId: user._id, 
    createdAt: new Date() 
  });

const SEED_USERNAME = 'meteorite';
const SEET_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEET_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(taskText => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: '95153c3f41682be5cf9f',
      secret: 'e453ba5d36ce5a6c018021353573ea55077eb79e',
    },
  }
);