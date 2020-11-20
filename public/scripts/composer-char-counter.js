$(document).ready(() => {
  $('textarea').on('keyup', event => {
    const tweet = $(event.target).val();
    const counter = 140 - tweet.length;

    if (counter >= 0) {
      $("#counter").text(counter);
      $("#counter").css('color', '#545149');
      
    } else {
      $("#counter").text(- (tweet.length - 140));
      $("#counter").css('color', 'crimson');
    }
  });
});
