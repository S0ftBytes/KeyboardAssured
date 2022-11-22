const axios = require('axios');
const AssuredResponse = require('./AssuredResponse');

class AssuredRequest {

    /**
     * @param {KeyboardAssured} keyboardAssured - The KeyboardAssured instance
     * @param {String} route - The route of the API being tested
     */

    constructor(keyboardAssured, route) {
        this.keyboardAssured = keyboardAssured;
        this.route = route;
    }

    /**
     * Set the request headers
     * 
     * @param {Object} requestHeaders - The request headers
     * @returns {AssuredRequest} - The current instance of AssuredRequest
     */

    setHeaders(requestHeaders) {
        this.requestHeaders = requestHeaders;

        return this;
    }

    /**
     * Get the current headers
     * 
     * @returns {Object} - The current headers
     */

    getHeaders() { return this.requestHeaders; }

    /**
     * Set the request body
     * 
     * @param {Object} requestBody - The request body
     * @returns {AssuredRequest} - The current instance of AssuredRequest
     */

    setBody(requestBody) {
        this.requestBody = requestBody; 

        return this;
    }

    /**
     * Get the request body
     * 
     * @returns {Object} - The request body
     */

    getBody() { 
        return this.requestBody; 
    }

    /**
     * Set the request route
     * 
     * @param {String} route - The route of the request
     * @returns {AssuredRequest} - The current instance of AssuredRequest
     * */

    setRoute(route) {
        this.route = route;

        return this;
    }

    /**
     * Get the route of the request
     * 
     * @returns {String} - The route of the request
     */

    getRoute() { return this.route; }

    /**
     * Get the URL for the request
     * 
     * @returns {String} - The URL for the request
     */

    getURL() { return this.keyboardAssured.getBaseURL() + this.route; }

    /**
     * Has the request resolved?
     * 
     * @returns {Boolean} - Whether the request has resolved
     */

    hasResolved(){
        return this.pendingResponse?.isFullfilled();
    }

    /**
     * Send off the request using the POST method
     * 
     * @returns {AssuredResponse} - The response of the request
     */

    async post() {
        this.pendingResponse = axios.post(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    /**
     * Send off the request using the GET method
     * 
     * @returns {AssuredResponse} - The response of the request
     */

    async get() {
        this.pendingResponse = axios.get(this.getURL(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }
    
    /**
     * Send off the request using the DELETE method
     * 
     * @returns {AssuredResponse} - The response of the request
     */

    async delete(){
        this.pendingResponse = axios.delete(this.getURL(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    /**
     * Send off the request using the PUT method
     * 
     * @returns {AssuredResponse} - The response of the request
     */

    async put() {
        this.pendingResponse = axios.put(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

    /**
     * Send off the request using the PATCH method
     * 
     * @returns {AssuredResponse} - The response of the request
     */

    async patch() {
        this.pendingResponse = axios.patch(this.getURL(), this.getBody(), this.getHeaders());

        return new AssuredResponse(await this.pendingResponse);
    }

}

module.exports = AssuredRequest;