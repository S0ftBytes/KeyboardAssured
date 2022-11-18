class AssuredRequest {

    constructor(route, requestHeaders, requestBody) {
        this.route = route;
        this.requestHeaders = requestHeaders;
        this.requestBody = requestBody;
    }

    constructor(route) {
        this.route = route;
    }

    setHeaders(requestHeaders) {
        this.requestHeaders = requestHeaders;
    }

    getHeaders() { return this.requestHeaders; }

    setBody(requestBody) {
        this.requestBody = requestBody; 
    }

    getBody() { 
        return this.requestBody; 
    }

    setRoute(route) {
        this.route = route;
    }
    
}

export default AssuredRequest;