
// Automatic Slideshow - change image every 3 seconds
var myIndex = 0;

//carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 3000);
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var slideIndex = null;


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

showSlides(1);

function showSlides(n) {


  slideIndex = n;
  
  var i;

 var slides = document.getElementsByClassName("mySlides-free-templates");


  if (n > slides.length) {slideIndex = 1}    

  if (n < 1) {slideIndex = slides.length} ;



  for (i = 0; i < slides.length; i++) {

      slides[i].style.display = "none"; 

  }


  slides[slideIndex-1].style.display = "block"; 

}



function showServices(element,n) {

var slides = document.getElementsByClassName("businessservices");



if(element.checked){



  slides[n].style.display = "block"; 


}else{


 slides[n].style.display = "none"; 

var services = slides[n].getElementsByTagName('input');

for (counter = 0; counter < services.length; ++counter) {

services[counter].checked = false;

}



}

}




