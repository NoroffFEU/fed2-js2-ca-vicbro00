export const createPost = async (title, content) => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          content
        })
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Post created successfully:', data);
        return data;
      } else {
        console.error('Error creating post:', data);
        throw new Error(data.message || 'Error creating post');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  