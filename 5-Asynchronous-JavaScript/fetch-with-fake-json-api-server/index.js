const getAllComments = () =>
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => res.json())
    .then((comments) => {
      console.log("All comments:");
      console.log(comments);
      console.log("");
      return comments;
    });

const getRundomComment = () =>
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => res.json())
    .then((comments) => {
      const rundomIndex = Math.floor(Math.random() * comments.length);
      const rundomComment = comments[rundomIndex];
      console.log("Rundom Comment");
      console.log(rundomComment);
      console.log("");
      return rundomComment;
    });

const getPost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id)
    .then((res) => res.json())
    .then((post) => {
      console.log("Get Post");
      console.log(post);
      console.log("");
      return post;
    });

const getUser = (id) =>
  fetch("https://jsonplaceholder.typicode.com/users/" + id)
    .then((res) => res.json())
    .then((user) => {
      console.log("Get User");
      console.log(user);
      console.log("");
      return user;
    });

const deletePost = (id) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      console.log("Delete Post");
      console.log("");
    });

const changeUserName = (user, username) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + user.id, {
    method: "PUT",
    data: { ...user, username },
  })
    .then((res) => res.json())
    .then((post) => {
      console.log("Change User Name - ", username);
      console.log({
        ...user,
        username,
      });
      console.log("");
      return post;
    });

let postId;
let user;

getRundomComment()
  .then((comment) => {
    postId = comment.postId;
    return getPost(comment.postId);
  })
  .then((post) => getUser(post.userId))
  .then((userData) => {
    user = userData;
  })
  .then(() => deletePost(postId))
  .then(() => changeUserName(user, "Ivan Ivanov"));
