export function header() {
  const header = document.querySelector("header");
  let headerTop = header.offsetTop;

  function scrollFunc() {
    const scrollTop = window.scrollY;

    if (scrollTop + 0 >= headerTop) { // 숫자가 탑에서 어쩌고...
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  }

  window.addEventListener("scroll", scrollFunc);

  window.addEventListener("resize", () => {
    headerTop = header.offsetTop;
  });

  let links = gsap.utils.toArray("nav ul li a");
  links.forEach((link) => {
    let elem = document.querySelector(link.getAttribute("href"));
    console.log(elem);

    ScrollTrigger.create({
      trigger: elem,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => linkActive(link),
    });

    // nav li 클릭시 해당 위치로 스크롤 이동 + 부드럽게 이동 -------------------------------------------
    link.addEventListener("click", function (e) {
      e.preventDefault();
      linkActive(link);
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: elem,
          offsetY: 80,
        },
        overwrite: "auto",
      });
    });
  });
  // nav 활성화 비활성화-------------------------------------------
  const showNav = gsap
    .from("nav", {
      // yPercent: -200,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 9999,
    onUpdate: (self) => {
      self.direction === -1 ? showNav.play() : showNav.reverse();
    },
  });
  // 버튼 활성화-------------------------------------------
  function linkActive(link) {
    links.forEach((el) => el.classList.remove("on"));
    link.classList.add("on");
  }

  // phon ver. nav -------------------------------------------
  const mobileMeun = document.querySelector(".header__nav_mobile");
  const closeBtn = document.querySelector(".close"); 
  const nav = document.querySelector("nav.header__mobile");
  const filter = document.querySelector('.header__mobile_filter')

  const mediaQuery = window.matchMedia("(max-width: 700px)");
  
  const openMenu = (e) => {
    e.stopPropagation();
    nav.classList.add("on");
    filter.classList.add("on");
  };
  
  const closeMenu = (e) => {
    e.stopPropagation();
    nav.classList.remove("on");
    filter.classList.remove("on");
  };
  
  function handleMobileNav() {
    if (mediaQuery.matches) {
      mobileMeun.addEventListener("click", openMenu);
      closeBtn.addEventListener("click", closeMenu);
    } else {
      nav.classList.remove("on");
      filter.classList.remove("on");
  
      mobileMeun.removeEventListener("click", openMenu);
      closeBtn.removeEventListener("click", closeMenu);
    }
  }
  
  // 초기 실행 및 리사이즈 이벤트 연결
  handleMobileNav();
  window.addEventListener("resize", handleMobileNav);
  
  // 네비게이션 클릭 시 이벤트 전파 방지
  // nav.addEventListener("click", (e) => {
  //   e.stopPropagation();
  // });
  
}
