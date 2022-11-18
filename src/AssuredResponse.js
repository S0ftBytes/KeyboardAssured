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

        if(code !== expectedCode) throw new Error(`Expected status code ${expectedCode}, but got ${code}`);

        return this;
    }

    expectHeader(header, expectedValue) {
        const headers = this.getResponseHeaders();

        if(headers[header] !== expectedValue) throw new Error(`Expected header ${header} to be ${expectedValue}, but got ${headers[header]}`);

        return this;
    }

    expectValue(expectedProp, expectedValue) {
        const body = this.getResponseData();

        const assertedProp = body[expectedProp];
        if(assertedProp !== expectedValue) throw new Error(`Expected ${expectedProp} to have the value ${expectedValue}, but got ${assertedProp}`);

        return this;
    }

    expectToIncludeProp(expectedProp) {
        const body = this.getResponseData();

        if(body[expectedProp] === undefined) throw new Error(`Expected ${expectedProp} to be included in the response body, but it was not`);

        return this;
    }

    expectDataType(expectedType) {
        const body = this.getResponseData();

        const dataType = typeof body;
        if(dataType !== expectedType) throw new Error(`Expected the response data to have the type of ${expectedType}, but got ${dataType}`);
    }
}

module.exports = AssuredResponse;