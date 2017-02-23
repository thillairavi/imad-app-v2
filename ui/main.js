console.log('Loaded!');
//change text to  new-text
var element = document.getElementById("main-text");
element.innerHTML="new value";

//move the img to right
var img = document.getElementById("madi");
var marginLeft= 0;
function moveRight(){
   marginLeft= marginLeft + 10;
   img.style.marginLeft= marginLeft +"px";
    
}
 img.onclick = function(){
     var interval=setInerval(moveRight,100);
    
};