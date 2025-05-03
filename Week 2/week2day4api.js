// week2day4api.js
export const fetchComments = async () => {
    const response = await fetch("https://dummyjson.com/comments");
  
    if (!response.ok) {
      throw new Error(`Failed to fetch comments! Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.comments;
  };
  