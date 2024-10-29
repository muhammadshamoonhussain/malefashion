const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // File system module to read and write files
const path = require('path'); // For path handling
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to get products from db.json
app.get('product', (req, res) => {
    // Read the db.json file
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading database' });
        }
        // Parse the JSON data
        const jsonData = JSON.parse(data);
        // Send the products array as the response
        res.json(jsonData.products);
    });
});
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running...');
  });
  

  app.use(bodyParser.json());

  app.post('/db.order', (req, res) => {
    const { name, email, address, orderDetails } = req.body;
  
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail', // یا آپ کی میل سروس جیسے Yahoo, Outlook وغیرہ
      auth: {
        email: 'your-email@gmail.com',
        address: 'your-address',
        postal: 'your-postal',

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
    
// API endpoint to handle contact form submissions
app.post('/contact', (req, res) => {
    const newContact = req.body; // Get the contact data from the request

    // Read the db.json file
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading database' });
        }

        // Parse the JSON data
        const jsonData = JSON.parse(data);
        
        // Assign a new ID to the contact
        newContact.id = new Date().getTime().toString(); // Simple ID generation based on current timestamp

        // Add the new contact to the existing contacts array
        jsonData.contact.push(newContact);

        // Write the updated data back to the db.json file
        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving contact' });
            }
            // Send a success response
            res.status(201).json({ message: 'Contact saved successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
