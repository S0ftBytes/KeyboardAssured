const assert = require('assert');

class AssuredResponse {

    /**
     * @param {AxiosResponse} response 
     */
    constructor(response){
        this.response = response;
    }

    /**
     * Get the response message
     * 
     * @returns {string} - The message from the response
     */
    getResponseMessage(){
        return this.response.statusText;
    }

    /**
     * Get the response data
     * 
     * @returns {Object} - The response data
     */
    getResponseData() { 
        return this.response.data;
    }

    /**
     * Get the status code from the response
     * 
     * @returns {number} - The status code of the response
     */
    getStatusCode(){
        return this.response.status;
    }

    /**
     * Get the headers from the response
     * 
     * @returns {Object} - The headers of the response
     */
    getResponseHeaders() {
        return this.response.headers;
    }

    /**
     * Expect a specific response code
     * 
     * @param {number} expectedCode - The expected response code
     * @returns {AssuredResponse} - The current instance of AssuredResponse
     */

    expectCode(expectedCode) {
        const code = this.getStatusCode();

        assert.equal(code, expectedCode, `Expected status code ${expectedCode}, but got ${code}`);

        return this;
    }

    /**
     * Expect the response to have a header with the given name and value
     * 
     * @param {string} headerName - The name of the header to expect
     * @param {string} headerValue - The value of the header to expect
     * 
     * @returns {AssuredResponse} - The current instance of AssuredResponse
     */
    expectHeader(header, expectedValue) {
        const headers = this.getResponseHeaders();

        assert.equal(headers[header], expectedValue, `Expected header ${header} to be ${expectedValue}, but got ${headers[header]}`);

        return this;
    }

    /**
     * Expect the supplied property to have a specific value within the response body
     * 
     * @param {string} expectedProp - The property to assert against
     * @param {Any} expectedValue - The value to assert against
     * 
     * @returns {AssuredResponse} - The current instance of AssuredResponse
     */

    expectValue(expectedProp, expectedValue) {
        const body = this.getResponseData();

        const assertedProp = body[expectedProp];
        assert.equal(assertedProp, expectedValue, `Expected ${expectedProp} to have the value ${expectedValue}, but got ${assertedProp}`);

        return this;
    }

    /**
     * Expect a specific prop in the response body
     * 
     * @param {String} expectedProp - The prop to check for
     * @returns {AssuredResponse} - The current instance of AssuredResponse
     */

    expectToIncludeProp(expectedProp) {
        const body = this.getResponseData();

        assert.doesNotMatch(body[expectedProp], undefined, `Expected ${expectedProp} to be included in the response body, but it was not`)

        return this;
    }

    /**
     * Checks if the data type of the response body is correct
     * 
     * @param {String} expectedType - The expected data type of the response body
     * @returns {AssuredResponse} - The current instance of AssuredResponse
     */

    expectDataType(expectedType) {
        const body = this.getResponseData();

        const dataType = typeof body;
        assert.equal(dataType, expectedType, `Expected the response data to have the type of ${expectedType}, but got ${dataType}`);

        return this;
    }

    /**
     * Checks if the response message is equal to the expected message
     * 
     * @param {String} expectedMessage - Expected message asserted against the response message
     * @param {Boolean} strict - Strict assertion, if true, the expected message must be equal to the response message, if false, the expected message must be included in the response message
     * @returns {AssuredResponse} - Returns the assured response object
     */

    expectMessage(expectedMessage, strict = true) {
        const message = this.getResponseMessage();

        strict ? 
            assert.equal(message, expectedMessage, `Expected the response message to be ${expectedMessage}, but got ${message}`) :
            assert.equal(true, message.includes(expectedMessage), `Expected the response message to contain ${expectedMessage}, but it did not`)

        return this;
    }
}

module.exports = AssuredResponse;