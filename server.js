const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
require('dotenv').config();


const api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun({ apiKey: api_key, domain: domain });


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    const email= req.body.email;
    const data = {
        from: 'yo boss <s222124488@deakin.edu.au>', 
        to: email,
        subject: 'Welcome to DEV@Deakin!',
        text: 'Thank you for subscribing to DEV@Deakin. We are excited to have you on board!',
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', body);
            res.status(200).send('Welcome email sent successfully!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
