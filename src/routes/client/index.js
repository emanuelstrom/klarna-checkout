const app = require('../../loaders/express-handlebars');

const { createOrder } = require('../../services/server/klarna');



app.get('/checkout/:cart_id', async function (req, res, next) {
	
	const cart_id = req.params.cart_id;
	
	const klarnaCheckout = await createOrder(cart_id);
	
	const html_snippet = klarnaCheckout.html_snippet;

	res.render('checkout', {
		klarna_checkout: html_snippet
	});
});

module.exports = app;

