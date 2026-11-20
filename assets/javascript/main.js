const API_KEY = "go61UGTJAaB4tjBG7rxHahuDUNMAi1Bz";
const IMAGE_LIMIT = 12;

const buttons = document.getElementById("buttons");
const images = document.getElementById("images");

const topics = ["puppies", "kittens", "baby sloths"];

function createTopicButton(topic) {
  const btn = document.createElement("button");
  btn.setAttribute("class", "btn btn-dark m-1");
  btn.setAttribute("type", "button");
  btn.textContent = topic;
  buttons.appendChild(btn);
}

function initializeTopicButtons() {
  topics.forEach((topic) => createTopicButton(topic));
}

function renderGifCards(gifs) {
  images.innerHTML = "";

  gifs.forEach((gif) => {
    const imgStill = gif.images.fixed_width_still.url;
    const imgActive = gif.images.fixed_width.url;
    const title = gif.title || "Untitled";
    const rating = (gif.rating || "N/A").toUpperCase();
    const original = gif.images.original.url;

    const card = document.createElement("div");
    card.setAttribute("class", "card col-auto");

    const imgNow = document.createElement("img");
    imgNow.setAttribute("class", "img");
    imgNow.setAttribute("src", imgStill);
    imgNow.setAttribute("still-image", imgStill);
    imgNow.setAttribute("active-image", imgActive);
    imgNow.setAttribute("state", "still");
    imgNow.setAttribute("alt", `${title} GIF preview`);

    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("class", "card-footer");
    cardFooter.innerHTML = `title: ${title}<br>rating: ${rating}<br>original: <a target='_blank' rel='noopener noreferrer' href='${original}'>open</a>`;

    card.appendChild(imgNow);
    card.appendChild(cardFooter);
    images.appendChild(card);
  });
}

function fetchGifs(searchTerm) {
  const encodedTerm = encodeURIComponent(searchTerm);
  const queryURL = `https://api.giphy.com/v1/gifs/search?q=${encodedTerm}&api_key=${API_KEY}&limit=${IMAGE_LIMIT}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then((response) => {
    renderGifCards(response.data || []);
  });
}

function newCategory(newCat) {
  if (!newCat) {
    return;
  }

  const normalized = newCat.trim();
  if (!normalized) {
    return;
  }

  if (topics.includes(normalized)) {
    return;
  }

  topics.push(normalized);
  createTopicButton(normalized);
}

function initializeInput() {
  const form = $("<form>", { class: "form", id: "new-term-form", action: "" });

  const input = $("<input>", {
    class: "input",
    type: "search",
    name: "new-term-input",
    id: "new-term-input",
    placeholder: "new search term",
    "aria-label": "Add search term",
  });

  const submit = $("<input>", {
    class: "button",
    type: "submit",
    name: "new-term-submit",
    id: "new-term-submit",
    value: "submit",
  });

  form.append(input);
  form.append(submit);
  $("#input").append(form);
}

window.onload = function () {
  initializeInput();
  initializeTopicButtons();

  $(document).on("click", "#new-term-input", function (event) {
    event.preventDefault();
    $(this).val("");
  });

  $(document).on("submit", "#new-term-form", function (event) {
    event.preventDefault();
    const newCat = $("#new-term-input").val().trim();
    $("#new-term-input").val("");
    newCategory(newCat);
  });

  $(document).on("click", ".btn", function (event) {
    event.preventDefault();
    const searchTerm = this.textContent;
    fetchGifs(searchTerm);
  });

  $(document).on("click", ".img", function (event) {
    event.preventDefault();

    const thisImg = $(this);
    const state = thisImg.attr("state");

    if (state === "still") {
      thisImg.attr("src", thisImg.attr("active-image"));
      thisImg.attr("state", "active");
    } else if (state === "active") {
      thisImg.attr("src", thisImg.attr("still-image"));
      thisImg.attr("state", "still");
    }
  });
};
