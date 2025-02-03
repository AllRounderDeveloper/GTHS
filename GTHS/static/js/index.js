document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.navbar-top');
    const nav = document.querySelector('.navbar-bottom');
    const MainNav = document.querySelector('.nav');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 200) {
            // Scrolling down
            header.classList.add('navbar-top-scroll');
            nav.classList.add('navbar-bottom-scroll');
        } else {
            // Scrolling up
            header.classList.remove('navbar-top-scroll');
            nav.classList.remove('navbar-bottom-scroll');
        }
    });
});

const navbarBotom = document.querySelectorAll('.nav-item');
const navbarFocus = document.querySelectorAll('.nav-item-focus');

navbarBotom.addEventListener('click', ()=>{
    navbarBotom.classList.add('nav-item-focus')
})