const api_url = "https://api.quotable.io/quotes/random";
var data;

async function fetchJson(url) {
  // Fetches URL gives out JSON
  const response = await fetch(url);
  data = await response.json();
}

async function getQuote() {
  // Runs the fetch
  await fetchJson(api_url);

  // Navigates JSON to get the quote
  const quote = data["0"]["content"];
  console.log(quote);

  // Navigates JSON to get the author
  const author = data["0"]["author"];
  console.log(author);

  // JQuery start
  $(document).ready(function () {
    // Fills in the quote and author text in their respective boxes
    $("#quote-text").text(quote);
    $("#author-text").text(author);

    // Defines variables for the quote and tumblr/twitter post queries
    var twitter_link = "https://twitter.com/intent/tweet?hashtags=quotes&text=";
    var mastodon_link = "https://toot.kytta.dev/?text=";
    var quote_argument = quote;
    var author_argument = " By " + author;

    // Combines the twitter and tumblr post queries with the quote content
    var resulting_link_twitter =
      twitter_link + quote_argument + author_argument;
    var resulting_link_mastodon =
      mastodon_link + quote_argument + author_argument;

    // Sets the href of the buttons to the resulting link
    $("#tweet-quote").attr("href", resulting_link_twitter);
    $("#mastodon-button-link").attr("href", resulting_link_mastodon);
  });
}

getQuote(data);
