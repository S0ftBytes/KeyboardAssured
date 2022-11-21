# Keyboard Assured

Lightweight NodeJS package designed for testing REST-APIs, support for Mocha.

Keyboard Assured was created to be easy to use within your test automation pack(s), and
potentially also save your Keyboard from eternal head banging due to sync related issues (*Looking at you RestAssured*).

## Installation with Mocha

`npm i --save-dev keyboard-assured mocha`

## Usage example

```js
const KeyBoardAssured = require('keyboard-assured');
const assert = require('assert')

const keyBoardAssured = new KeyBoardAssured('http://localhost:5000/');
describe('Example mocha test with KeyboardAssured', () => {
    it('should get back 201 and a success message', async () => {
        const request = keyBoardAssured.createRequest('cars');

        return request
        .setBody({ manufacturer: "Audi", model: "R8" })
        .post()
        .then((response) => {
            response.expectCode(201);
            assert.equal(response.getResponseMessage(), "Successfully added the car 'Audi, R8'!");
        })
    })
})
```
