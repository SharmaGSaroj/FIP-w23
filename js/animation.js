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

const heroSection = document.querySelector('.hero');
const header = document.querySelector('header');
const herobutton = document.querySelector('.primarybtn');

const waypoint = new Waypoint({
  element: heroSection,
  handler: function(direction) {
    if (direction === 'down') {
      header.classList.add('sticky');
      herobutton.classList.add('hidden');
    } else {
      header.classList.remove('sticky');
      herobutton.classList.remove('hidden');
    }
  },
  offset: '50%',
});



