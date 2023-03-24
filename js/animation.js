// select the divs to animate
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
tl.to(heroContent, {duration: 0.5, y: 0, opacity: 1})
  .to(subHeading, {duration: 0.5, y: 0, opacity: 1})
  .to(heroHeading, {duration: 0.5, y: 0, opacity: 1})
  .to(heroTextInfo, {duration: 0.5, y: 0, opacity: 1})
  .to(heroButton, {duration: 0.5, y: 0, opacity: 1})
  .to(avatarImage, {duration: 0.5, y: 0, opacity: 1})
  .to(heroimage, {duration: 0.5, y: 0, opacity: 1});
  
// play the animation when the page loads
window.addEventListener("load", function() {
  tl.play();
});


const dts = document.getElementsByTagName("dt");
for (let i = 0; i < dts.length; i++) {
    dts[i].addEventListener("click", () => {
        const arrow = dts[i].getElementsByClassName("arrow")[0];
        const dd = dts[i].nextElementSibling;
        if (dd.style.display === "block") {
            dd.style.display = "none";
            arrow.innerHTML = "&#9660;";
        } else {
            dd.style.display = "block";
            arrow.innerHTML = "&#9650;";
        }
    });
}
// Navigation menu functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

// Toggle active class when hamburger is clicked
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Remove active class from menu when a nav link is clicked
navLink.forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

