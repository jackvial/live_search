// Live search plugin

(function($)
{
    $.fn.dbLiveSearch = function(input)
    {   

            $(input).autocomplete({
            

                  source: function( request, response ) {

                    var query = request.term.toLowerCase();

                      $.ajax({
                          url : 'http://localhost/live_search/app/index.php',
                          dataType: "json",
                          data: {
                            search_text: query
                          },
        
                            success: function(data) {
                             console.log(data);
                                // Clear array on each new request
                                var scores = [];
                                var key;

                                if(data)
                                {
                                    $.each(data, function(index, elem){ 
                                    
                                        //var json_data = JSON.parse(data);
                                       

                                        // Get key without knowing name
                                        for (key in data[index]) {
                                             console.log(key);
                                        

                                           var score = elem[key].score(query); 

                                            if (score > 0) { 

                                                // Creates a 2d array [[score, item], [score, item], [score, item]]
                                                scores.push([score, elem[key]+""]); 
                                            } 
                                        } // End for in

                                    }); 

                                    // If there are items in scores
                                    if (scores.length) 
                                    { 
                                        // Remove old results
                                        $('ul.ui-autocomplete').children().remove();

                                        // Sort the items in scores
                                        scores = scores.sort(function(a, b){

                                            // Sort by score, highest to lowest
                                            // Remember, score is at index 0 of every itemm: [[score, item], [0, 1], [0, 1]]
                                            return b[0] - a[0];

                                         });
                                    
                                        // Only return the top 5 results
                                         response( $.map(scores.slice(0, 20), function( item ) {
                                            return {

                                                label: item[1],
                                                value: item[1]
                                            }
                                        })); // End response block

                                    }
                                    else
                                    {
                                        // Remove old results
                                        $('ul.ui-autocomplete').children().remove();
                                    }


                                } // End data check
                                else
                                {
                                    // Remove old results
                                    $('ul.ui-autocomplete').children().remove();
                                }
                            } // End success
                      }); // End $.ajax
                  },
                  autoFocus: true,
                  minLength: 1          
              });
        
    }
})(jQuery);