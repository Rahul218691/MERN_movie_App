const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient();

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);



module.exports = {
	GET_ASYNC,
	SET_ASYNC
}