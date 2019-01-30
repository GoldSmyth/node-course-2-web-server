const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials/`);
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        err && console.log('Unable to append to server.log');
    });
    next();
});

app.use(express.static(__dirname+'/public'));

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: "Maintenance Page"
//     });
// });

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home page'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'This was a bad request'
    });
});

app.listen(port, () => {
    console.log(`app is up and running on port ${port}`);
});
