/* Handle basic navigation using swipes */

(function() {

  var mc = new Hammer(document.body);
  var page = 0;

  mc.on("swipeleft, tap", function(event) {
    page = page+1;
    document.body.scrollLeft = page*(window.outerWidth);
  });

  mc.on("swiperight", function(event) {
    if (page>0) page = page+1;
    document.body.scrollLeft = page*(window.outerWidth);
  });

  function noscroll() {
    window.scrollTo( 0, 0 );
  }

  window.addEventListener('scroll', noscroll);

}());