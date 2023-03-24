export default {
    name: 'BlogComponent',
    template: `
      <div class="blogpage-heading">
        <p>{{ post.title }}</p>
      </div>
      <div class="blog-info-image">
        <img :src="'images/' + post.display_image" :alt="" />
      </div>
      <div class="blog-info-text">
        <p>{{ post.content }}</p>
      </div>
    `,
    data() {
      return {
        post: {}
      };
    },
    created() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
  
      fetch(`http://localhost:8000/blogs/${id}`)
        .then(response => response.json())
        .then(post => {
          this.post = post;
        })
        .catch(error => console.error(error));
    }
  };
  