 import express from 'express'
 import path from 'path'
 import { fileURLToPath } from 'url';
 import nodemailer from 'nodemailer'

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);

 const app = express();
 const port = process.env.PORT || 3000;

 app.use(express.static(path.join(__dirname)));
 app.use(express.json());

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/send-email', async (req, res) => {
    const {name,email,phone, subject, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'Gmail', 'Yahoo', 'Outlook'
        auth: {
            user: 'infomicroplastwovens@gmail.com', // your email address
            pass: 'kszf ecjz nmyq xbti'  ,    // your email password or app password
        },
    });

    // Email data
    const mailOptions = {
        from: 'infomicroplastwovens@gmail.com',
        to: `tanishqbakka1@gmail.com`,
        subject: `${subject}`,
        text: `${name} , ${email} , ${phone}, \n ${subject} \n ${message}`          // plaintext body
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.redirect('/');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

 app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
 });


