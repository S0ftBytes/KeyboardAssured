const axios = require('axios');
const AssuredResponse = require('./AssuredResponse');

class AssuredRequest {

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

    hasResolved(){
        return this.pendingResponse?.isFullfilled();
    }

    async post() {
        this.pendingResponse = axios.post(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    async get() {
        this.pendingResponse = axios.get(this.getURL(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    } 

    async delete(){
        this.pendingResponse = axios.delete(this.getURL(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    async put() {
        this.pendingResponse = axios.put(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    async patch() {
        this.pendingResponse = axios.patch(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

}

module.exports = AssuredRequest;