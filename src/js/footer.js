export function footer() {
  const footerInner = document.querySelector('#footer .sect_inner');
  
  // 푸터 초기 상태: 화면 아래에 위치시키기 (translateY(100%))
  footerInner.style.transform = 'translateY(100%)';
  footerInner.style.transition = 'transform 0.5s ease-in-out'; // 애니메이션 효과

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY; // 현재 스크롤 위치
    const windowHeight = window.innerHeight; // 현재 화면 높이
    const footerOffset = footerInner.offsetTop; // 푸터의 상단 위치

    // 푸터가 화면에 보이기 시작하면
    if (scrollY + windowHeight > footerOffset) {
      footerInner.style.transform = 'translateY(0%)'; // 푸터가 화면에 보이도록
    } else {
      footerInner.style.transform = 'translateY(100%)'; // 화면 아래로 내려가도록
    }
  });
}
