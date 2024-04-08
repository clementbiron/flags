document.addEventListener('DOMContentLoaded', () => {
  const regionNamesInUserLanguage = new Intl.DisplayNames([window.navigator.language], { type: 'region' });
  document.querySelectorAll('.country-flag').forEach((el) => {
    el.setAttribute('title', regionNamesInUserLanguage.of(el.getAttribute('title')));
  });
});
