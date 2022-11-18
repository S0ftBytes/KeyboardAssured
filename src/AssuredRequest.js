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
    
}

export default AssuredRequest;