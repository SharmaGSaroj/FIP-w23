
export default {
  name: 'BlogSection',
  props: {
    hero:Object
  },
 
 
  template: `
    <div class="blog-subgrid-right">
      <img :src='"images/" + hero.display_image' alt="image"/>
      <div class="blog-subgrid-text">
        <p class="blog-heading-right">
          {{ hero.title }}
        </p>
        <p class="blog-grid-button">
          <a @click="openBlogPage(hero)" >Read More &#8594</a>
        </p>
      </div>
    </div>
  `,
  data() {
    return {
      heroData:{},
   
     
    }
  },

  created() {
    
  },
  methods: {
    openBlogPage(hero) {
      // generate the link to the blog page
      const link = `blog.html?id=${hero.id}`;
      
      // open the new page
      window.location.href = link;
    }
  }
  
}
