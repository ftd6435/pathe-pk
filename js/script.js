'use strict';

const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links')

const navlinksAll = document.querySelectorAll('.nav_link');

const profilSlider = document.querySelector('.profil-slider');
const profilSlide = document.querySelectorAll('.profil-slide');


menu.addEventListener('click', function(){
    navLinks.classList.add('nav-active');
});

navlinksAll.forEach(li => {
    li.addEventListener('click', function(e){
        e.preventDefault();

        const id = li.getAttribute('id');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    });
});

let cur = 0;

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const prev = function(){
    profilSlide[1].classList.remove('slide__active');
    profilSlide[0].classList.add('slide__active');
    prevBtn.classList.add('dots-btn__active');
    nextBtn.classList.remove('dots-btn__active');
} 

const next = function(){
    profilSlide[0].classList.remove('slide__active');
    profilSlide[1].classList.add('slide__active');
    prevBtn.classList.remove('dots-btn__active');
    nextBtn.classList.add('dots-btn__active');
}

const autoPlay = function(){
    if(cur >= profilSlide.length) cur = 0;

    if(cur === 0) prev();
    else next();

    cur++;
}

setInterval(autoPlay,5000);


///////////////////////////////////
// STICKY NAVBAR

const header = document.querySelector('.header');

window.addEventListener('scroll', function(){
    // console.log(this.window.scrollY);
    if(this.window.scrollY > 100){
        header.classList.add('sticky');
    }else{
        header.classList.remove('sticky');
    }
});

/////////////////////////////////////////////
//// SCROLL REACH SECTION

const sections = document.querySelectorAll('section');

const sObserves = function(entries, observe){
    const [entry] = entries;

    if(!entry.isIntersecting) return null;
    
    const id = entry.target.dataset.sec;
    document.querySelector('.nav__active').classList.remove('nav__active');

    document.querySelector(`.sec-${id}`).classList.add('nav__active');
}

const options = function(){
    root: null;
    threshold: 0.2;
}

const secObserve = new IntersectionObserver(sObserves, options);

sections.forEach(s => secObserve.observe(s));

/////////////////////////////////////////////
//// HIDDEN SECTION

const allSections = document.querySelectorAll('.all-section');

const allSeObserve = function(entries, observe){
    const [entry] = entries;

    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section__hidden');
    observe.unobserve(entry.target);
}

const allSecObserve = new IntersectionObserver(allSeObserve, {
    root: null,
    threshold: 0.3
});

allSections.forEach(as => {
    allSecObserve.observe(as);
    as.classList.add('section__hidden');
})

/////////////////////////////////////////////
//// APPEAR CARD OF FORMATION SECTION 

const cards = document.querySelectorAll('.formation-content');

const cObserve = function(entries, observe){
    const [entry] = entries;

    if(!entry.isIntersecting) return;

    entry.target.classList.remove('card__hidden');
    observe.unobserve(entry.target);
}

const cardObserve = new IntersectionObserver(cObserve, {
    root: null,
    threshold: 0.1
});

cards.forEach(c => {
    cardObserve.observe(c);
    c.classList.add('card__hidden');
});

