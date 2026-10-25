(() => {
  'use strict';
  const root = document.querySelector('.city-map');
  if (!root) return;
  const read = id => JSON.parse(document.getElementById(id).textContent);
  const original = read('map-places');
  const translations = read('map-translations') || {};
  const ui = read('map-ui');
  const english = root.dataset.lang === 'en';
  const places = original.map((place, id) => ({ ...place, ...(english ? translations[`${place.lat},${place.lon}`] : {}), id }));
  const list = document.getElementById('place-list');
  const detail = document.getElementById('place-detail');
  const search = document.getElementById('place-search');
  const status = document.getElementById('map-status');
  const filters = [...root.querySelectorAll('[data-category]')];
  let category = 'all', map, userMarker, selected = null;
  const markers = new Map();
  const normalize = value => String(value || '').toLocaleLowerCase().replace(/ё/g, 'е').normalize('NFKD');
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const icon = category => {
    const img = element('img');
    img.src = `/assets/images/map/${category}.png`;
    img.alt = ''; img.width = 32; img.height = 32;
    return img;
  };
  const visible = () => places.filter(p => (category === 'all' || p.category === category) &&
    normalize([p.name, p.address, p.description, original[p.id].name, original[p.id].address].join(' ')).includes(normalize(search.value.trim())));
  const link = (text, url) => {
    const a = element('a', text);
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:', 'tel:'].includes(parsed.protocol)) return a;
      a.href = parsed.href;
      if (parsed.protocol !== 'tel:') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    } catch (_) { return a; }
    return a;
  };
  function closeDetail() {
    detail.hidden = true; selected = null;
    markers.forEach(marker => marker.getElement().setAttribute('aria-pressed', 'false'));
    list.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', 'false'));
  }
  function showPlace(place, focus = true) {
    selected = place.id;
    detail.replaceChildren(); detail.hidden = false;
    const close = element('button', ui.close, 'city-map__close');
    close.type = 'button'; close.addEventListener('click', () => {
      closeDetail();
      list.querySelector(`[data-place="${place.id}"]`)?.focus();
    });
    const heading = element('h2', place.name);
    const info = element('div', '', 'city-map__description');
    info.append(element('p', ui.categories[place.category], 'city-map__eyebrow'), heading,
      element('p', place.subtitle, 'city-map__subtitle'), element('p', place.description), element('p', place.address, 'city-map__address'));
    const extra = element('div', '', 'city-map__extra');
    if (place.schedule?.length) {
      extra.append(element('h3', ui.hours));
      const hours = element('ul');
      const days = {'Понедельник':'Monday','Вторник':'Tuesday','Среда':'Wednesday','Четверг':'Thursday','Пятница':'Friday','Суббота':'Saturday','Воскресенье':'Sunday','Ежедневно':'Daily'};
      place.schedule.forEach(([day, start, end]) => {
        const label = english ? day.split('-').map(d => days[d] || d).join('–') : day.replace('-', '–');
        hours.append(element('li', `${label}: ${start}–${end}`));
      });
      extra.append(hours);
    }
    const links = element('div', '', 'city-map__links');
    links.append(link(english ? 'Yandex Maps ↗' : 'Яндекс Карты ↗', `https://yandex.ru/maps/?pt=${place.lon},${place.lat}&z=17&l=map`),
      link('Google Maps ↗', `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`),
      link('2GIS ↗', `https://2gis.ru/geo/${place.lon},${place.lat}`));
    extra.append(links);
    if (place.booking_link) extra.append(link((place.custom_button || ui.booking) + ' ↗', place.booking_link));
    detail.append(close, info, extra);
    list.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.place) === selected)));
    markers.forEach((marker, id) => marker.getElement().setAttribute('aria-pressed', String(id === selected)));
    if (map) map.flyTo({ center: [place.lon, place.lat], zoom: 15.5, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700 });
    if (focus) { detail.focus({ preventScroll: true }); detail.scrollIntoView({ behavior: 'instant', block: 'nearest' }); }
  }
  function render() {
    const results = visible();
    list.replaceChildren();
    document.getElementById('place-count').textContent = ui.count + results.length + ' / ' + places.length;
    document.getElementById('place-empty').hidden = results.length !== 0;
    if (selected !== null && !results.some(p => p.id === selected)) closeDetail();
    results.forEach(place => {
      const button = element('button', '', 'city-map__place');
      button.type = 'button'; button.dataset.place = place.id;
      button.setAttribute('aria-pressed', String(selected === place.id));
      const text = element('span');
      text.append(element('strong', place.name), element('small', place.address));
      button.append(icon(place.category), text, element('span', '↗'));
      button.addEventListener('click', () => showPlace(place)); list.append(button);
    });
    markers.forEach((marker, id) => { marker.getElement().hidden = !results.some(p => p.id === id); });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
  }
  search.addEventListener('input', render);
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.category; render(); }));
  function fitPlaces() {
    if (!map) return;
    const bounds = new maplibregl.LngLatBounds();
    visible().forEach(p => bounds.extend([p.lon, p.lat]));
    if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 55, maxZoom: 14, duration: 0 });
  }
  document.getElementById('map-reset').addEventListener('click', () => { category = 'all'; search.value = ''; closeDetail(); render(); fitPlaces(); });
  document.getElementById('map-locate').addEventListener('click', () => {
    if (!map || !navigator.geolocation) { status.textContent = ui.locationError; return; }
    status.textContent = ui.locating;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if (coords.latitude < 55.4 || coords.latitude > 56.1 || coords.longitude < 36.7 || coords.longitude > 38.5) { status.textContent = ui.outside; return; }
      userMarker?.remove();
      userMarker = new maplibregl.Marker({ color: '#315efb' }).setLngLat([coords.longitude, coords.latitude]).addTo(map);
      map.flyTo({ center: [coords.longitude, coords.latitude], zoom: 14, duration: 0 });
      status.textContent = ui.located;
    }, () => { status.textContent = ui.locationError; }, { timeout: 10000, maximumAge: 60000 });
  });
  render();
  try {
    map = new maplibregl.Map({
      container: 'city-map', center: [37.615, 55.752], zoom: 11.5, minZoom: 9, maxZoom: 19,
      attributionControl: false, renderWorldCopies: false,
      locale: english ? {} : { 'NavigationControl.ZoomIn': 'Приблизить', 'NavigationControl.ZoomOut': 'Отдалить', 'Map.Title': 'Карта' },
      style: { version: 8, sources: { osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, maxzoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors' } },
        layers: [{ id: 'osm', type: 'raster', source: 'osm', paint: { 'raster-saturation': -0.65 } }] }
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-right');
    map.scrollZoom.disable();
    map.on('error', () => { status.textContent = ui.tileError; });
    map.on('load', () => { status.textContent = ui.ready; });
    places.forEach(place => {
      const button = element('button', '', 'city-map__marker');
      button.type = 'button'; button.setAttribute('aria-label', `${place.name}, ${place.address}`);
      button.setAttribute('aria-pressed', 'false'); button.append(icon(place.category));
      button.addEventListener('click', () => showPlace(place));
      markers.set(place.id, new maplibregl.Marker({ element: button }).setLngLat([place.lon, place.lat]).addTo(map));
    });
    fitPlaces(); render();
  } catch (_) {
    map?.remove(); map = null;
    status.textContent = ui.error;
    document.getElementById('map-locate').disabled = true;
  }
})();
