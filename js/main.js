

import Blogs from "./components/TheBlogComponent.js";
import TheForumPage from "./components/TheForumPage.js";
import TheLogin from "./components/TheLogin.js";
import BlogSection from "./components/BlogSection.js";


(() => {
    const { createApp } = Vue

    createApp({
        created() {
          fetch('http://localhost:8000/blogs')
      .then(res => res.json())
      .then(data => {
        this.heroData = data;
        console.log(this.heroData);
      })
      .catch(error => console.error(error));
        },
        data() {
            return {
              heroData:{},
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                agreement: false,
                successMessage: '',
                errorMessage: '',
                title: "",
                content: "",
                errors: {},
                fullname: '',
                email: '',
                message: '',
                pledgeCount: null,
                posts: [],
                errors: {},
                imageFile: null
           
               
            }
        },
        components: {
            theblog: Blogs,
            theforum: TheForumPage,
            thelogin: TheLogin,
            blog:BlogSection
        },
        methods: {

          async register() {
            try {
                const response = await fetch('http://localhost:8000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        password: this.password,
                        agreement: this.agreement
                    })
                });
        
                const data = await response.json();
                if (response.ok) {
                    this.successMessage = data.message;
                    this.errorMessage = '';
                    this.first_name = '';
                    this.last_name = '';
                    this.email = '';
                    this.password = '';
                    this.agreement = false;
                    swal({
                        title: "Success",
                        text: data.message,
                        icon: "success",
                        timer: 5000
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                } else {
                  swal({
                    title: "Error",
                    text: "Registration failed: " + data.message, // explicitly set error message here
                    icon: "error",
                    timer: 5000
                });
                }
            } catch (error) {
                // console.error(error);
            }
        },
        
        async submitForm() {
          const profanityWords = ["fuck", "asshole", "idiot", "dumb"]; // replace with your own list of profanity words
          const titleHasProfanity = profanityWords.some(word => this.title.toLowerCase().includes(word));
          const contentHasProfanity = profanityWords.some(word => this.content.toLowerCase().includes(word));
                  
          if (titleHasProfanity || contentHasProfanity) {
            swal("","Your post violates our community guidelines!!!!!!", "error");
            this.title = '';
            this.content = '';
            this.imageFile ='';
          }else {
            try {
              const formData = new FormData();
              formData.append('title', this.title);
              formData.append('content', this.content);
              formData.append('image', this.imageFile); // add the image file to the FormData object
                      
              const post = await fetch('http://localhost:8000/store', {
                method: 'POST',
                body: formData // send the FormData object as the request body
              });
                      
              const data = await post.json();
              if (post.ok) {
                swal("Success!", data.message, "success");
                this.title = '';
                this.content = '';
                this.imageFile = null; // reset the image file after successful submission
              } else {
                swal("Error!", data.message, "error");
              }
            } catch (error) {
              console.error(error);
              swal("Error!", "Something went wrong. Please try again later.", "error");
            }
          }
        },
        
        
            async submitPledge() {
              try {
                const pledgeResponse = await fetch('http://localhost:8000/pledge', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    fullname: this.fullname,
                    email: this.email
                  })
                });
            
                const pledgeData = await pledgeResponse.json();
                if (pledgeResponse.ok) {
                  swal({
                    title: 'Success!',
                    text: pledgeData.message,
                    icon: 'success',
                    
                  });
                  this.errorMessage = '';
                  this.fullname = '';
                  this.email = '';
                } else {
                  swal({
                    title: 'Error!',
                    text: pledgeData.message,
                    icon: 'error',
                    
                  });
                }
              } catch (error) {
                console.error(error);
              }
            },
            
            
            
            loadData() {
                fetch('http://localhost:8000/getCount')
                  .then(response => response.json())
                  .then(data => {
                    this.pledgeCount = data.count;
                  })
                  .catch(error => {
                    console.error(error);
                  });
              },
              handleImageChange(event) {
                this.imageFile = event.target.files[0];
              },
        },
        mounted(){
            this.loadData(); // load data initially
            setInterval(this.loadData, 10000);


            const heroContent = document.querySelector('.herocontent');
            const subHeading = document.querySelector('.sub-heading');
            const heroHeading = document.querySelector('.hero-heading');
            const heroTextInfo = document.querySelector('.herotext-info');
            const heroButton = document.querySelector('.hero-button');
            const avatarImage = document.querySelector('.count-details img');
            const heroimage = document.querySelector('.heroimage')
            // set the initial position of the divs
            gsap.set([heroContent, subHeading, heroHeading, heroTextInfo, heroButton, avatarImage], {y: 100, opacity: 0});

            // create the animation timeline
            const tl = gsap.timeline({defaults: {ease: "power1.out"}});

            // add the animation to each div
            tl.to(heroContent, {duration: 0.4, y: 0, opacity: 1})
              .to(subHeading, {duration: 0.4, y: 0, opacity: 1})
              .to(heroHeading, {duration: 0.4, y: 0, opacity: 1})
              .to(heroTextInfo, {duration: 0.4, y: 0, opacity: 1})
              .to(heroButton, {duration: 0.4, y: 0, opacity: 1})
              .to(avatarImage, {duration: 0.4, y: 0, opacity: 1})
              .to(heroimage, {duration: 0.4, y: 0, opacity: 1});
  
// play the animation when the page loads
              window.addEventListener("load", function() {
               tl.play();
                });



        
        }
    }).mount('#app')
})();
