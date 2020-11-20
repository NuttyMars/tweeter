/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  loadTweets();

  $('form').submit((event) => {
    event.preventDefault();

    const tweetCounter = $('#counter').val();

    if(validateTweetLength(tweetCounter)) {
      submitTweet();
      $('textarea').val('');
      $('#counter').val('140');
    }
  })

  //scrolls to top when 'Write new tweet' button is pressed
  $('#compose-button').click(() => {

    $('html, body').animate({
      scrollTop: $("header").position().top
    }, 1000);
  })
})
