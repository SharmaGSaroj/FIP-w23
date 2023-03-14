export default {
    name:'BlogSection',
    
    props: {
        hero: Object
      },
      template:`
      
      <div class="blog-subgrid">
            <img src="images/blog-image-left.png" alt="" />
            <p class="blog-grid-heading">
             {{hero.name}}
            </p>
            <p class="blog-grid-subheading">
              Lorem ipsum dolor sit ametoeneson vestibulum  sit amet fringilla risumn.
            </p>
            <p class="blog-grid-button">
              <a href="" @click="openComponent">Read More</a>
            </p>
          </div>
      
      
      `,
    
    
}