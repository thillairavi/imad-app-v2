console.log('Loaded!');
//change text to  new-text
var element = document.getElementById("main-text");
element.innerHTML="new value";

//move the img to right
var img = document.getElementById("madi");
 img.onclick = function(){
     img.style.marginLeft="100px";
    
};