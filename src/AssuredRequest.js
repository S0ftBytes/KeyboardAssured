import axios from 'axios';

class AssuredRequest {

    constructor(keyboardAssured, route, requestHeaders, requestBody) {
        this.keyboardAssured = keyboardAssured;
        this.route = route;
        this.requestHeaders = requestHeaders;
        this.requestBody = requestBody;
    }

    constructor(keyboardAssured, route) {
        this.keyboardAssured = keyboardAssured;
        this.route = route;
    }

    setHeaders(requestHeaders) {
        this.requestHeaders = requestHeaders;

        return this;
    }

    getHeaders() { return this.requestHeaders; }

    setBody(requestBody) {
        this.requestBody = requestBody; 

        return this;
    }

    getBody() { 
        return this.requestBody; 
    }

    setRoute(route) {
        this.route = route;

        return this;
    }

    getRoute() { return this.route; }

    getURL() { return this.keyboardAssured.getBaseURL() + this.route; }

    async post() {
        this.pendingResponse = axios.post(this.getURL(), this.getBody(), this.getHeaders());

        if(this.keyboardAssured.getShouldAwaitResponse()) await this.pendingResponse;
        return this;
    }

    async get() {
        this.pendingResponse = axios.get(this.getURL(), this.getHeaders());

        if(this.keyboardAssured.getShouldAwaitResponse()) await this.pendingResponse;
        return this;
    } 

    async delete(){
        this.pendingResponse = axios.delete(this.getURL(), this.getHeaders());

        if(this.keyboardAssured.getShouldAwaitResponse()) await this.pendingResponse;
        return this;
    }

    async put() {
        this.pendingResponse = axios.put(this.getURL(), this.getBody(), this.getHeaders());

        if(this.keyboardAssured.getShouldAwaitResponse()) await this.pendingResponse;
        return this;
    }

    async patch() {
        this.pendingResponse = axios.patch(this.getURL(), this.getBody(), this.getHeaders());

        if(this.keyboardAssured.getShouldAwaitResponse()) await this.pendingResponse;
        return this;
    }

    getResponse() { return this.pendingResponse; }

    async getResponseData() { 
        if(this.pendingResponse === undefined) return;
        if(this.pendingResponse?.isFullfilled()) return this.pendingResponse.data;
        
        return await this.pendingResponse.then((response) => {
            return response.data;
        })
    }

    async getStatusCode(){
        if(this.pendingResponse === undefined) return;

        const response = await this.getResponse();

        return response.status;
    }

    async getResponseHeaders() {
        if(this.pendingResponse === undefined) return;

        const response = await this.getResponse();

        return response.headers;
    }

    async expectCode(expectedCode) {
        const code = await this.getStatusCode();

        if(code !== expectedCode) throw new Error(`Expected status code ${expectedCode}, but got ${code}`);

        return this;
    }

    async expectHeader(header, expectedValue) {
        const headers = await this.getResponseHeaders();

        if(headers[header] !== expectedValue) throw new Error(`Expected header ${header} to be ${expectedValue}, but got ${headers[header]}`);

        return this;
    }

    async expectValue(expectedProp, expectedValue) {
        const body = await this.getResponseData();

        const assertedProp = body[expectedProp];
        if(assertedProp !== expectedValue) throw new Error(`Expected ${expectedProp} to have the value ${expectedValue}, but got ${assertedProp}`);

        return this;
    }

    async expectToIncludeProp(expectedProp) {
        const body = await this.getResponseData();

        if(body[expectedProp] === undefined) throw new Error(`Expected ${expectedProp} to be included in the response body, but it was not`);

        return this;
    }

    
}

export default AssuredRequest;