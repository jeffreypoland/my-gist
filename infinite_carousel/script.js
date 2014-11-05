$(window).load(function() {
  function init() {
    var length = $('.carousel div').length / 2;
    var min = $('.carousel div').length;

    //Rule Carousel must have 5 images at a minimum
    if (min <= 4) {
      alert('Sorry. You must have 5 images at a minimum');
    } else {
      
      
      //find the first img and assign it to active
      $('.carousel').find('div').first().addClass('ic_active');
      $('.carousel').find('div').first().find('img').addClass('mainimg');
      
      //Divide Imgs in half and take the second half and move them to top of stack for wrap effect
      var getHalf = Math.ceil(length);
      var wrapImgs = $('.carousel').find('div').slice(getHalf, min);
      $('.carousel').prepend(wrapImgs);
      infinite();
    }
  }//end init
  init();

  function infinite() {
    //Center first image
    var active = $('.ic_active');
    initActive(active);

    $('.ic_active').next().addClass('next');
    $('.ic_active').prev().addClass('prev');
    
    //Get title
    var title = $('.ic_active').find('img').attr('title');
    //Add title
    $('.ic_title').append('<p>' + title + '</p>');

    function clickMe() {
      //prevent multiple clicks on the same img
      var clicked = $(this);
      clicked.unbind('click');

      if(clicked.hasClass('back_btn')){

        var bkbtn = clicked.parent().find('.carousel').find('.prev');
        clicked = bkbtn;


      }else if (clicked.hasClass('next_btn')){

        var nxbtn = $(this).parent().find('.carousel').find('.next');
        clicked = nxbtn;
      }

      var state;
      var parentMarginLeftCalculation;
      var animationCalculation;

      // Checking for what was clicked and assigning state a value
      if (clicked.hasClass('next')) {
        state = 'next';
      } else if (clicked.hasClass('prev')) {
        state = 'prev';
      }else{
        return;
      }
 
       //Sets new active img
      toggle(clicked);
      //Grab position, widths of necessary elements, and title 
      elementInfo(clicked);

       // Checking for what was clicked for moving first/last img
      if (state === 'next') {
        clicked.parent().append('<div class="item">' + firstImg + '</div>');
        clicked.parent().find('div.item').first().remove();
      } else {
        clicked.parent().prepend('<div class="item">' + lastImg + '</div>');
        clicked.parent().find('div.item').last().remove();
      }

      var parentWidth = clicked.parent().parent().width() / 2;
      var value = (parentWidth - activeImgPositionLeft) - halfOfActiveImgWidth;

     // Calculations to move images forward or backward
      if (state === 'next') {

        parentMarginLeftCalculation = value + firstImgWidth + prevImgWidth;
        animationCalculation = parentMarginLeftCalculation - prevImgWidth;
      } else if (state === 'prev'){
        parentMarginLeftCalculation = value - lastImgWidth - nextImgWidth;
        animationCalculation = parentMarginLeftCalculation + nextImgWidth;
      }
      
      // Setting Margin Left based on calculations
      clicked.parent().css('margin-left', '' + parentMarginLeftCalculation + 'px');

      // Animating Margin Left
      clicked.parent().animate({
        marginLeft: '' + animationCalculation + ''
      }, 1000, function() {
        $('.next').unbind('click').click(clickMe);
        $('.prev').unbind('click').click(clickMe);
        $('.back_btn').unbind('click').click(clickMe);
        $('.next_btn').unbind('click').click(clickMe);
      });
    }//end clickMe

    //getting position, width, title and contents of the first and last img
    function elementInfo(myThis) {
      activeImgPositionLeft = myThis.position().left;
      halfOfActiveImgWidth = myThis.width() / 2;
      prevImgWidth = myThis.prev().width();
      nextImgWidth = myThis.next().width();
      title = myThis.find('img').attr('title');
      myThis.parent().next().find('p').html(title);
      firstImgWidth = myThis.parent().find('div.item').first().width();
      lastImgWidth = myThis.parent().find('div.item').last().width();
      firstImg = myThis.parent().find('div.item').first().html();
      lastImg = myThis.parent().find('div.item').last().html();
    }//end elementInfo

    // adding and removing appropriate classes
    function toggle(myThis) {
      myThis.parent().find('img').removeClass('mainimg');
      myThis.parent().find('div').removeClass('ic_active');
      myThis.parent().find('div').removeClass('next');
      myThis.parent().find('div').removeClass('prev');
      myThis.find('img').addClass('mainimg');
      myThis.addClass('ic_active');
      myThis.next().addClass('next');
      myThis.prev().addClass('prev');
    }//end toggle

    $('.next').click(clickMe);
    $('.prev').click(clickMe);
    $('.back_btn').click(clickMe);
    $('.next_btn').click(clickMe);

  }//end infinite


  //keeps active img centered on load and for window.resize function
  function initActive(myActive){

  p = myActive.position().left;
  w = myActive.width() / 2;
  pw = myActive.parent().parent().width() / 2;
  val = (pw - p) - w;
  myActive.parent().css('margin-left', '' + val + 'px');

  }//end initActive
 
 $(window).resize(function() {

  var active = $('.ic_active');
  initActive(active);
 
  });//end window.resize

});//end window.load
