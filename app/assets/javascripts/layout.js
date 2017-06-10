$('.current-account .dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
});

$(document).on('click', 'a.box-background', function(event){
  // Add smooth scrolling to all links in navbar

// Prevent default anchor click behavior
event.preventDefault();

// Store hash
var hash = this.hash;

// Using jQuery's animate() method to add smooth page scroll
// The optional number (900) specifies the number of milliseconds it takes    to scroll to the specified area
 $('html, body').animate({
   scrollTop: $(hash).offset().top
 }, 1600, 'easeInOutCubic', function(){

  // Add hash (#) to URL when done scrolling (default click behavior)
  // window.location.hash = hash;
 });
 })