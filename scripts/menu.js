const menuGrid = document.querySelector('.menu-grid');
const tabBtns = document.querySelectorAll('.menu-offer__tab');
const loadMoreBtn = document.querySelector('.pagination_btn');

const modalOverlay = document.querySelector('.modal-container');
const modalCloseBtn = document.querySelector('.modal-btn');
const modalWindow = document.querySelector('.modal-window');

let allProducts = [];
let currentCategory = 'coffee';
let isLoadMoreClicked = false;

let product = null;
let selectedSizePrice = 0;
let selectedAdditivesPrice = 0;

if (menuGrid && tabBtns.length > 0) {
  const renderMenu = (category) => {

    currentCategory = category;

    const filetedProducts = allProducts.filter((product) => product.category.toLowerCase().trim() === category.toLowerCase().trim());

    const isMobile = window.innerWidth <= 768

    let productsToRender = filetedProducts;
    if (isMobile) {
      if (!isLoadMoreClicked) {
      productsToRender = filetedProducts.slice(0, 4);
      }
      if (filetedProducts.length > 4 && !isLoadMoreClicked) {
        if (loadMoreBtn) loadMoreBtn.style.setProperty('display', 'block');
      } else {
        if (loadMoreBtn) loadMoreBtn.style.setProperty('display', 'none');
      }
    } else {
      if (loadMoreBtn) loadMoreBtn.style.setProperty('display', 'none');
    }


    menuGrid.innerHTML = '';
    productsToRender.forEach((product, index) => {
      const productCard = document.createElement('article');
      const productCardId = `${category}-${index + 1}`;
      productCard.classList.add('menu-card');
      productCard.dataset.name = product.name;
      productCard.dataset.id = productCardId;
      productCard.innerHTML = `
        <div class="menu-card__img-wrap">
          <img class="menu-card__img" src='../../assets/img/menu/${category}-${index + 1}.png' alt="${product.name}">
        </div>
        <h2 class="font-heading-3 menu-card__title">${product.name}</h2>
        <p class="menu-card__text">${product.description}</p>
        <p class="menu-card__price font-heading-3">$${product.price}</p>
      `;
      menuGrid.appendChild(productCard);
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      isLoadMoreClicked = true;
      renderMenu(currentCategory);
    });
  }

  const loadProducts = async () => {
    try {
      const response = await fetch(`../../data/products.json`);
      const data = await response.json();
      allProducts = data;
      renderMenu('coffee');
    } catch (error) {
      console.error('Error fetching products:', error);
      menuGrid.innerHTML = '<p>Не удалось загрузить меню. Попробуйте позже.</p>';
    }
  }
  loadProducts();

  tabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-category');
      tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove('active');
      });
      e.currentTarget.classList.add('active');
      isLoadMoreClicked = false;
      renderMenu(targetTab);
    });
  });

  const mediaQueryList = window.matchMedia('(max-width: 768px)');
  mediaQueryList.addEventListener('change', (e) => {
    if (e.matches) isLoadMoreClicked = false;
    renderMenu(currentCategory);
  });
}

// modal generation
if (modalOverlay && modalCloseBtn && modalWindow) {
  const openModal = (productName, productId) => {

    product = allProducts.find((p) => p.name === productName);
    if (!product) return;
    modalWindow.innerHTML = `
      <div class="modal-img-wrap menu-card__img-wrap">
        <img src="../../assets/img/menu/${productId}.png" alt="" class="modal-img menu-card__img">
      </div>
      <div class="modal-content">
        <h2 class="font-heading-3 modal-title">${product.name}</h2>
        <p class="modal-text">${product.description}</p>
        <p class="modal-size-text">Sizes</p>
        <div class="modal-btns-wrap modal-size-buttons">
          <button class="modal-inv-btn menu-inv-btn active" data-size-price="${product.sizes.s['add-price']}">
            <span class="menu-inv-btn__circle">s</span>
            <span>Small</span>
          </button>
          <button class="modal-inv-btn menu-inv-btn" data-size-price="${product.sizes.m['add-price']}">
            <span class="menu-inv-btn__circle">m</span>
            <span>Medium</span>
          </button>
          <button class="modal-inv-btn menu-inv-btn" data-size-price="${product.sizes.l['add-price']}">
            <span class="menu-inv-btn__circle">l</span>
            <span>Large</span>
          </button>
        </div>
      <p class="modal-additives-text">Additives</p>
      <div class="modal-btns-wrap modal-additives-buttons">
        <button class="modal-inv-btn menu-inv-btn" data-additive-price="${product.additives[0]['add-price']}">
          <span class="menu-inv-btn__circle">1</span>
          <span>${product.additives[0].name}</span>
        </button>
        <button class="modal-inv-btn menu-inv-btn" data-additive-price="${product.additives[1]['add-price']}">
          <span class="menu-inv-btn__circle">2</span>
          <span>${product.additives[1].name}</span>
        </button>
        <button class="modal-inv-btn menu-inv-btn" data-additive-price="${product.additives[2]['add-price']}">
          <span class="menu-inv-btn__circle">3</span>
          <span>${product.additives[2].name}</span>
        </button>
      </div>
      <div class="modal-total-wrapper font-heading-3">
        <span class="modal-total-text">Total</span>
        <span class="modal-total-price">$${product.price}</span>
      </div>
      <div class="modal-caption-wrapper font-body-caption">
        <svg class="modal-caption-logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_147811_7961)">
          <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_147811_7961">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
        </svg>
        <span class="modal-caption-text">The cost is not final. Download our mobile app to see the final price
          and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</span>
      </div>
      <button class="modal-btn">
        <span class="modal-btn__text font-action-button">Close</span>
      </button>
    `;
    modalOverlay.style.setProperty('display', 'flex');
    document.body.style.setProperty('overflow', 'hidden');
    initModalInteractions();
  }
  const closeModal = () => {
    modalOverlay.style.setProperty('display', 'none');
    document.body.style.setProperty('overflow', 'auto');
    setTimeout(() => {
      modalWindow.innerHTML = '';
    }, 300);
  }

  menuGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card');

    if (!card) return;
    const productName = card.dataset.name;
    const productId = card.dataset.id;
    openModal(productName, productId);
  });

  modalOverlay.addEventListener('click', (e) => {
    const isOverlay = e.target === modalOverlay;
    const isCloseBtn = e.target.closest('.modal-btn');
    if (isOverlay || isCloseBtn) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

//modal interactions
const initModalInteractions = () => {
  selectedSizePrice = 0;
  selectedAdditivesPrice = 0;

  const sizeContainer = document.querySelector('.modal-size-buttons');
  const additivesContainer = document.querySelector('.modal-additives-buttons');
  if (sizeContainer) {
    sizeContainer.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.menu-inv-btn');
      if (!targetBtn) return;
      sizeContainer.querySelectorAll('.menu-inv-btn.active').forEach((btn) => {
        btn.classList.remove('active');
      });
      targetBtn.classList.add('active');

      selectedSizePrice = parseFloat(targetBtn.dataset.sizePrice) || 0;
      updateModalPrice();
    });
  }
  if (additivesContainer) {
    additivesContainer.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.menu-inv-btn');
      if (!targetBtn) return;
      targetBtn.classList.toggle('active');

      selectedAdditivesPrice = 0;
      additivesContainer.querySelectorAll('.menu-inv-btn.active').forEach((btn) => {
        selectedAdditivesPrice += parseFloat(btn.dataset.additivePrice) || 0;
      });
      updateModalPrice();
    });
  }
}

const updateModalPrice = () => {
    const priceElement = modalWindow.querySelector('.modal-total-price');
    if (!priceElement || !product) return;

    const defaultPrice = parseFloat(product.price);
    const totalPrice = defaultPrice + selectedSizePrice + selectedAdditivesPrice;
    priceElement.innerHTML = `$${totalPrice.toFixed(2)}`;
  }