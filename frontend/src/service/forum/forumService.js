import { toSentenceCase } from '../../utils/string';

export default class ForumService {
  constructor(http) {
    this.http = http;
  }

  async getPosts(queryParams) {
    let query = '';
    if (queryParams) {
      const queryValues = [];
      const { location, username } = queryParams;
      location && queryValues.push(`location=${location}`);
      username && queryValues.push(`username=${username}`);
      query = `?${queryValues.join('&')}`;
    }

    return this.http.fetch(`/posts${query}`, {
      method: 'GET',
    });
  }

  async createPost(username, location, content, imageUrl) {
    return this.http.fetch(`/posts`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        location: toSentenceCase(location),
        content,
        imageUrl: imageUrl ? imageUrl : '',
      }),
    });
  }

  async deletePost(postId) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async updatePost(postId, content = null, likes = null) {
    return this.http.fetch(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...(content !== null && { content }),
        ...(likes !== null && { likes }),
      }),
    });
  }

  async getComments() {
    return this.http.fetch(`/comments`, {
      method: 'GET',
    });
  }

  async createComment(postId, username, content) {
    return this.http.fetch(`/comments?post-id=${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        content,
      }),
    });
  }

  async deleteComment(postId, commendId) {
    return this.http.fetch(`/comments/${commendId}?post-id=${postId}`, {
      method: 'DELETE',
    });
  }
}
