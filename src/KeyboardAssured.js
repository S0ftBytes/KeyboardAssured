const AssuredRequest = require('./AssuredRequest');

class KeyboardAssured {

    /**
     * @param {String} baseURL - The base URL of the API
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Sets the base URL of the API
     * 
     * @param {String} baseURL - New base URL
     */

    setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }

    /**
     * Get the base URL of the API
     * 
     *  @returns {String} - The base URL of the API
     */

    getBaseURL() { return this.baseURL; }


    /**
     * Create a new AssuredRequest instance
     * 
     * @param {String} route - The route of the request
     * @returns {AssuredRequest} - The new AssuredRequest instance
     */

    createRequest(route) {
        return new AssuredRequest(this, route);
    }

}

module.exports = KeyboardAssured;