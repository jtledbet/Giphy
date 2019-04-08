
// giphy api key:
// go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz

const doc = document.getElementById('root')

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'imageBox')

var response;

// goGet()

// function goGet() {
//     // var data;
//     var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=DEATH+GRIPS&api_key=go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz&limit=1");
//     xhr.done(function(response) { console.log("success got data", response); 
//         document.write(response.data[0].url)});
        
//         var imgs = document.createElement('img');        

//         for (i = 0; i < 2; i++) {

//             imgs.src = response.data[i].embed_url;
//             imgs.src = response.data[i].url
//         }
// }



// tryThis()

// function tryThis() {
//     console.log("trying this")
//     var searchTerm = "death+grips"
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz&limit=1"
    
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//         console.log(response)
//         console.log(response.data[0])
//         console.log(response.data[0].url)
//         console.log(response.data[0].images.downsized.url)

//         var imgs = document.createElement('img');
//         imgLoc = response.data[0].images.downsized.url

//         $("#anImg").attr("src", imgLoc)
// })
//         .done(function(){
//         var data = JSON.parse(this.response);
//         data.forEach(movie => {
//             const card = document.createElement('div');
//             card.setAttribute('class', 'card');
      
//             const h1 = document.createElement('h1');
//             h1.textContent = movie.title;
      
//             const p = document.createElement('p');
//             movie.description = movie.description.substring(0, 300);
//             p.textContent = `${movie.description}...`;
      
//             container.appendChild(card);
//             card.appendChild(h1);
//             card.appendChild(p);
//         })
        // })
//      })

    
var searchTerm = "death+grips"
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz&limit=5"

var jqxhr = $.get(queryURL, function() {
        // alert( "success" );
      })
        .done(function() {
//insert code to assign the projects from Jira to a div.
              jqxhr = jqxhr.responseJSON;
              console.log(jqxhr);
              var div = document.getElementById(".container");
              for (i = 0; i < jqxhr.length; i++) {
                  console.log(jqxhr[i].data);
                  div.innerHTML += "image" + i + " name " + jqxhr[i].name + "size" + jqxhr[i].size + "<BR/>";
              }
              console.log(div);
        //   alert( "second success" );
        })
        .fail(function() {
          alert( "error" );
        })
        .always(function() {
          alert( "finished" );
        });

      // Perform other work here ...

      // Set another completion function for the request above
      jqxhr.always(function() {
        // alert( "second finished" );
      });