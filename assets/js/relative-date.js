(function () {
  const relativeDateNodes = document.querySelectorAll('time[data-relative-date]');

  if (!relativeDateNodes.length) {
    return;
  }

  const DAY_IN_MS = 24 * 60 * 60 * 1000;

  function parseLocalDate(dateString) {
    if (!dateString) {
      return null;
    }

    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(year, month, day);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  }

  function getCalendarDayStamp(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function getDiffInCalendarDays(from, to) {
    return Math.floor((getCalendarDayStamp(to) - getCalendarDayStamp(from)) / DAY_IN_MS);
  }

  function getDiffInCalendarMonths(from, to) {
    let months = (to.getFullYear() - from.getFullYear()) * 12;
    months += to.getMonth() - from.getMonth();

    if (to.getDate() < from.getDate()) {
      months -= 1;
    }

    return months;
  }

  function getDiffInCalendarYears(from, to) {
    let years = to.getFullYear() - from.getFullYear();

    if (
      to.getMonth() < from.getMonth() ||
      (to.getMonth() === from.getMonth() && to.getDate() < from.getDate())
    ) {
      years -= 1;
    }

    return years;
  }

  function pluralize(value, forms) {
    const absValue = Math.abs(value) % 100;
    const lastDigit = absValue % 10;

    if (absValue > 10 && absValue < 20) {
      return forms[2];
    }

    if (lastDigit === 1) {
      return forms[0];
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return forms[1];
    }

    return forms[2];
  }

  function formatRelativeDate(from, to) {
    const diffDays = getDiffInCalendarDays(from, to);

    if (diffDays < 0) {
      return null;
    }

    if (diffDays === 0) {
      return 'сегодня';
    }

    if (diffDays === 1) {
      return 'вчера';
    }

    if (diffDays < 30) {
      return `${diffDays} ${pluralize(diffDays, ['день', 'дня', 'дней'])}`;
    }

    const diffMonths = Math.max(0, getDiffInCalendarMonths(from, to));

    if (diffMonths < 1) {
      return `${diffDays} ${pluralize(diffDays, ['день', 'дня', 'дней'])}`;
    }

    if (diffMonths < 12) {
      return `${diffMonths} ${pluralize(diffMonths, ['месяц', 'месяца', 'месяцев'])}`;
    }

    const diffYears = getDiffInCalendarYears(from, to);

    if (diffYears < 1) {
      return `${diffMonths} ${pluralize(diffMonths, ['месяц', 'месяца', 'месяцев'])}`;
    }

    return `${diffYears} ${pluralize(diffYears, ['год', 'года', 'лет'])}`;
  }

  function updateRelativeDates() {
    const now = new Date();

    relativeDateNodes.forEach((node) => {
      const publishedAt = parseLocalDate(node.getAttribute('datetime'));

      if (!publishedAt) {
        return;
      }

      const relativeText = formatRelativeDate(publishedAt, now);

      if (relativeText) {
        node.textContent = relativeText;
      }
    });
  }

  updateRelativeDates();
  window.setInterval(updateRelativeDates, 60 * 60 * 1000);
})();
