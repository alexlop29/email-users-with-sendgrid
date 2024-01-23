# About

## Getting Started

```
docker-compose up --build -d
docker-compose down
```

### 🔧 Core libraries

- [Node 20.11.0](https://nodejs.org/en)
- [Mongoose ODM](https://mongoosejs.com)
- [Express.js]

### 💻 Development Libraries

- [eslint](https://eslint.org/)
- [Jest](https://jestjs.io)
- [Prettier](https://prettier.io/)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [Typescript](https://www.typescriptlang.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
- [Sinon.js](https://www.npmjs.com/package/sinon)
- [Validator.js]()
- [nodemon]()

### Types

- @types/sinon
- @types/validator
- @types/express

## Additional Reading

- https://stackoverflow.com/questions/11318972/stubbing-a-mongoose-model-with-sinon
- https://getsimple.works/how-to-stub-mongoose-methods-and-mock-document-objects

- https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
- https://validatejs.org/#validators-presence
- https://www.npmjs.com/package/validatorjs
- https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#email-address-validation

## Left Off
- Need to be able to use globalSetup and globalTeardown only
when running integration tests, and not unit tests!!!
- Running unit tests for the user class
- Running integration tests for the user class

```
jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/integration/ --forceExit
```
