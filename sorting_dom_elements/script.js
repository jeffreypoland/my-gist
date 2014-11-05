$('.button').click(function(event) {
      /* Act on the event */
        var myThis = $(this);
        var item = $('.sort-items');
        var itemSort = $('div', item);

        itemSort.sort(function(a, b){

            var checkA = $(a).text();
            var checkB = $(b).text();

          //Covert to lowercase for checking letters.

            lowerCaseA = checkA.toLowerCase();
            lowerCaseB = checkB.toLowerCase();

          //Check what button was clicked
          
          if(myThis.hasClass('ac')){
           
           return (lowerCaseA > lowerCaseB) ? 1 : (lowerCaseA < lowerCaseB) ? -1 : 0; // ascending sort

          }else if(myThis.hasClass('dec')){ 

           return (lowerCaseA < lowerCaseB) ? 1 :  (lowerCaseA > lowerCaseB) ? -1 : 0; // descending sort

          }else{

            return Math.random()*10 > 5 ? 1 : -1; // random sort
          }
      
        });
        //loop through items
        $.each(itemSort, function(index, val){

            $(item).append(val);
    
        });

        e.preventDefault();
  });