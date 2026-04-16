# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vanilla JavaScript SPA that searches the Giphy API and renders animated GIF results. No build system, package manager, or server — open `index.html` directly in a browser.

## Running the App

Open `index.html` in a browser. No build, install, or server step is needed.

## Architecture

All application logic lives in `assets/javascript/main.js`. Key pieces:

- **State**: `topics` (array of search terms) and `API_KEY` are the only global variables.
- **Bootstrap**: `initializeTopicButtons()` and `initializeInput()` are called on page load; they create the topic buttons and search form dynamically.
- **Data flow**: `fetchGifs(searchTerm)` calls the Giphy API via jQuery AJAX, then passes results to `renderGifCards(gifs)` which builds DOM elements.
- **GIF toggle**: Each rendered `<img>` element stores `still-image`, `active-image`, and `state` data attributes. Clicking an image flips between still and animated states.
- **New topics**: `newCategory(newCat)` appends to `topics` and re-renders all topic buttons.
- **Event delegation**: All click handlers use `$(document).on("click", selector, fn)`.

`assets/javascript/old_main.js` is legacy/experimental code — not loaded by the app.

## Styling

`assets/css/style.css` uses Flexbox. Responsive breakpoints are at 600px and 900px.

## Dependencies

Loaded via CDN (no local install):
- Bootstrap 4.3.1 (CSS)
- jQuery 3.3.1
