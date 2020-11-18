/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`<article class="tweet"><header><img src="${tweetObj.user.avatars}"><p>${tweetObj.user.name}</p><p class="handle">${tweetObj.user.handle}</p></header><div>
    <p>${tweetObj.content.text}</p></div><footer>${tweetObj.created_at}</footer></article>`);
    return $tweet;
  }



  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like

  console.log($tweet.children[0]);
  console.log($tweet.children[1]);
  console.log($tweet.children[2]);

  $('container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
})
