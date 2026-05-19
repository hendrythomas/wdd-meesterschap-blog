addEventListener('hashchange', (e) => {
  // don't scroll down for sections
  const targetSection = document.querySelector('main > section:target');
  if (targetSection === null) return;

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});