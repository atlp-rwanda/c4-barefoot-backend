
# c4-barefoot-backend

![CI/ CD Build](https://github.com/atlp-rwanda/c4-barefoot-backend/workflows/Build/badge.svg) [![Maintainability](https://api.codeclimate.com/v1/badges/77747358b84994c029a5/maintainability)](https://codeclimate.com/github/atlp-rwanda/c4-barefoot-backend/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/77747358b84994c029a5/test_coverage)](https://codeclimate.com/github/atlp-rwanda/c4-barefoot-backend/test_coverage)

>You can find environment variables and coveralls repo token in `.sample-env` file. Make sure you have all required environment variables in your .env file before you start Running this project locally. 

## Database migration and seeding
### Running migration
You have to execute this command: 
```ps
npm run migrate
```
This command will create all empty tables defined in migrations folder in the database

### Undoing migrations
You have to execute this command: 
```ps
npm run migrate-undo
```
 ## Running the seed
 we have created a seed file and we have to commit it to the database.

```ps
npm run seed
```

## Undoing seeds
You have to execute this command: 
```ps
npm run seed-undo
```
This will undo the recent seed.
To undo all seeds we have to run this:
```ps
npm run seed-undo-all
```
This will undo all seeds committed to the database. NB: Doing this will delete all data you have in the Database,so do it when you know what you are doing

## Running the project
* Development mode: ``npm run dev``
* Production mode: ``npm run start``
