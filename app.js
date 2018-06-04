const express = require('express');
const xml2js = require('xml2js');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toTimeString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log')
        }
    });

    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//        pageTitle: 'Maintenance Page',
//        welcomeMessage: 'The website is under maintenance'
//    })
//});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome man'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});