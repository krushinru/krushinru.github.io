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

    if (!track || !sourceGroup) return;

    resetTrack(track);

    const viewportWidth = marquee.getBoundingClientRect().width;
    const sourceWidth = sourceGroup.getBoundingClientRect().width;
    const gap = getFlexGap(track);

    if (viewportWidth <= 0 || sourceWidth <= 0) return;

    const distance = sourceWidth + gap;
    let availableWidthAfterLoop = -gap;
    let copies = 1;

    while (availableWidthAfterLoop < viewportWidth && copies < 24) {
      const clone = sourceGroup.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.marqueeClone = 'true';
      disableCloneFocus(clone);
      track.appendChild(clone);

      copies += 1;
      availableWidthAfterLoop = (copies - 1) * sourceWidth + (copies - 2) * gap;
    }

    track.style.setProperty('--accent-marquee-distance', `${Math.ceil(distance)}px`);
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

  document.addEventListener('DOMContentLoaded', initAllMarquees);
  window.addEventListener('resize', debounce(initAllMarquees, 150));

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(initAllMarquees).catch(function () {});
  }
})();
