const connect = require('connect');
const url = require('url');

const app = connect();

function calculate(req, res) {
	const urlParts = url.parse(req.url, true);
	const query = urlParts.query;

	const method = query.method;
	const x = parseFloat(query.x);
	const y = parseFloat(query.y);

	let result;

	switch (method) {
		case 'add':
			result = x + y;
			break;
		case 'subtract':
			result = x - y;
			break;
		case 'multiply':
			result = x * y;
			break;
		case 'divide':
			result = x / y;
			break;
		default:
			res.end('Invalid method');
			return; // Important to exit the function here
	}

	res.end(`${x} ${method} ${y} = ${result}`);
}

app.use('/lab03', calculate);
app.listen(3000, () => {
	console.log('Server running at http://localhost:3000/lab03');
});
