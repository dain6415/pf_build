// vite.config.js

export default {
  root: './',  // 프로젝트 루트 경로 설정 (기본값은 './'이지만 명시적으로 설정할 수도 있습니다)
  build: {
    outDir: 'dist', // 빌드 결과물이 저장될 폴더를 dist로 설정
    emptyOutDir: true,  // 기존 dist 폴더를 비우고 새로운 빌드를 생성
  },
};
