// week2day4main.js
import { fetchComments } from "./week2day4api.js";
import { renderComments, renderError } from "./week2day4dom.js";

const init = async () => {
  try {
    const comments = await fetchComments();
    renderComments(comments);
  } catch (err) {
    renderError(err.message);
    console.error("Error:", err);
  }
};

init();
