import fetch from 'node-fetch';

const { fakeStoreToKlarnaCart } = require('./fakestore')

const getCarts = require('../../static/carts')
const BASE_URL = 'https://api.playground.klarna.com';


function getKlarnaAuth() {
    const username = process.env.PUBLIC_KEY;
    const password = process.env.SECRET_KEY;
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    return auth;
}



function formatCart(currentCart) {
    currentCart.forEach((cartItem) => {
        cartItem.total_amount = cartItem.quantity * cartItem.unit_price;
        cartItem.total_tax_amount = cartItem.total_amount - cartItem.total_amount * 10000 / (10000 + cartItem.tax_rate);
    });
    return currentCart;
}



// 1. Add async createOrder function that returns Klarna response.json()

// 2. Add async retrieveOrder function that returns Klarna response.json()

// 3. export createOrder and retrieveOrder below, and use them in api/client/index.js and api/client/confirmation.js

async function createOrder(fakeStoreCart){

    const currentCart = fakeStoreToKlarnaCart(fakeStoreCart);
    const formattedCart = formatCart(currentCart);
    
    let order_amount = 0;
    let order_tax_amount= 0;
    

    formattedCart.forEach((currentCartItem) =>{
        order_amount += currentCartItem.total_amount;
        order_tax_amount += currentCartItem.total_tax_amount;
    });

    const SHIPPING_LIMIT = 500 * 100;
    const SHIPPING_PRICE = 39 * 100;

    let shipping_options = [{
        "id": "express_priority",
        "name": "EXPRESS 1-2 Days",
        "price": 0,
        "tax_amount": 0,
        "tax_rate": 0,
    }];
    if (order_amount < SHIPPING_LIMIT) {
        shipping_options[0].price = SHIPPING_PRICE;
    }

    console.log(order_amount, SHIPPING_LIMIT)


    
    const method = "POST";
    const path = '/checkout/v3/orders';
    const auth = getKlarnaAuth();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth
    };


    const body = {
        "purchase_country": "SE",
        "purchase_currency": "SEK",
        "locale": "sv-SE",
        "order_amount": order_amount,
        "order_tax_amount": order_tax_amount,
        "order_lines": formattedCart,
        "merchant_urls": {
            "terms": "https://www.example.com/terms.html",
            "checkout": "https://www.example.com/checkout.html",
            "confirmation": `${process.env.CONFIRMATION_URL}/confirmation?order_id={checkout.order.id}`,
            "push": "https://www.example.com/api/push"
        }, 
        "shipping_options": shipping_options,
    }

    const stringifiedJSONBody = JSON.stringify(body);

    const response = await fetch(BASE_URL+path, {
        method, 
        headers, 
        "body": stringifiedJSONBody 
    });


    const res = await response.json();

     // "200" is success from Klarna KCO docs
    if (response.status === 200 || response.status === 201) {
        return res
    } else {
        console.error("ERROR:", res)
        return {
            html_snippet: `<h1>${JSON.stringify(res)}</h1>`
        }
    }


}

// Completed order

async function completedOrder(orderId){
    const method = "GET";
    const path = `/checkout/v3/orders/${orderId}`;
    const auth = getKlarnaAuth();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': auth
    };

    const response = 

        /**
         *  MAKE THE REQUEST
         */
        await fetch(
            BASE_URL+path, // URL 
            {
                method: method, // METHOD
                headers: headers, // HEADERS (AUTH)
            }
        );
        
    const res = await response.json();

    if (response.status === 200 || response.status === 201) {
        return res
    } else {
        console.error("ERROR: ", response.status, response.statusText);
        return {
            html_snippet: `<h1>${response.status} ${response.statusText}</h1>`
        }
    }

}





module.exports = {getKlarnaAuth, createOrder, completedOrder};


