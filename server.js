var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
  user: 'thillairavi',
  database: 'thillairavi',
  host: 'db.imad.hasura.io',
  port: '5432',
  password: process.env.DB_PASSWORD 
};

var app = express();
app.use(morgan('combined'));


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

res.status(40).send('article query');
app.get("articles/:articleName", function(req,res) {
    res.status(40).send('article query');
     pool.query("SELECT * FROM article_w10 WHERE title = '" + req.params.articleName +"'", function(err,result){
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
