/**
 * 동아리 보도 자료 모달 제어 스크립트
 * - 0초 초고속 기사 리더 뷰 지원
 * - 원문 웹페이지(iframe) 탭 전환 지원
 * - 글자 크기 확대/축소 (Zoom) 및 전체화면 (Fullscreen) 기능
 */
(() => {
  const modal = document.getElementById('press-modal');
  const openBtn = document.getElementById('open-press-modal');
  if (!modal || !openBtn) return;

  // 페이지 진입 시 모달이 닫힌 상태를 확실히 보장
  if (modal.open) {
    try { modal.close(); } catch (_) { modal.removeAttribute('open'); }
  }

  const readerView = document.getElementById('view-reader');
  const webView = document.getElementById('view-web');
  const tabReader = document.getElementById('tab-reader');
  const tabWeb = document.getElementById('tab-web');

  const iframe = document.getElementById('press-iframe');
  const loading = document.getElementById('press-loading');
  const scaleWrap = document.getElementById('press-frame-scale-wrap');

  const zoomInBtn = modal.querySelector('.press-zoom-in');
  const zoomOutBtn = modal.querySelector('.press-zoom-out');
  const zoomResetBtn = modal.querySelector('.press-zoom-reset');
  const zoomLabel = modal.querySelector('.press-zoom-label');
  const fullscreenBtn = modal.querySelector('.press-fullscreen-btn');
  const fullscreenText = fullscreenBtn.querySelector('.fullscreen-text');
  const closeBtn = modal.querySelector('.press-close-btn');

  const ARTICLE_URL = 'https://www.hani.co.kr/arti/area/capital/1280494.html';
  const MIN_ZOOM = 0.8;
  const MAX_ZOOM = 2.0;
  const ZOOM_STEP = 0.2;
  let currentZoom = 1.0;
  let activeTab = 'reader'; // 'reader' | 'web'

  // 1. 배율 확대 / 축소 적용
  function setZoom(nextZoom) {
    currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(nextZoom * 100) / 100));

    // A. 기사 읽기 모드 (폰트 기본 크기 및 이미지 크기 유기적 조절)
    if (readerView) {
      const basePx = 18 * currentZoom;
      readerView.style.setProperty('--reader-font-base', `${basePx}px`);
      
      const headline = readerView.querySelector('.press-article-headline');
      if (headline) {
        headline.style.fontSize = `calc(32px * ${currentZoom})`;
      }
      const subheadline = readerView.querySelector('.press-article-subheadline');
      if (subheadline) {
        subheadline.style.fontSize = `calc(17px * ${currentZoom})`;
      }
    }

    // B. 원문 웹페이지 모드 (iframe 스케일)
    if (scaleWrap) {
      scaleWrap.style.transform = `scale(${currentZoom})`;
      scaleWrap.style.transformOrigin = 'top left';
      scaleWrap.style.width = `${100 / currentZoom}%`;
      scaleWrap.style.height = `${100 / currentZoom}%`;
    }

    // UI 레이블 갱신
    if (zoomLabel) {
      zoomLabel.textContent = `${Math.round(currentZoom * 100)}%`;
    }
    if (zoomOutBtn) {
      zoomOutBtn.disabled = currentZoom <= MIN_ZOOM;
    }
    if (zoomInBtn) {
      zoomInBtn.disabled = currentZoom >= MAX_ZOOM;
    }
  }

  zoomInBtn?.addEventListener('click', () => setZoom(currentZoom + ZOOM_STEP));
  zoomOutBtn?.addEventListener('click', () => setZoom(currentZoom - ZOOM_STEP));
  zoomResetBtn?.addEventListener('click', () => setZoom(1.0));

  // 2. 탭 전환 (기사 읽기 모드 <-> 원문 웹페이지 모드)
  function switchTab(mode) {
    activeTab = mode;
    if (mode === 'reader') {
      tabReader?.classList.add('is-active');
      tabReader?.setAttribute('aria-selected', 'true');
      tabWeb?.classList.remove('is-active');
      tabWeb?.setAttribute('aria-selected', 'false');

      if (readerView) readerView.style.display = 'block';
      if (webView) webView.classList.remove('is-visible');
    } else {
      tabWeb?.classList.add('is-active');
      tabWeb?.setAttribute('aria-selected', 'true');
      tabReader?.classList.remove('is-active');
      tabReader?.setAttribute('aria-selected', 'false');

      if (readerView) readerView.style.display = 'none';
      if (webView) webView.classList.add('is-visible');

      // 사용자가 원문 탭을 눌렀을 때만 외부 웹사이트 iframe 로드 (최적화)
      if (iframe && !iframe.src) {
        iframe.src = ARTICLE_URL;
        iframe.addEventListener('load', () => {
          loading?.classList.add('is-hidden');
        }, { once: true });
      }
    }
    setZoom(currentZoom);
  }

  tabReader?.addEventListener('click', () => switchTab('reader'));
  tabWeb?.addEventListener('click', () => switchTab('web'));

  // 3. 전체화면 토글
  function syncFullscreenUI() {
    const isFullscreen = document.fullscreenElement === modal || modal.classList.contains('is-expanded');
    fullscreenBtn?.setAttribute('aria-pressed', String(isFullscreen));
    if (fullscreenText) {
      fullscreenText.textContent = isFullscreen ? '전체화면 해제' : '전체화면';
    }
    fullscreenBtn?.setAttribute('title', isFullscreen ? '전체화면 해제 (ESC)' : '전체화면 전환');
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === modal) {
        await document.exitFullscreen();
      } else if (modal.classList.contains('is-expanded')) {
        modal.classList.remove('is-expanded');
      } else if (modal.requestFullscreen) {
        await modal.requestFullscreen();
      } else {
        modal.classList.add('is-expanded');
      }
    } catch {
      modal.classList.toggle('is-expanded');
    }
    syncFullscreenUI();
  }

  fullscreenBtn?.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', syncFullscreenUI);

  // 4. 모달 열기 및 닫기
  function openModal() {
    // 기본적으로 초고속 기사 읽기 모드로 즉시 오픈
    switchTab('reader');
    setZoom(1.0);

    modal.showModal();
    document.body.classList.add('press-modal-open');

    // 모달 본문 스크롤 상단으로 초기화
    const modalBody = modal.querySelector('.press-modal-body');
    if (modalBody) modalBody.scrollTop = 0;

    // 모바일 서랍 메뉴가 열려 있다면 닫기
    if (document.body.classList.contains('menu-open')) {
      const backdrop = document.querySelector('.backdrop');
      if (backdrop) backdrop.click();
    }
  }

  function closeModal() {
    if (document.fullscreenElement === modal) {
      document.exitFullscreen().catch(() => {});
    }
    modal.classList.remove('is-expanded');
    syncFullscreenUI();
    modal.close();
  }

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener('click', closeModal);

  // backdrop 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('press-modal-open');
    if (document.fullscreenElement === modal) {
      document.exitFullscreen().catch(() => {});
    }
    modal.classList.remove('is-expanded');
    syncFullscreenUI();
  });
})();
