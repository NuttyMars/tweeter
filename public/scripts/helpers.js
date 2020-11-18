
const createTweetElement = function(tweetObj) {
  const tweetElement = $('<article class="tweet">')
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
  const footer = $('<footer class="tweet-footer">').text(`${tweetObj.created_at}`)
    
  header.append(avatar);
  header.append(username);
  header.append(handle);
  tweetElement.append(header);
  contentHolder.append(content);
  tweetElement.append(contentHolder);
  tweetElement.append(footer);

  return tweetElement;
}
