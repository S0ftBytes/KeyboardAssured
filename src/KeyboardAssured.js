import chai from 'chai';
import axios from 'axios';
import AssuredRequest from './AssuredRequest';

class KeyboardAssured {

    constructor(baseURL) {
        if(baseURL !== undefined) this.baseURL = baseURL;
    }

    setBaseURL(baseURL) {
        this.baseURL = baseURL;
    }

    getBaseURL() { return this.baseURL; }
}

export default KeyboardAssured;