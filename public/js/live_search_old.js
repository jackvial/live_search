

$(function(){ 
    var timer = null; 

    $("#query").keyup(function(){ 
        if (timer) { 
            clearTimeout(timer); 
        } 
        // Call the filter function every 200 miliseconds
        timer = setTimeout("filter()", 200); 
    }); 
}); 
  
function filter(){ 

    var query = $("#query").val().toLowerCase(); 
      
    var scores = []; 
      
    if (query.length == 0) { 
        // Empty result ul when there is no query in the text input
        $("#results").html(""); 

    } else {

        // When there is a query iterate over the items
        $.each(items, function(){ 
            // Get the score of the query compared to the current item in the loop (0, 0.1, 0.2, 0.3...0.9, 1)
            var score = this.toLowerCase().score(query); 
              
            // If the score is above 0 then push the current item and its score to the scores array
            if (score > 0) { 
                // Creates a 2d array [[score, item], [score, item], [score, item]]
                scores.push([score, this+""]); 
            } 
            //console.log(scores);
        }); 

        // If there are items in scores
        if (scores.length) { 
            // First clear out the old results
            $("#results").html(""); 

            // Sort the items in scores
            scores = scores.sort(function(a, b){

                // Sort by score, highest to lowest
                // Remember, score is at index 0 of every itemm: [[score, item], [0, 1], [0, 1]]
                return b[0] - a[0];

             });

            
            $.each(scores, function(index, elem){

                    //console.log(elem[1]);
                    // Create an li for each item in scores
                    var entry = "<li>" + this[1] +"</li>"; 

                    // This is slow, fix to append after loop
                    $("#results").append(entry); 

            }); 

        } else {

            // Clear the list if there are no items in score
            $("#results").html(""); 
        } 
    } 
}