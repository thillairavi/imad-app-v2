var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
  user: 'thillairavi',
  database: 'thillairavi',
  host: 'db.imad.hasura.io',
  port: '5432',
  password: process.env.DB_PASSWORD 
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
    
}));


var articles = { 
   'article-one' : { 
    title: 'Article One /ThillaiRavi',
    heading: 'Article One',
    date: 'Feb 16 2017',
    content: ` 
           <p>
                
                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
           </p>
           <p>
                
                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
                
            </p>
             
           <p>
                
                     This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
                
            </p> `
    },
   'article-two' : {
    title: 'Article Two /ThillaiRavi',
    heading: 'Article Two',
    date: 'Feb 16 2017',
    content: ` 
           <p>
               
                     This is the content for my second article.
            </p> `
    },
   'article-three' : { 
    title: 'Article Three /ThillaiRavi',
    heading: 'Article Three',
    date: 'Feb 16 2017',
    content: ` 
           <p>
               
                     This is the content for my third article.
            </p> `
    }
} ;       
   
function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    

var htmlTemplate =`
   <HTML>
    <head>
        <title>
           ${title};    
        </title>
        <meta name='vienport' content='width=device-width, initial-scale=1' />
        <link href="/ui/style.css" rel="stylesheet" />

    </head>
    <body>
      <div class='container'>   
        <div>
            <a href = '/'> Home</a>
        </div>
        <h3>
            ${heading};
        </h3>
        <div>
            ${date};
            
        </div>
        <div>
           ${content}  
            
        </div>
      </div>         
    </body>
</HTML>
 
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('SELECT * FROM id', function(err,result){
        if(err){
         res.status(500).send(err,toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
 
 
});

function hash(input, salt) {
    
     var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
     return['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this is random string');
    res.send(hashedString);
});


app.post('/create-user', function (req, res) {
    
    var username = req.body.username;
    var password = req.body.password;
    
   // var salt = crypto.randomBytes(128).tostring('hex');
    var dbString = hash(password, "this is random");
    
     pool.query('INSERT INTO  "user1" (username, password) VALUES ($1,$2)', [username,dbString] , function(err,result){
        if(err){
         res.status(500).send(err,toString());
        }
        else{
            res.send('User sucessfully created:' +username);
            
        }
    });
    
    
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user1" WHERE username = $1', [username], function (err, result){
    if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0){
                res.status(403).send('username/password is invalid');
                } else {
                    // Match the password
                    var dbString = result.rows[0].password;
                    var salt = dbString.split('$')[2];
                    var hashedPassword = hash(password, salt); // creating a hash based on the password submitted and the original salt 
                    if (hashedPassword === dbString) {
                // set the session
                        req.session.auth = {userId: result.rows[0].id};
                        // abcd efghijklm set cookie with a server side, 
                        // internally, on the server side , it maps the session id to an object
                        // {auth: {userId}}
                         res.send('credentials correct !');
                    } else {
                        res.status(403).send('username/password is invalid');
                    }
                    
                    
                } 
        }
});
});


app.get('/check-login',function(req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
        res.send('you are logged in: ' + req.session.auth.userId.toString());
    } else {
        res.send('you are not logged in');
    }
    
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('Logged Out!!');
});


var counter= 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names= [];
app.get('/submit-name', function (req, res) {
    var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var pool = new Pool(config);
app.get("/articles/:articleName", function(req,res) {
   
     pool.query("SELECT * FROM article_w10 WHERE title = '' + req.params.articleName +''", function(err,result){
        if(err){
         res.status(500).send(err,toString());
        }
        else if (result.rows.length===0){
         res.status(404).send('article not found');
        }
        else{
            var articleData= result.rows[0];
            res.send(createTemplate(articles[articleData]));
            
        }
    });
    
   
   
});

app.get('/article-two', function(req,res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req,res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
