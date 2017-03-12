console.log('Loaded!');
//change text to  new-text
//var element = document.getElementById("main-text");
//element.innerHTML= "new value";

//move the img to right
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
   marginLeft = marginLeft + 1;
   img.style.marginLeft = marginLeft + "px";
    
}
 img.onclick = function(){
     var interval= setInterval(moveRight, 50);
    
};

/*
//Code for counter
var button = document.getElementById("counter");
var counter = 0;
button.onclick = function() {
    //Make a request 
    var request= new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take action
            if(request.status === 200){
                var counter= request.responseText;
                var span = document.getElementById("count");
                //Render the variavle in the correct span
                span.innerHTML= counter.toString();
            }
          
        }
          //else not yet
    };
    
    // make a request
    request.open("GET", "http://thillairavi.imad.hasura-app.io/counter", true);
    request.send(null);
};
*/


//print the name when press submit
var submit= document.getElementById("submit_btn");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    console.log(username);
    console.log(password);

submit.onclick = function(){
    //Make a request 
    var request= new XMLHttpRequest();
     request.open("POST", "http://thillairavi.imad.hasura-app.io", true);
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        alert("request");
        if(request.readyState === XMLHttpRequest.DONE){
            alert(request.status);
            //Take action
            if(request.status === 200){
                alert("Logged in successfully");
            }
            else if(request.status === 403){
                alert("username/password incorrect");
            }
            else if(request.status === 500){
                alert("something went wrong in the server");
            }    
                
            
          
        }
        //else {
       //         alert("cannot login");
        
        //}
    };
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    console.log(username);
    console.log(password);
    // make a request
    request.open("POST", "http://thillairavi.imad.hasura-app.io", true);
    request.setRequestHeader('Content-Type' , '/application/json');
    request.send(JSON.stringify({username: username, password:password}));
};



/*
//print the name when press submit
var submit= document.getElementById("submit-btn");

submit.onclick = function(){
    //Make a request 
    var request= new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //Take action
            if(request.status === 200){
                var names= request.responseText;
                names= JSON.parse(names);
                var list= '';
                for(var i=0; i< names.length; i++)
                 list+= '<li>' + names[i] + '</li>';
                var ul = document.getElementById("name");
                 ul.innerHTML= list;
                
            }
          
        }
          //else not yet
    };
    var nameInput = document.getElementById("name");
    var name= nameInput.value;
    // make a request
    request.open("GET", "https://thillairavi.imad.hasura-app.io/submit-name?name=" + name, true);
    request.send(null);
};
*/
