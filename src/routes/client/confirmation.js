const app = require('../../loaders/express-handlebars');

const { completedOrder } = require('../../services/server/klarna');

app.get('/confirmation', async function (req, res, next) {
    const order_id = req.query.order_id;
    const completeOrder = await completedOrder(order_id);
    const html_snippet = completeOrder.html_snippet
    res.send(html_snippet);


});

module.exports = app;