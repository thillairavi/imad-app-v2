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
    request.send(nul);
    
};