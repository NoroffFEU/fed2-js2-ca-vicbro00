export const validatePost = (title, content) => {
    if (!title || !content) {
      alert('Title and content are required');
      return false;
    }
    return true;
};
  