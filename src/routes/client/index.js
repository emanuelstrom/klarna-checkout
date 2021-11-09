const app = require('../../loaders/express-handlebars');

const { createOrder } = require('../../services/server/klarna');



app.get('/', async function (req, res, next) {
	const klarnaCheckout = await createOrder();
	const html_snippet = klarnaCheckout.html_snippet;

	res.render('checkout', {
		klarna_checkout: html_snippet
	});
});

module.exports = app;

