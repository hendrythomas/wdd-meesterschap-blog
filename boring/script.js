document.addEventListener('hashchange', (e) => {
  // don't scroll down for sections
  const targetSection = document.querySelector('main > section:target');
  if (targetSection === null) return;

  window.scrollTo(0, 0);
});

document.addEventListener('click'), (e) => {
  // if ('copyId' in e.target.dataset) {
  //   alert('yay')
  // }
}