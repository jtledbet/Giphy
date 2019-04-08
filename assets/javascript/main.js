

const APIkey = "go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz"

const app = document.getElementById("root");
const buttons = document.getElementById("buttons");
const images = document.getElementById("images");
const input = document.getElementById("input");

var topics = ["animals", "foods", "beverages"]
var searchTerm = "default"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIkey;
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10";
var imageLimit = 10;

var ajaxOptions = {
    url: queryURL,
    method: "GET"
};

for (let topic in topics) {

    const btn = document.createElement("button");
    btn.setAttribute("class", "btn btn-dark");
    btn.innerHTML = (topics[topic]);

    buttons.appendChild(btn)
}

window.onload = function () {

    // initializeInput();

    $(document).on("click", ".btn", function (event) {
        event.preventDefault();
        images.innerHTML = "";

        searchTerm = this.textContent;
        ajaxOptions.url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz&limit=" + imageLimit
        console.log(searchTerm)
        console.log(ajaxOptions.url)

        $.ajax(ajaxOptions).then(function (response) {
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var imgStill = response.data[i].images.fixed_width_still.url;
                var imgActive = response.data[i].images.fixed_width.url;
                var rating = response.data[i].rating;

                const card = document.createElement("div")
                card.setAttribute("class", "card col-auto");

                const imgNow = document.createElement("img");
                imgNow.setAttribute("class", "img")
                imgNow.setAttribute("src", imgStill)
                imgNow.setAttribute("still-image", imgStill)
                imgNow.setAttribute("active-image", imgActive)
                imgNow.setAttribute("state", "still")

                const cardFooter = document.createElement("div")
                cardFooter.setAttribute("class", "card-footer");
                ($(cardFooter)).text("rating: " + rating)

                card.appendChild(imgNow);
                card.appendChild(cardFooter);
                images.appendChild(card);
            }

        })
    })

    $(document).on("click", ".img", function () {
        event.preventDefault();

        thisImg = $(this);
        var state = thisImg.attr("state")
        console.log("image clicked")

        // thisImg.attr("altsrc", thisImg.attr("src"))
        // thisImg.attr("src", thisImg.attr("altsrc"))

        if (state == "still") {
            thisImg.attr("src", thisImg.attr("active-image"))
            thisImg.attr("state", "active")

            var state = thisImg.attr("state")
        }
        else if (state == "active") {
            thisImg.attr("src", thisImg.attr("still-image"))
            thisImg.attr("state", "still")

            var state = thisImg.attr("state")
        }
    })

    var newCat = prompt("new category?")
    newCategory(newCat);
    
    function newCategory(newCat) {
        const btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-dark");
        btn.innerHTML = (newCat);

        buttons.appendChild(btn)
    }

    function initializeInput() {
        
        var a = $("<form>");
        a.addClass("form");
        a.attr("action", "");
        a.text("text");
    
        var b = $("<input>")
        b.addClass("input");
        b.attr("name", "new-term-input")
        b.text("input text")
      
        var c = $("<button>")
        c.addClass("button");
        c.attr("name", "new-term-submit")
        c.attr("id", "new-term-button")
        c.text("submit!")

        input.append(a)
        input.append(b)
        input.append(c)
      
        // const newTerm = document.createElement("form")
        //     newTerm.attr("action", "")
        // const newTermInput = document.createElement("input")
        //     ($(newTermInput)).attr("name", "new-term-input")
        // const newTermSubmit = document.createElement("button")
        //     ($(newTermSubmit)).attr("name", "new-term-button")
        //     ($(newTermSubmit)).text("submit!")
    }
}