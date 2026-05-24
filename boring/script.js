document.addEventListener('DOMContentLoaded', () => {
  setRefreshStyle();
});

addEventListener('hashchange', () => {
  preventSectionTargetScroll();
  highlightActiveLinks();
  hideEmptyHash();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Delete') {
    document.documentElement.classList.remove('styled');
  }
});

function setRefreshStyle() {
  document.documentElement.classList.add('refresh');
  setTimeout(() => {
    document.documentElement.classList.remove('refresh');
  }, 1000);
}

function preventSectionTargetScroll() {
  if (!document.documentElement.classList.contains('styled')) return;

  const targetSection = document.querySelector('main > section:target');
  if (targetSection === null) return;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });
}

function highlightActiveLinks() {
  // remove old highlights
  const oldActiveLinks = document.querySelectorAll('a.active');
  for (const activeLink of oldActiveLinks) {
    activeLink.classList.remove('active');
  }

  const activeLinks = document.querySelectorAll(`a[href="${location.hash}"]`);
  for (const activeLink of activeLinks) {
    activeLink.classList.add('active');
  }
}

function hideEmptyHash() {
  if (location.hash !== '') return;

  history.replaceState({}, '', ' ');
}