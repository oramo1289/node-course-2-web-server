//Servidor simple

const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home.hbs', { //carga los archivos
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeM: 'Welcome Message'
  });
});

// app.get('/about', (req, res)=>{
//   //res.send('about page');
//   res.render('about.hbs', {
//     pageTitle: 'About Page',
//     currentYear: new Date().getFullYear()
//   });
// });

app.get('/bad', (req, res)=>{
  res.send(
    {
    errorMessage:'Unable to fulfill the task'
    }
  );
});

app.listen(3000, ()=>{
  console.log('the page is ready on port 3000');
});
