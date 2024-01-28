const knex = require("../db/connection");

function list() {
  return knex("comments").select("*");
}

function listCommenterCount() {
  return knex("comments as c")
  .join("users as u", "u.user_id", "c.commenter_id")
  .select("u.user_email as commenter_email")
  .count("c.comment_id")
  .groupBy("commenter_email")
  .orderBy("u.user_email");
}

function read(commentId) {
  // your solution here
//   comment_id, comment, user_email aliased as commenter_email, and post_body aliased as commented_post. You will need to perform a join between the comments, users, and posts tables here. The read() method in the controller is already completed for you.
  return knex("comments as c")
  .join("users as u", "u.user_id", "c.commenter_id")
  .join("posts as p", "p.post_id", "c.post_id")
  .select("comment_id", "c.comment","user_email as commenter_email", "post_body as commented_post")
  .where({"c.comment_id": commentId})
  .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
