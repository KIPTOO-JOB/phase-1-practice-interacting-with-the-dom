
document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  let minus = document.getElementById("minus");
  let plus = document.getElementById("plus");
  let heart = document.getElementById("heart");
  let pause = document.getElementById("pause");
  let likesList = document.querySelector(".likes");
  let commentForm = document.getElementById("comment-form");
  let commentsList = document.getElementById("comments-list");
  
  let count = 0;
  let timer = setInterval(incrementCounter, 1000);
  let paused = false;

  function incrementCounter() {
    if (!paused) {
      counter.innerText = ++count;
    }
  }

  function decrementCounter() {
    counter.innerText = --count;
  }

  function likeNumber() {
    let existingLike = document.getElementById(`like-${count}`);
    if (existingLike) {
      let likes = parseInt(existingLike.dataset.likes, 10) + 1;
      existingLike.dataset.likes = likes;
      existingLike.innerText = `${count} has been liked ${likes} times`;
    } else {
      let li = document.createElement("li");
      li.id = `like-${count}`;
      li.dataset.likes = 1;
      li.innerText = `${count} has been liked 1 time`;
      likesList.appendChild(li);
    }
  }

  function togglePause() {
    paused = !paused;
    if (paused) {
      clearInterval(timer);
      pause.innerText = "resume";
      minus.disabled = true;
      plus.disabled = true;
      heart.disabled = true;
    } else {
      timer = setInterval(incrementCounter, 1000);
      pause.innerText = "pause";
      minus.disabled = false;
      plus.disabled = false;
      heart.disabled = false;
    }
  }

  function addComment(event) {
    event.preventDefault();
    let commentInput = document.getElementById("comment-input");
    let commentText = commentInput.value;
    if (commentText) {
      let commentLi = document.createElement("li");
      commentLi.innerText = commentText;
      commentsList.appendChild(commentLi);
      commentInput.value = "";
    }
  }

  plus.addEventListener("click", incrementCounter);
  minus.addEventListener("click", decrementCounter);
  heart.addEventListener("click", likeNumber);
  pause.addEventListener("click", togglePause);
  commentForm.addEventListener("submit", addComment);
});
