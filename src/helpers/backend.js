import Vue from 'vue';
import axios from 'axios';

const localApiDevUrl = 'http://18.225.37.152:8080/api/';
axios.defaults.baseURL = localApiDevUrl;
axios.defaults.timeout = 5000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;
axios.defaults.headers.common.Accept = 'application/json';

const token = localStorage.idToken ? localStorage.idToken : null;

const $backend = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

if (token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}
$backend.$loginHandle = payload => (
  $backend.post('/auth/signin/', payload)
    .then(response => response.data)
);

export default $backend;
