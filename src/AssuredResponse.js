const assert = require('assert');

class AssuredResponse {
    constructor(response){
        this.response = response;
    }

    getResponseMessage(){
        return this.response.statusText;
    }

    getResponseData() { 
        return this.response?.data;
    }

    getStatusCode(){
        return this.response.status;
    }

    getResponseHeaders() {
        return this.response.headers;
    }

    expectCode(expectedCode) {
        const code = this.getStatusCode();

        assert.equal(code, expectedCode, `Expected status code ${expectedCode}, but got ${code}`);

        return this;
    }

    expectHeader(header, expectedValue) {
        const headers = this.getResponseHeaders();

        assert.equal(headers[header], expectedValue, `Expected header ${header} to be ${expectedValue}, but got ${headers[header]}`);

        return this;
    }

    expectValue(expectedProp, expectedValue) {
        const body = this.getResponseData();

        const assertedProp = body[expectedProp];
        assert.equal(assertedProp, expectedValue, `Expected ${expectedProp} to have the value ${expectedValue}, but got ${assertedProp}`);

        return this;
    }

    expectToIncludeProp(expectedProp) {
        const body = this.getResponseData();

        assert.doesNotMatch(body[expectedProp], undefined, `Expected ${expectedProp} to be included in the response body, but it was not`)

        return this;
    }

    expectDataType(expectedType) {
        const body = this.getResponseData();

        const dataType = typeof body;
        assert.equal(dataType, expectedType, `Expected the response data to have the type of ${expectedType}, but got ${dataType}`);

        return this;
    }
}

module.exports = AssuredResponse;