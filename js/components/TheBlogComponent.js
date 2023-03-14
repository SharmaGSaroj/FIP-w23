export default{
    name:'BlogComponent',
    
    props: {
      hero: Object
    },
    template:`
   
    <div class="blogpage-heading">
    <p>
       {{hero.name}} 
    </p>
</div>
<div class="blog-info-image">
<img :src='"images/" + hero.pic' alt="" />
</div>
<div class="blog-info-text">
   
    <p>
    {{hero.story}}
    </p>
</div> 


    `
    

}