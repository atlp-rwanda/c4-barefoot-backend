# c1-barefoot-backend
[![Actions Status](https://https://github.com/atlp-rwanda/c4-barefoot-backend/workflows/Barefoot-Nomad-tests/badge.svg)](https://https://github.com/atlp-rwanda/c4-barefoot-backend/actions)

![example branch parameter](https://github.com/actions/c4-barefoot-backend/workflows/Barefoot-Nomad-tests/badge.svg?branch=ft-develop)

>You can find coveralls repo token `.sample-env` file.

## Running the project
* Development mode: ``npm run devStart``
* Production mode: ``npm run start``
## Database migration and seeding
### Creating Migration
Creating migration is done by using `createModel` command. 
This command takes two parameters:
* ``Name`` : the name of the model
* ``attributes``: the list of the model attributes.

To create a model named _``User``_  we have to run:
```ps
npm run createModel -- --name User --attributes Name:string,Email:string
```
This will:

* Create a model file ``user`` in models folder;
* Create a migration file with name like `{time-stamp}-create-user.js` in migrations folder.

### Running migration
Even though we created  a model it is not inserted into the database yet. So to do that we have to run this command:
```ps
npm run migrate
```
This command will create empty ``Users`` table in the database

### Undoing migrations
You have to execute this command: 
```ps
npm run migrate-undo
```
 ## Creating a seed
 In order to insert data into the table created from migration, you have to create a seed.
 To create a seed you have to run this command:
 ```ps
 npm run createSeed -- --name example-user
 ```

 this will create a file called ``{time-stamp}-example-user.js`` in the `seeders` folder.

 So you have to edit it putting in you schema data for a table. The file will that looks like this:
 ```js
 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
 ```
 Here in this file you will have to change data as you want before running the seed.

 ## Running the seed
 we have created a seed file and we have to commit it to the database.

```ps
npm run seed
```

## Undoing seeds
undoing the seeds we have to run this code:
```ps
npm run seed-undo
```
This will undo the recent seed.
To undo all seeds we have to run this:
```ps
npm run seed-undo-all
```
This will undo all seeds committed to the database.
