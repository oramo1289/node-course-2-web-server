const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
//carpeta views es la carpeta donde van los archivos de la web es forzosos la carpeta views
//como nodemon no agarra los cambios en los archivos partial de hbs, se escribe
//nodemon server.js -e js,hbs
hbs.registerPartials(__dirname + '/views/partials'); //crea archivos de codigo para que no se repitan en las paginas
app.set('view engine', 'hbs');//convierte los arcivos html en templates y los carga en el browser

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{//'\n' es un <br>
    if (err) {
      console.log('unable to append to server.log');
    }
  });
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));//<= middleware//derecciona los archivos a cargar

hbs.registerHelper('getCurrentyear', ()=>{//two arguments, first its the name of the helper an the second it is the function
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
  //para conseguir esto en el archivo hsb escribe {{nombreHelper argumento}}
});
app.get('/', (req, res) => {
  //  res.send('<h1>Hello express!</h1>');
  /*res.send({
    name:'Oscar',
    liking:[
      'movies',
      'biking',
      'comics'
    ]*/

  res.render('home.hbs', { //carga los archivos
    pageTitle: 'Home Page',
    welcomeM: 'Welcome Message'
  });
});//cuando pasas un objeto por express este lo convierte en JSON y lo muestra en el browser


app.get('/about', (req, res)=>{
  //res.send('about page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res)=>{
  res.render('projects.hbs', {
    pageTitle: 'Portfolio page'
  });
});

app.get('/bad', (req, res)=>{
  res.send({errorMessage:'Unable to fulfill the task'});
});

app.listen(port, ()=>{
  console.log(`the page is ready on port ${port}`);
});//puerto donde se va mostrar la app escribe en el borwser localhost:3000
