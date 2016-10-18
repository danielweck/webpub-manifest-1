/* Handle basic navigation using swipes */

(function() {

  //var mc = new Hammer(document.body);
  var page = 0;

  //mc.on("swipeleft, tap", function(event) {
  //  page = page+1;
  //  document.body.scrollLeft = page*(window.outerWidth);
  //});



  //mc.on("swiperight", function(event) {
  //  if (page>0) page = page+1;
  //  document.body.scrollLeft = page*(window.outerWidth);
  //});

  //window.addEventListener("click", (function(e) {        
  //  var clickX = e.pageX;
  //  console.log("Click detected at: "+clickX);
  //  console.log((window.innerWidth*page)+(window.innerWidth/2));
  //  if (clickX > (window.innerWidth*page)+(window.innerWidth/2)) {
  //    page = page+1;
  //    document.body.scrollLeft = page*(window.outerWidth);
  //  } else {
  //    if (page>0) page = page-1;
  //    document.body.scrollLeft = page*(window.outerWidth);
  //  }
  //}));

  window.addEventListener("touchend", (function(e) {        
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