import { fetchPostsWithAuthors } from '../../api/post/display.js';
import { displayPosts } from '../ui/post/display.js';

export async function loadPosts() {
    const posts = await fetchPostsWithAuthors();
    displayPosts(posts);
}