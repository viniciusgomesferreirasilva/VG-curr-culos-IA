const menu = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

const imageDialog = document.querySelector('#image-dialog');
const expandedImage = document.querySelector('#expanded-image');
document.querySelectorAll('.photo-open').forEach(button => {
  button.addEventListener('click', () => {
    expandedImage.src = button.dataset.image;
    expandedImage.alt = button.querySelector('img').alt;
    imageDialog.showModal();
  });
});
document.querySelector('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target === imageDialog) imageDialog.close();
});

document.querySelectorAll('[data-plan-filter]').forEach(button => {
 button.addEventListener('click', () => {
  const category = button.dataset.planFilter;
  document.querySelectorAll('[data-plan-filter]').forEach(tab => {
   const active = tab === button;
   tab.classList.toggle('active', active);
   tab.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-plan-category]').forEach(card => {
   card.hidden = card.dataset.planCategory !== category;
  });
 });
});
