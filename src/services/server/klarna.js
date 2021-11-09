import fetch from 'node-fetch';

const BASE_URL = 'https://api.playground.klarna.com';


function getKlarnaAuth() {
    const username = process.env.PUBLIC_KEY;
    const password = process.env.SECRET_KEY;
    const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    return auth;
}

// 1. Add async createOrder function that returns Klarna response.json()

// 2. Add async retrieveOrder function that returns Klarna response.json()

// 3. export createOrder and retrieveOrder below, and use them in api/client/index.js and api/client/confirmation.js

async function createOrder(){
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
        "order_amount": 50000,
        "order_tax_amount": 4545,
        "order_lines": [
            {
                "type": "physical",
                "reference": "19-402-USA",
                "name": "Red T-Shirt",
                "quantity": 5,
                "quantity_unit": "pcs",
                "unit_price": 10000,
                "tax_rate": 1000,
                "total_amount": 50000,
                "total_discount_amount": 0,
                "total_tax_amount": 4545
            }
            ],
        "merchant_urls": {
            "terms": "https://www.example.com/terms.html",
            "checkout": "https://www.example.com/heckout.html",
            "confirmation": "http://localhost:3000/confirmation?order_id={checkout.order.id}",
            "push": "https://www.example.com/api/push"
        }
    }

    const stringifiedJSONBody = JSON.stringify(body);

    const response = 

        /**
         *  MAKE THE REQUEST
         */
        await fetch(
            BASE_URL+path, // URL 
            {
                method: method, // METHOD
                headers: headers, // HEADERS (AUTH)
                body: stringifiedJSONBody // BODY (DATA TO BE SENT
            }
        );

    const res = await response.json();
    return res

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
    return res
}





module.exports = {getKlarnaAuth, createOrder, completedOrder};


