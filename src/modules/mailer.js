const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');


const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});
const handlebarsOptions = {
    viewEngine: {
        extName: ".html",
        partialsDir: path.resolve(__dirname, "./src/resources/mail/"),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html'
}

transport.use('compile', hbs(handlebarsOptions));

module.exports = transport;