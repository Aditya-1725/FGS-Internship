// week2day4dom.js
export const renderComments = (comments) => {
    const container = document.getElementById("commentContainer");
    container.innerHTML = "";
  
    comments.slice(0, 20).forEach(comment => {
      const div = document.createElement("div");
      div.className = "comment";
      div.innerHTML = `
        <strong>UserName:</strong> ${comment.user.username}<br>
        <p><b>Comment:</b> ${comment.body}</p>
      `;
      container.appendChild(div);
    });
  };
  
  export const renderError = (msg) => {
    const container = document.getElementById("commentContainer");
    container.innerHTML = `<p style="color: #e94560;"><b style="font-size:1.1rem;">Error:</b> ${msg}</p>`;
  };
  