var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

var port = 3000;
app.listen(port);

//create mysql connection

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'new_password',
    database:'movie_planner_db'

});

connection.connect(function(err){
    if(err)throw err;
    console.log('Connected as id: ' + connection.threadID);
})


app.get('/', function(req,res){
    connection.query('SELECT * FROM movies;',function(err,data){
        res.render('index',{movies:data});
    })
})

app.post('/create', function(req,res){
    connection.query('INSERT INTO movies (movie) VALUES(?);', [req.body.movie], function(err,result){
        if(err)throw(err);
        res.redirect('/');
    })
})