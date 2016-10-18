/* Handle basic navigation using taps */

(function() {

  var page = 0;

  window.addEventListener("click", (function(e) {        
    var clickX = e.pageX;
    console.log("Click detected at: "+clickX);
    console.log((window.innerWidth*page)+(window.innerWidth/2));
    if (clickX > (window.innerWidth*page)+(window.innerWidth/2)) {
      page = page+1;
      document.body.scrollLeft = page*(window.outerWidth);
    } else {
      if (page>0) page = page-1;
      document.body.scrollLeft = page*(window.outerWidth);
    }
  }));

  window.addEventListener("scroll", (function(e) {        
    document.body.scrollLeft = page*(window.outerWidth);
  }));

}());