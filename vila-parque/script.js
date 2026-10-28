const menu = document.querySelector('#menu');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});

const cards = [...document.querySelectorAll('[data-plan-category]')];
const filters = [...document.querySelectorAll('[data-plan-filter]')];
const search = document.querySelector('#plan-search');
const savedOnly = document.querySelector('#saved-only');
const status = document.querySelector('#plan-status');
const storageKey = 'vila_parque_saved_plans';
const validKeys = new Set(cards.map(card => card.dataset.planKey));
let saved = new Set();
try {
  const value = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(value)) saved = new Set(value.filter(key => validKeys.has(key)));
} catch { /* Favorites remain usable in memory if storage is unavailable. */ }
let category = 'mall';
let storageUnavailable = false;
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
function updatePlans() {
  const query = normalize(search.value.trim());
  let visible = 0;
  cards.forEach(card => {
    const selected = saved.has(card.dataset.planKey);
    const matches = (category === 'all' || card.dataset.planCategory === category)
      && normalize(card.dataset.planLabel).includes(query)
      && (!savedOnly.checked || selected);
    card.hidden = !matches;
    if (matches) visible++;
    const button = card.querySelector('.save-plan');
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-label', `${selected ? 'Remover dos favoritos' : 'Salvar'} ${card.dataset.planLabel}`);
    button.textContent = selected ? '♥ Planta salva' : '♡ Salvar planta';
  });
  filters.forEach(tab => {
    const active = tab.dataset.planFilter === category;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  status.textContent = visible
    ? `${visible} ${visible === 1 ? 'planta encontrada' : 'plantas encontradas'} · ${saved.size} ${saved.size === 1 ? 'favorita' : 'favoritas'}`
    : 'Nenhuma planta encontrada. Tente outro nome, categoria ou desmarque o filtro de plantas salvas.';
  if (storageUnavailable) status.textContent += ' Os favoritos serão mantidos apenas enquanto esta página estiver aberta.';
}
filters.forEach(button => button.addEventListener('click', () => {
  category = button.dataset.planFilter;
  updatePlans();
}));
search.addEventListener('input', updatePlans);
savedOnly.addEventListener('change', () => {
  if (savedOnly.checked) category = 'all';
  updatePlans();
});
document.querySelectorAll('.save-plan').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.saveKey;
  if (saved.has(key)) saved.delete(key); else saved.add(key);
  try { localStorage.setItem(storageKey, JSON.stringify([...saved])); }
  catch { storageUnavailable = true; }
  updatePlans();
}));
updatePlans();

const imageDialog = document.querySelector('#image-dialog');
const expandedImage = document.querySelector('#expanded-image');
const imageTitle = document.querySelector('#image-title');
let activeImages = [];
let activeIndex = 0;
function showCurrentImage() {
  const button = activeImages[activeIndex];
  expandedImage.src = button.dataset.image;
  expandedImage.alt = button.querySelector('img').alt;
  imageTitle.textContent = `${activeIndex + 1} / ${activeImages.length} · ${expandedImage.alt}`;
}
function stepImage(step) {
  if (!activeImages.length) return;
  activeIndex = (activeIndex + step + activeImages.length) % activeImages.length;
  showCurrentImage();
}
document.querySelectorAll('.photo-open').forEach(button => button.addEventListener('click', () => {
  const group = button.closest('.plans-grid, .photo-gallery');
  activeImages = [...group.querySelectorAll('.photo-open')].filter(item => !item.closest('[hidden]'));
  activeIndex = activeImages.indexOf(button);
  showCurrentImage();
  imageDialog.showModal();
}));
document.querySelector('#previous-image').addEventListener('click', () => stepImage(-1));
document.querySelector('#next-image').addEventListener('click', () => stepImage(1));
document.querySelector('#close-image').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target === imageDialog) imageDialog.close();
});
document.addEventListener('keydown', event => {
  if (imageDialog.open && ['ArrowRight', 'ArrowLeft'].includes(event.key)) {
    event.preventDefault();
    stepImage(event.key === 'ArrowRight' ? 1 : -1);
  }
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
