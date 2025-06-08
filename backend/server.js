const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const blogRoutes = require("./routes/blogRoutes");
const serviceRoutes = require('./routes/serviceRoutes')
const cors = require("cors");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

const connectToMongoDB = async () => {
  try {
  const connectionString = "mongodb+srv://veera:Railand%40Veera@cluster0.fydvm4t.mongodb.net/test";
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToMongoDB();

app.use("/blogs", blogRoutes);
app.use("/services", serviceRoutes);

app.post('/send-email', async (req, res) => {
  const { name, email, phone, message } = req.body;


  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testnodemailerrai@gmail.com', 
      pass: 'Test@Nodemailer@Rai',
      },
    });

    const mailOptions = {
    from: email, 
    to: 'testmail@example.com', 
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

  
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Error sending email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; 