(function () {
  function getFlexGap(element) {
    const styles = window.getComputedStyle(element);
    const gap = parseFloat(styles.columnGap || styles.gap);
    return Number.isFinite(gap) ? gap : 0;
  }

  function disableCloneFocus(group) {
    group.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((element) => {
      element.setAttribute('tabindex', '-1');
    });
  }

  function resetTrack(track) {
    track.querySelectorAll('[data-marquee-clone="true"]').forEach((clone) => clone.remove());
    track.style.removeProperty('--accent-marquee-distance');
  }

  function initMarquee(marquee) {
    const track = marquee.querySelector('[data-marquee-track]');
    const sourceGroup = marquee.querySelector('[data-marquee-group]');
    const viewport = marquee.querySelector('.accent-marquee__fullbleed');

    if (!track || !sourceGroup || !viewport) return;

    marquee.removeAttribute('data-marquee-ready');
    resetTrack(track);

    const viewportWidth = viewport.getBoundingClientRect().width;
    const sourceWidth = sourceGroup.getBoundingClientRect().width;
    const gap = getFlexGap(track);

    if (viewportWidth <= 0 || sourceWidth <= 0) return;

    const distance = sourceWidth + gap;
    const copies = Math.max(
      2,
      Math.ceil(1 + ((viewportWidth + gap) / distance))
    );

    for (let index = 1; index < copies; index += 1) {
      const clone = sourceGroup.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.marqueeClone = 'true';
      disableCloneFocus(clone);
      track.appendChild(clone);
    }

    track.style.setProperty('--accent-marquee-distance', `${distance.toFixed(3)}px`);
    marquee.setAttribute('data-marquee-ready', 'true');
  }

  function initAllMarquees() {
    document.querySelectorAll('.accent-marquee').forEach(initMarquee);
  }

  function debounce(callback, delay) {
    let timeoutId;

    return function () {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(callback, delay);
    };
  }

  function startMarquees() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initAllMarquees).catch(initAllMarquees);
      return;
    }

    initAllMarquees();
  }

  document.addEventListener('DOMContentLoaded', startMarquees);
  window.addEventListener('resize', debounce(initAllMarquees, 150));
})();
