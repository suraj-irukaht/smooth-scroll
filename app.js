document.addEventListener('DOMContentLoaded', () => {
   initMobileNav();
   initUpdateHeight();
   initSmoothScroll();
   initSetActiveSection();
});
const initFixedHeader = () => {
   const header = document.querySelector('.header');

   window.addEventListener('scroll', () => {
      if (scrollY > 0) {
         header.classList.add('fixed');
      } else {
         header.classList.remove('fixed');
      }
   });
};

const initMobileNav = () => {
   const body = document.body;
   const navOpener = document.querySelector('.nav-opener');
   const navCloser = document.querySelector('.nav-closer');
   const noScrollClass = 'no--scroll';
   const navActiveClass = 'nav-active';

   const showMenu = (e) => {
      e.preventDefault();
      body.classList.toggle(navActiveClass);

      // when there is only one button
      // body.classList.contains(navActiveClass)
      //    ? body.classList.add(noScrollClass)
      //    : body.classList.remove(noScrollClass);
   };
   const hideMenu = (e) => {
      e.preventDefault();
      if (body.classList.contains(navActiveClass)) {
         body.classList.remove(navActiveClass);
         body.classList.remove(noScrollClass);
      }
   };

   navOpener.addEventListener('click', showMenu);
   navCloser.addEventListener('click', hideMenu);
};

const initUpdateHeight = () => {
   const root = document.querySelector(':root');
   const header = document.querySelector('.header');
   let headerHeight;
   const getHeight = () => {
      headerHeight = header?.clientHeight;
      root.style.setProperty('--header-height', `${headerHeight}px`);
   };
   getHeight();
   window.addEventListener('resize', getHeight);
};

const initSmoothScroll = () => {
   const menuLinks = document.querySelectorAll('.navbar a');
   const header = document.querySelector('.header');
   const body = document.body;
   let headerHeight;
   const getHeight = () => {
      headerHeight = header?.clientHeight;
   };
   getHeight();
   window.addEventListener('resize', getHeight);
   //removing class on click on each link and adding scroll
   menuLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
         e.preventDefault();
         if (body.classList.contains('nav-active')) {
            body.classList.remove('nav-active');
            body.classList.remove('no--scroll');
         }

         const value = link.getAttribute('href');
         const itSection = document.querySelector(value);
         const offsetTop = itSection.offsetTop;
         window.scrollTo(0, `${offsetTop - headerHeight}`);
      });
   });
};

const initSetActiveSection = () => {
   const navLinks = document.querySelectorAll('.navbar a');
   const sections = document.querySelectorAll('section[id]');

   window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      let sectionId = '';
      sections.forEach((section) => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.clientHeight;

         if (scrollY >= sectionTop - sectionHeight / 3) {
            // add and remove classes on section

            sections.forEach((sec) => sec.classList.remove('active-section'));
            if (!section.classList.contains('active-section')) {
               section.classList.add('active-section');
            }
            //getting id of active section
            sectionId = section.getAttribute('id');
         }
      });

      navLinks.forEach((link) => {
         link.classList.remove('active-link');
         if (link.classList.contains(sectionId)) {
            link.classList.add('active-link');
         }
      });
   });
};
