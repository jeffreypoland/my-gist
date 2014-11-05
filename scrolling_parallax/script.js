 $('div.parallaxBackground').each(function(){
  var item = $(this);

  item.find('article').css({
        position:'absolute',
        left: (item .width() - $('article').width())/2,
        top: (item .height() - $('article').height())/2
    });
 
  $(window).scroll(function() {

    var yPosition = -($(window).scrollTop() / item.data('scroll-speed')); 

    var backgroundPosition = '50% '+ yPosition + 'px';


    item.css('background-position', backgroundPosition );
    

  }); 
   
   $(window).resize(function() {
 
   item.find('article').css({
        position:'absolute',
        left: (item .width() - $('article').width())/2,
        top: (item .height() - $('article').height())/2
    });
  
});
});

