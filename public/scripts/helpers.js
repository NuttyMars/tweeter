
const createTweetElement = function(tweetObj) {
  const dateCreated = new Date(tweetObj.created_at);
  const currentDate = new Date();
  const timePassed = currentDate - dateCreated
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
  const footer = $('<footer class="tweet-footer">').text(`${(timePassed)}`)
    
  header.append(avatar);
  header.append(username);
  header.append(handle);
  $tweetElement.append(header);
  contentHolder.append(content);
  $tweetElement.append(contentHolder);
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
  $('.error').slideDown('slow', function() {
    $(this)
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