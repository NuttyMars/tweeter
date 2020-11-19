/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  loadTweets();

  $('form').submit((event) => {
    event.preventDefault();

    submitTweet();

    $( '#newsletterform' ).each(function(){
      this.reset();
    });

    

    // loadTweets();
  })
  
})
