$(document).ready(() => {
  $('.tweet').mouseover(event => {
    $('.tweet').css('box-shadow', '5px 10px #888888')
    $('.handle').css('opacity', '1')
  })
  $('.tweet').mouseout(event => {
    $('.tweet').css('box-shadow', '0px 0px')
    $('.handle').css('opacity', 'initial')
  })
});
