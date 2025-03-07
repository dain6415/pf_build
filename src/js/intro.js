import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export function intro() {
  // 초기 opacity 설정
  gsap.set("#intro .sticker", { opacity: 0 });

  // 등장 애니메이션
  gsap.to("#intro .sticker", {
    opacity: 1,
    stagger: { each: 0.1, from: "start" },
  });

  // 각 화면 크기별 초기 위치 및 rotate 값 저장
  const initialData = {
    desktop: [],
    tablet: [],
    mobile: [],
  };

  function storeInitialData() {
    document.querySelectorAll("#intro .sticker").forEach((sticker, index) => {
      const rect = sticker.getBoundingClientRect();

      if (window.innerWidth >= 1024) {
        initialData.desktop[index] = { x: rect.left, y: rect.top, rotate: 0 };
      } else if (window.innerWidth >= 768) {
        initialData.tablet[index] = { x: rect.left, y: rect.top, rotate: 20 };
      } else {
        initialData.mobile[index] = { x: rect.left, y: rect.top, rotate: 45 };
      }
    });
  }

  function applyInitialData() {
    let data;

    if (window.innerWidth >= 1024) {
      data = initialData.desktop;
    } else if (window.innerWidth >= 768) {
      data = initialData.tablet;
    } else {
      data = initialData.mobile;
    }

    data.forEach((item, index) => {
      const sticker = document.querySelectorAll("#intro .sticker")[index];
      if (item) {
        gsap.set(sticker, { x: item.x, y: item.y, rotate: item.rotate });
      }
    });
  }

  // 초기화 순서: 페이지 로드 시 실행
  window.addEventListener("load", () => {
    storeInitialData();
    applyInitialData();
  });

  // 화면 크기 변경 시 위치 및 rotate 재조정
  window.addEventListener("resize", applyInitialData);

  // 드래그 설정
  Draggable.create("#intro .sticker", {
    type: "x,y",
    // bounds: "#intro",
    // 드래그 가능한 영역 제한 (필요시 활성화)
    inertia: true, // 관성 효과
    onPress: function () {
      // 드래그 시작 시 현재 위치와 각도를 동기화
      gsap.set(this.target, {
        x: gsap.getProperty(this.target, "x"),
        y: gsap.getProperty(this.target, "y"),
        rotate: gsap.getProperty(this.target, "rotate"),
      });
    },
    onDragStart: function () {
      console.log("드래그 시작");
      this.target.style.zIndex = "100"; // 드래그 중 요소를 위로 올림
    },
    onDragEnd: function () {
      console.log("드래그 종료");
      this.target.style.zIndex = ""; // zIndex 초기화
    },
  });
}
