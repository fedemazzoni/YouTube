import axios from 'axios';
const KEY = 'AIzaSyDQy795U5vYKa2eHgq4jt4RNlGQL0R8zNk';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        key: KEY
    }
})