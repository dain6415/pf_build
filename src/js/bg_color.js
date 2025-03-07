import gsap from "../../node_modules/.vite/deps/gsap.js?v=8ce3b243";
import ScrollTrigger from "../../node_modules/.vite/deps/gsap_ScrollTrigger.js?v=8ce3b243";

export function bgColor() {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('section').forEach(item => {
    let color = item.getAttribute('data-bg'); 

    // ScrollTrigger 설정
    ScrollTrigger.create({
      trigger: item, // 각 section을 트리거로 설정
      start: "top 80%", // section의 top이 화면의 top에 닿을 때
      end: "bottom 20%", // section의 bottom이 화면의 top에 닿을 때
      scrub: true, // 스크롤에 따라 배경색이 자연스럽게 바뀌도록 설정

      onEnter: () => gsap.to('body', {
        backgroundColor: color, 
        // duration: 0.5
      }),

      onEnterBack: () => gsap.to('body', {
        backgroundColor: color, 
        // duration: 0.5
      })
    });
  });
}
