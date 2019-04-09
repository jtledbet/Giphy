

const APIkey = "go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz"

const app = document.getElementById("root");
// const logo = document.createElement('img');
//     logo.setAttribute("width", "200px")
//     logo.src = "./assets/images/giphy_marks/static/Small/light_bg/Poweredby_100px-White_VertLogo.png"
// app.prepend(logo)

const buttons = document.getElementById("buttons");
const images = document.getElementById("images");
const input = document.getElementById("input");

var topics = ["puppies", "kittens", "baby sloths"]
var searchTerm = "default"
var imageLimit = 10;
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIkey;
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=10";

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

    initializeInput();

    $(document).on("click", "#new-term-input", function (event) {
        event.preventDefault();
        $(this).val("")
    })

    $(document).on("click", "#new-term-submit", function (event) {
        event.preventDefault();
        var newCat = $("#new-term-input").val().trim();
        newCategory(newCat);
    })

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
                var title = response.data[i].title;
                var rating = response.data[i].rating;
                var original = response.data[i].images.original.url;
                original = "<a target='_blank' href='" + original + "'>click me!</a>"
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
                ($(cardFooter)).html("title: " + title + "<br> rating: " + rating.toUpperCase() + "<br> original: " + original)

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

    $(document).on("click", "#newCatBtn", function () {
        var newCat = prompt("new category?")
        newCategory(newCat);
    })
    
    function newCategory(newCat) {
        const btn = document.createElement("button");
        btn.setAttribute("class", "btn btn-dark");
        btn.innerHTML = (newCat);

        buttons.appendChild(btn)
    }

    function initializeInput() {
        
        var a = $("<form>");
        a.addClass("form");
        a.attr("id", "new-term-form")
        a.attr("action", "");
    
        var b = $("<input>");
        b.addClass("input");
        b.attr("type", "text");
        b.attr("name", "new-term-input");
        b.attr("id", "new-term-input");
        b.attr("value", "new search term");
        
        var c = $("<input>");
        c.addClass("button");
        c.attr("type", "submit");
        c.attr("name", "new-term-submit");
        c.attr("id", "new-term-submit");
        c.text("submit!");

        $("#input").append(a);
        $("#input").append(b);
        $("#input").append(c);

        // c.addEventListener("keyup", function () {
        //     if (event.keyCode == 13) {
        //         event.preventDefault();
        //         c.click();
        //     }
        // })

        // var input = document.getElementById("#new-term-input");
        // input.addEventListener("keyup", function(event) {

        // if (event.keyCode === 13) {
        //     event.preventDefault();
        //     document.getElementById("#new-term-submit").click();
        // }
    }

      
        // const newTerm = document.createElement("form")
        //     newTerm.setAttribute("action", "")
        // const newTermInput = document.createElement("input")
        //     newTermInput.setAttribute("name", "new-term-input")
        // const newTermSubmit = document.createElement("button")
        //     newTermSubmit.setAttribute("name", "new-term-button")
        //     newTermSubmit.html("submit!")

        //     console.log(typeof input)
        // input.appendChild(newTerm)
        //     input.appendChild(newTermInput)
        //         input.appendChild(newTermSubmit)
}