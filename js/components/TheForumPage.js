export default {
  name: 'Forumpage',
  template: `
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="post-header">
        <p class="post-title">{{ post.title }}</p>
        <p class="post-meta">
          <span class="post-author">{{ post.first_name }}</span>
          <p class="post-date">{{ formatDate(post.created_at )}}</p>
        </p>
      </div>
      <div class="post-content">{{ post.content }}</div>
      <div class="post-image">
      <img :src="'data:image/jpeg;base64,' + post.image" />
      </div>
    </div>
  `,
  data() {
    return {
      posts: [],
      email: localStorage.getItem('email'),
      errors: {},
      
      
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();

    },
  },
  created() {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 10000); // reload data every 10 seconds
  },
  
  methods: {
    fetchData() {
      fetch('http://localhost:8000/showall')
        .then(response => response.json())
        .then(posts => {
          // sort the posts in reverse order by created_at date
          posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          this.posts = posts.map(post => ({
            ...post,
            created_at: this.formatDate(post.created_at),
            first_name: post.first_name, // add the first_name attribute
          }));
        })
        .catch(error => console.error(error));
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      // format the date string here
    },
  },
  logout() {
    localStorage.clear(); // clear localStorage
    this.loggedIn = false; // set loggedIn to false
    window.location.href = 'login.html'; // redirect to login page
  },
  
  
  
};
