window.addEventListener('DOMContentLoaded', () => {
   initMobileNav();
   initFixedHeader();
   initSmoothScroll();
});

// Mobile Navigation
const initMobileNav = () => {
   const navOpener = document.getElementById('opener');
   const navCloser = document.getElementById('closer');
   const navLinks = document.querySelectorAll('.navbar a');
   const navBar = document.querySelector('.navbar');

   const bodyClass = () => {
      if (!document.body.classList.contains('nav-active')) {
         return;
      } else if (document.body.classList.contains('nav-active')) {
         document.body.classList.remove('nav-active');
      }
   };

   // show menu
   navOpener.addEventListener('click', () => {
      document.body.classList.add('nav-active');
      document.body.style.overflow = 'hidden';
   });

   // hide menu
   navCloser.addEventListener('click', () => {
      bodyClass();
      document.body.style.overflow = 'auto';
   });

   // hide menu on link click
   navLinks.forEach((link) => {
      link.addEventListener('click', () => {
         document.body.classList.remove('nav-active');
      });
   });

   // hide menu on outside click
   // document.addEventListener('click', (e) => {
   //    if (
   //       document.body.classList.contains('nav-active') &&
   //       !e.target.isEqualNode(navOpener) &&
   //       !e.target.isEqualNode(navCloser) &&
   //       !e.target.isEqualNode(navBar) &&
   //       !navBar.contains(e.target)
   //    ) {
   //       document.body.classList.remove('nav-active');
   //       console.log('clicked outside');
   //    }
   // });
};

//fixed header
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

// smooth scroll
const initSmoothScroll = () => {
   const navLinks = document.querySelectorAll('.navbar a');
   const sections = document.querySelectorAll('section[id]');

   window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
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
