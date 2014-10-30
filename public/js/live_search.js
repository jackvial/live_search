// Live search plugin
(function($)
{
    $.fn.dbLiveSearch = function(input)
    {   
     
            $(input).autocomplete({
            
                  source: function( request, response ) {

                    var query = request.term.toLowerCase();

                      $.ajax({
                          url : "app/frameworks.json",
                          dataType: "json",
                          data: {
                            search_text: query
                          },
        
                            success: function(data) {

                                if(data)
                                {
                                    var key_name;

                                    response( $.map(data, function(item) {
                                        
                                        for (key_name in item) {
                                            return {

                                                label: item[key_name],
                                                value: item[key_name]
                                            }
                                        }
                                    })); // End response block


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