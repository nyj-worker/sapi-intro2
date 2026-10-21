/**
 * 이미지 갤러리 모달 제어 스크립트
 * - 시정소식지 웹툰 모달
 * - 시무식 · 다산 정약용 위대한 도약 모달
 * - 신년인사회 · 다산이 전하는 새해 인사 모달
 */
(() => {
  function createGallery({ id, titles, eyebrow, title, slides, altPrefix }) {
    const titleSet = new Set(titles);
    const cards = [...document.querySelectorAll('.project-card')].filter(card =>
      titleSet.has(card.querySelector('h3')?.textContent?.trim())
    );
    if (!cards.length) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'gallery-modal';
    dialog.id = id;
    dialog.setAttribute('aria-labelledby', `${id}-title`);
    dialog.innerHTML = `<div class="gallery-header"><div><span class="gallery-eyebrow">${eyebrow}</span><h2 id="${id}-title">${title}</h2></div><div class="gallery-actions"><div class="gallery-zoom" role="group" aria-label="이미지 확대 비율"><button type="button" class="gallery-zoom-out" aria-label="이미지 축소">−</button><select class="gallery-zoom-select" aria-label="이미지 확대 비율 선택"><option value="1">100%</option><option value="1.25">125%</option><option value="1.5">150%</option><option value="2">200%</option><option value="2.5">250%</option><option value="3">300%</option><option value="4">400%</option></select><button type="button" class="gallery-zoom-in" aria-label="이미지 확대">+</button><button type="button" class="gallery-zoom-reset" aria-label="화면에 맞추기" title="화면에 맞추기">↺</button></div><button type="button" class="gallery-fullscreen" aria-pressed="false">전체화면</button><button type="button" class="gallery-close" aria-label="이미지 모달 닫기" autofocus>×</button></div></div><div class="gallery-stage" aria-roledescription="캐러셀" aria-label="${eyebrow} 이미지"><button type="button" class="gallery-prev" aria-label="이전 이미지">‹</button><div class="gallery-slides">${slides.map((_, i) => `<div class="gallery-slide" role="group" aria-roledescription="슬라이드" aria-label="${i + 1} / ${slides.length}" ${i ? 'hidden' : ''}><img class="gallery-image" alt="${altPrefix} ${i + 1}번째 이미지" decoding="async" draggable="false"><p class="gallery-error" hidden>이미지를 불러오지 못했습니다. 잠시 후 다시 열어 주세요.</p></div>`).join('')}</div><button type="button" class="gallery-next" aria-label="다음 이미지">›</button></div><div class="gallery-footer"><span class="gallery-counter" aria-live="polite" aria-atomic="true">1 / ${slides.length}</span><div class="gallery-dots" role="group" aria-label="이미지 선택">${slides.map((_, i) => `<button type="button" aria-label="${i + 1}번째 이미지 보기" aria-pressed="${i === 0}" data-slide="${i}"></button>`).join('')}</div></div>`;

    document.body.append(dialog);

    const panels = [...dialog.querySelectorAll('.gallery-slide')];
    const dots = [...dialog.querySelectorAll('[data-slide]')];
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, opener = null;
    let zoom = 1, panX = 0, panY = 0;
    const viewport = dialog.querySelector('.gallery-slides');
    const zoomSelect = dialog.querySelector('.gallery-zoom-select');
    const zoomIn = dialog.querySelector('.gallery-zoom-in');
    const zoomOut = dialog.querySelector('.gallery-zoom-out');

    function applyZoom() {
      const img = panels[index].querySelector('img');
      const width = viewport.clientWidth, height = viewport.clientHeight;
      const ratio = img.naturalWidth && img.naturalHeight ? Math.min(width / img.naturalWidth, height / img.naturalHeight) : 0;
      const maxX = Math.max(0, (img.naturalWidth * ratio * zoom - width) / 2);
      const maxY = Math.max(0, (img.naturalHeight * ratio * zoom - height) / 2);
      panX = Math.max(-maxX, Math.min(maxX, panX));
      panY = Math.max(-maxY, Math.min(maxY, panY));
      img.style.transform = `translate(${panX}px,${panY}px) scale(${zoom})`;
      viewport.classList.toggle('is-zoomed', zoom > 1);
      const value = String(zoom);
      zoomSelect.querySelector('[data-custom]')?.remove();
      if (![...zoomSelect.options].some(option => option.value === value)) {
        const option = new Option(`${Math.round(zoom * 100)}%`, value);
        option.dataset.custom = 'true';
        zoomSelect.add(option);
      }
      zoomSelect.value = value;
      zoomIn.disabled = zoom >= 4;
      zoomOut.disabled = zoom <= 1;
    }

    function setZoom(next, clientX, clientY) {
      const value = Math.max(1, Math.min(4, Math.round(next * 100) / 100));
      if (clientX !== undefined && zoom !== value) {
        const bounds = viewport.getBoundingClientRect();
        const x = clientX - bounds.left - bounds.width / 2;
        const y = clientY - bounds.top - bounds.height / 2;
        panX = x - (x - panX) * value / zoom;
        panY = y - (y - panY) * value / zoom;
      }
      zoom = value;
      if (zoom === 1) panX = panY = 0;
      applyZoom();
    }

    zoomIn.addEventListener('click', () => setZoom(zoom + 0.25));
    zoomOut.addEventListener('click', () => setZoom(zoom - 0.25));
    zoomSelect.addEventListener('change', () => setZoom(Number(zoomSelect.value)));
    dialog.querySelector('.gallery-zoom-reset').addEventListener('click', () => setZoom(1));
    new ResizeObserver(() => { if (dialog.open) applyZoom(); }).observe(viewport);

    panels.forEach(panel =>
      panel.querySelector('img').addEventListener('load', () => {
        if (panel === panels[index]) applyZoom();
      })
    );

    const fullscreenButton = dialog.querySelector('.gallery-fullscreen');
    function syncFullscreen() {
      const expanded = document.fullscreenElement === dialog || dialog.classList.contains('is-expanded');
      fullscreenButton.textContent = expanded ? '전체화면 해제' : '전체화면';
      fullscreenButton.setAttribute('aria-pressed', String(expanded));
    }

    fullscreenButton.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement === dialog) await document.exitFullscreen();
        else if (dialog.classList.contains('is-expanded')) dialog.classList.remove('is-expanded');
        else if (dialog.requestFullscreen) await dialog.requestFullscreen();
        else dialog.classList.add('is-expanded');
      } catch {
        dialog.classList.add('is-expanded');
      }
      syncFullscreen();
    });

    document.addEventListener('fullscreenchange', syncFullscreen);

    function showSlide(next) {
      index = (next + slides.length) % slides.length;
      panels.forEach((panel, i) => { panel.hidden = i !== index; });
      const img = panels[index].querySelector('img');
      if (!img.getAttribute('src')) img.src = slides[index];
      dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
      dialog.querySelector('.gallery-counter').textContent = `${index + 1} / ${slides.length}`;
      setZoom(1);
      if (!reduceMotion.matches) img.animate([{ opacity: 0.25 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
    }

    panels.forEach(panel =>
      panel.querySelector('img').addEventListener('error', () => {
        panel.querySelector('.gallery-error').hidden = false;
      })
    );

    cards.forEach(card => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'gallery-trigger';
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-controls', dialog.id);
      button.setAttribute('aria-label', `${eyebrow} 이미지 모아보기`);
      button.innerHTML = '이미지 보기 <b aria-hidden="true">↗</b>';
      const pending = card.querySelector('.pending');
      if (pending) pending.replaceWith(button);
      else card.querySelector('.card-bottom').append(button);

      button.addEventListener('click', () => {
        opener = button;
        showSlide(0);
        dialog.showModal();
        document.body.classList.add('gallery-open');
      });
    });

    dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.gallery-prev').addEventListener('click', () => showSlide(index - 1));
    dialog.querySelector('.gallery-next').addEventListener('click', () => showSlide(index + 1));
    dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.slide))));

    dialog.addEventListener('keydown', event => {
      if (event.target.matches('select,input') || event.ctrlKey || event.metaKey) return;
      if (event.key === '+' || event.key === '=') { event.preventDefault(); setZoom(zoom + 0.25); }
      if (event.key === '-') { event.preventDefault(); setZoom(zoom - 0.25); }
      if (event.key === '0') { event.preventDefault(); setZoom(1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(index - 1); }
    });

    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close();
      }
    });

    dialog.addEventListener('close', () => {
      if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
      dialog.classList.remove('is-expanded');
      syncFullscreen();
      document.body.classList.remove('gallery-open');
      opener?.focus({ preventScroll: true });
    });

    viewport.addEventListener('wheel', event => {
      event.preventDefault();
      setZoom(zoom * Math.exp(-Math.max(-80, Math.min(80, event.deltaY)) * 0.003), event.clientX, event.clientY);
    }, { passive: false });

    viewport.addEventListener('dblclick', event => setZoom(zoom > 1 ? 1 : 2, event.clientX, event.clientY));

    const pointers = new Map();
    let startPoint = null, pinched = false, previousPinch = null;

    viewport.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      viewport.setPointerCapture(event.pointerId);
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 1) { startPoint = { x: event.clientX, y: event.clientY, zoom }; pinched = false; }
      if (pointers.size > 1) { pinched = true; previousPinch = null; }
      viewport.classList.add('is-dragging');
    });

    viewport.addEventListener('pointermove', event => {
      const old = pointers.get(event.pointerId);
      if (!old) return;
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const current = { distance: Math.hypot(a.x - b.x, a.y - b.y), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        if (previousPinch && previousPinch.distance > 0) {
          setZoom(zoom * current.distance / previousPinch.distance, current.x, current.y);
          panX += current.x - previousPinch.x;
          panY += current.y - previousPinch.y;
          applyZoom();
        }
        previousPinch = current;
      } else if (pointers.size === 1 && zoom > 1) {
        panX += event.clientX - old.x;
        panY += event.clientY - old.y;
        applyZoom();
      }
    });

    function endPointer(event) {
      if (!pointers.has(event.pointerId)) return;
      const swipe = event.type === 'pointerup' && !pinched && pointers.size === 1 && zoom === 1 && startPoint?.zoom === 1;
      pointers.delete(event.pointerId);
      previousPinch = null;
      if (!pointers.size) {
        viewport.classList.remove('is-dragging');
        if (swipe && event.pointerType !== 'mouse') {
          const dx = event.clientX - startPoint.x, dy = event.clientY - startPoint.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) showSlide(index + (dx < 0 ? 1 : -1));
        }
        startPoint = null;
      }
    }

    viewport.addEventListener('pointerup', endPointer);
    viewport.addEventListener('pointercancel', endPointer);
    viewport.addEventListener('lostpointercapture', endPointer);
  }

  // 1. 기존 시정소식지 교통국 정책홍보 웹툰 모달
  createGallery({
    id: 'newsletter-gallery',
    titles: ['교통국 정책 홍보 웹툰 · 시정 소식지', '시정소식지(교통국 정책홍보 웹툰)'],
    eyebrow: '시정소식지 · 교통국 정책홍보 웹툰',
    title: '이미지 모아보기',
    slides: ['img/info1.jpg', 'img/info2.jpg', 'img/info3.jpg'],
    altPrefix: '시정소식지 교통국 정책홍보 웹툰'
  });

  // 2. 신규 시무식 · 다산 정약용 위대한 도약 모달
  createGallery({
    id: 'dasan-gallery',
    titles: ['시무식 · 다산 정약용 위대한 도약'],
    eyebrow: '2026 시무식 · AI 영상',
    title: '이미지 모아보기',
    slides: [
      'img/dasan/dasan01.jpg',
      'img/dasan/dasan02.jpg',
      'img/dasan/dasan03.jpg',
      'img/dasan/dasan04.jpg',
      'img/dasan/dasan05.jpg'
    ],
    altPrefix: '시무식 다산 정약용 위대한 도약'
  });

  // 3. 신규 신년인사회 · 다산이 전하는 새해 인사 모달
  createGallery({
    id: 'new-year-gallery',
    titles: ['신년인사회 · 다산이 전하는 새해 인사'],
    eyebrow: '2026 신년인사회 · AI 영상',
    title: '이미지 모아보기',
    slides: [
      'img/new_year/new01.jpg',
      'img/new_year/new02.jpg',
      'img/new_year/new03.jpg',
      'img/new_year/new04.jpg',
      'img/new_year/new05.jpg'
    ],
    altPrefix: '신년인사회 다산이 전하는 새해 인사'
  });
})();

