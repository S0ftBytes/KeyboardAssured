import AssuredRequest from './AssuredRequest';

class KeyboardAssured {

    constructor(baseURL) {
        this.baseURL = baseURL;
        global.baseURL = baseURL;
    }

    setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }

    setShouldAwaitResponse(shouldAwait) {
        this.shouldAwait = shouldAwait;
    }

    getShouldAwaitResponse() { return this.shouldAwait; }

    getBaseURL() { return this.baseURL; }

    createRequest(route) {
        return new AssuredRequest(this, route);
    }

    createRequest(route, requestHeaders, requestBody) {
        return new AssuredRequest(this, route, requestHeaders, requestBody);
    }
}

export default KeyboardAssured;