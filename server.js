const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions to read and write to db.json
const readDb = () => {
    const data = fs.readFileSync(path.join(__dirname, 'src/assets/db.json'), 'utf8');
    return JSON.parse(data);
};

const writeDb = (data) => {
    fs.writeFileSync(path.join(__dirname, 'src/assets/db.json'), JSON.stringify(data, null, 2));
};

// API endpoint to get all products
app.get('/products', (req, res) => {
    try {
        const products = readDb();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error reading products' });
    }
});

// API endpoint to get a specific product
app.get('/products/:id', (req, res) => {
    try {
        const products = readDb();
        const product = products.find(p => p.id === req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Error reading product' });
    }
});

// API endpoint to add a new product
app.post('/products', (req, res) => {
    try {
        const products = readDb();
        const newProduct = { id: Date.now().toString(), ...req.body };
        products.push(newProduct);
        writeDb(products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// API endpoint for order submissions
app.post('/order', (req, res) => {
    const { name, email, address, orderDetails } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password' // Replace with your email password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Order Placed Successfully',
        text: `Hi ${name},\nYour order has been placed successfully!\nOrder Details: ${orderDetails}\nShipping Address: ${address}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// API endpoint for contact form submissions
app.post('/contact', (req, res) => {
    const newContact = req.body;

    try {
        const jsonData = readDb();
        newContact.id = new Date().getTime().toString();
        jsonData.contact.push(newContact);

        writeDb(jsonData);
        res.status(201).json({ message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving contact' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
