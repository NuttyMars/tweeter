//calculates difference between time created and current date in years, days and minutes
const getTimeDistanceFromNow = function(tweetObj) {
  const dateCreated = new Date(tweetObj.created_at);
  const currentDate = new Date();
  let output = '';

  //helps extract month from date
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  //will check if year, month, day, hours and minutes are equal
  if (dateCreated.getFullYear() === currentDate.getFullYear()) {
    if (months[dateCreated.getMonth()] === months[currentDate.getMonth()]) {
      if(dateCreated.getDate() === currentDate.getDate()) {
        if(dateCreated.getHours() === currentDate.getHours()) {
          if(dateCreated.getMinutes() === currentDate.getMinutes()) {
            output = `A few seconds ago`;

            //if they are not equal, will print message with difference
          } else {
            output = `${currentDate.getMinutes() - dateCreated.getMinutes()} minutes ago`;
          }
        } else {
          output = `${currentDate.getHours() - dateCreated.getHours()} hours ago`;
        }
      } else {
        output = `${months[currentDate.getMonth()] - months[dateCreated.getMonth()]} days ago`;
      }
    } else {
      output = `A while ago`;
    }
  } else {
    output = `${currentDate.getFullYear() - dateCreated.getFullYear()} years ago`;
  }

  return output;
}

//generates tweet content dinamically with jQuery
//takes in object from database and outputs HTML
const createTweetElement = function(tweetObj) {

  //all other tags will be appended to this one
  const $tweetElement = $('<article class="tweet">')
  const header = $('<header class="tweet-header">')
  const avatar = $('<img>', {
    class: "avatar",
    src: `${tweetObj.user.avatars}`,
    alt: "avatar"
  })
  const username = $('<p class="user-name">').text(tweetObj.user.name)
  const handle = $('<p class="handle">').text(tweetObj.user.handle)
  const contentHolder = $('<div class="tweet-content">')
  const content = $('<p>').text(`${tweetObj.content.text}`)
  const timePassed = getTimeDistanceFromNow(tweetObj)
  const footer = $('<footer class="tweet-footer">')
  const footerText = $('<p>').text(`${(timePassed)}`)
  const iconHolder = $('<div class="icons">')
  const flagIcon = $('<i class="far fa-flag">')
  const retweetIcon = $('<i class="fas fa-retweet">')
  const likeIcone = $('<i class="far fa-heart">')

  header.append(avatar);
  header.append(username);
  header.append(handle);
  $tweetElement.append(header);
  contentHolder.append(content);
  $tweetElement.append(contentHolder);
  footer.append(footerText);
  iconHolder.append(flagIcon);
  iconHolder.append(retweetIcon);
  iconHolder.append(likeIcone);
  footer.append(iconHolder);
  $tweetElement.append(footer);

  return $tweetElement;
}

const renderTweets = function(tweetsArray) {
  for (const tweetObj of tweetsArray) {
    const $tweet = createTweetElement(tweetObj);
    $('#tweet-container').prepend($tweet);
  }
}

const loadTweets = function() {
  console.log('1st AJAX call, loading existing tweets')
  $('#tweet-container').empty()

  $
  .ajax('/tweets', {method: 'GET'})
  .then(res => renderTweets(res))
  .catch(err => console.log(err))
  .always(() => console.log('1st Ajax call successful'))
}

const submitTweet = function() {
  console.log('AJAX POST call')

  $
  .ajax({
    url:'/tweets',
    method: 'POST',
    data: $('form').serialize()
  })
  .then(res => loadTweets(res))
  .catch(err => console.log(err))
  .always(() => console.log('AJAX POST successful'))
}

const alert = function(message) {
  $('.error').slideDown('slow', 'swing', function() {
    $('.error')
      .text(`${message}`)
      .css('visibility', 'visible')
  });
}

const validateTweetLength = function(counter) {
  if(counter === '140') {
    const message = 'Tweet cannot be empty!';
    return alert(message);
  }

  if (counter < 0) {
    const message = 'Tweet cannot be over 140 characters long!';
    return alert(message);
  }
  $('.error').css('visibility', 'hidden')
  return true;
}