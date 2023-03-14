import BlogSection from "./components/TheBlogComponent.js";
import TheForumPage from "./components/TheForumPage.js";




const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


const heroSection = document.querySelector('.hero');
const header = document.querySelector('header');
const heroButton = document.querySelector('.hero-button');



(() => {
    const { createApp } = Vue


    createApp({
        created() {
            fetch('/data.json')
            .then(res => res.json())
            .then(data => this.heroData = data)
            .catch(error => console.error(error));
        },
        data() {
            return {
                heroData:{},
                username: '',
            password: '',
            }
        },

        components: {
            theblog:BlogSection,
            theforum:TheForumPage
        },
        methods: {
            login() {
                // Handle login logic here
                console.log('Logging in with:', this.username, this.password);
              },
            openComponent() {
                // Navigate to the new page
                window.location.href = 'blog.html';
              }
            }

        
    }).mount('#app')


})()







var dts = document.getElementsByTagName("dt");
for (var i = 0; i < dts.length; i++) {
    dts[i].addEventListener("click", function () {
        var arrow = this.getElementsByClassName("arrow")[0];
        var dd = this.nextElementSibling;
        if (dd.style.display === "block") {
            dd.style.display = "none";
            arrow.innerHTML = "&#9660;";
        } else {
            dd.style.display = "block";
            arrow.innerHTML = "&#9650;";
        }
    });
}





