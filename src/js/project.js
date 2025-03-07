export function project() {
  $(document).ready(function() {
    const $vBtn = $(".info a.view_btn");
    const $visualImg = $(".visual .img_bg");
  
    // 화면 크기 체크하고 적절히 이벤트 추가/제거
    function handleResize() {
      if ($(window).width() > 701) {
        // 701px 이상일 때만 호버 이벤트 추가
        $vBtn.each(function(index) {
          $(this).on("mouseenter", function() {
            $visualImg.eq(index).css("filter", "grayscale(0%)");
          });
  
          $(this).on("mouseleave", function() {
            $visualImg.eq(index).css("filter", "grayscale(100%)");
          });
        });
  
        // 701px 이상에서는 기본적으로 흑백 필터 적용
        $visualImg.css("filter", "grayscale(100%)");
      } else {
        // 700px 이하일 때는 이미지가 컬러 상태로 유지되고, 호버 이벤트 제거
        $visualImg.css("filter", "grayscale(0%)"); 
        $vBtn.off("mouseenter mouseleave"); 
      }
    }
    handleResize(); // 초기 상태 설정
    $(window).on("resize", handleResize); // 창 크기 변경 시 이벤트 처리
  });
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // 아코디언
  gsap.registerPlugin(ScrollTrigger);

  const aritBox = gsap.utils.toArray(".article_box");
  const sWrap = document.querySelector(".sect__wrap");

  function getHeaderHeight() {
    return document.querySelector("#header").getBoundingClientRect().height - 1; // 헤더 높이 실시간 계산
  }

  function updateAccordionHeight() {
    // 마지막 아코디언의 .vlsual이 확장된 상태에서 높이 계산
    let totalHeight = 0;
    // 아코디언의 각 항목을 기준으로 높이를 업데이트하는 역할

    aritBox.forEach((item) => {
      const contentHeight = item.scrollHeight; // 실제 내용 높이
      totalHeight += contentHeight;
      // contentHeight 값을 가져와 모든 항목의 총 높이 구하기
    });
    // .sWrap 높이 = 총 높이
    sWrap.style.height = totalHeight + "px";
  }

  // 아코디언 애니메이션 설정
  aritBox.forEach((item, i) => {
    const header = item.querySelector(".header__title");

    gsap.to(aritBox, {
      // height: "0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: item,
        start: () => `top ${getHeaderHeight() + header.clientHeight * 2 * i}`,
        endTrigger: "#work",
        end: "top",
        // end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        id: i + 1,
        onUpdate: updateAccordionHeight, // 높이 업데이트
        markers: { indent: 0 * i },
      },
    });
  });

  // 초기 높이 설정
  updateAccordionHeight();
}
