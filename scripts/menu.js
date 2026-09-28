const menuGrid = document.querySelector('.menu-grid');
const tabBtns = document.querySelectorAll('.menu-offer__tab');
const loadMoreBtn = document.querySelector('.pagination_btn');

const modalOverlay = document.querySelector('.modal-container');
const modalCloseBtn = document.querySelector('.modal-btn');
const modalWindow = document.querySelector('.modal-window');

let allProducts = [];
let currentCategory = 'coffee';
let isLoadMoreClicked = false;

if (menuGrid && tabBtns.length > 0) {
  const renderMenu = (category) => {

    currentCategory = category;

    const filetedProducts = allProducts.filter((product) => product.category.toLowerCase().trim() === category.toLowerCase().trim());

    const isMobile = window.innerWidth <= 768
    console.log('Is mobile? ', isMobile);

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
    console.log('Product to render: ', productsToRender);


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
      console.log('Target tab: ', targetTab);
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

if (modalOverlay && modalCloseBtn && modalWindow) {
  const openModal = (productName, productId) => {
    console.log(productId);

    const product = allProducts.find((p) => p.name === productName);
    if (!product) return;
    modalWindow.innerHTML = `
      <div class="modal-img-wrap menu-card__img-wrap">
        <img src="../../assets/img/menu/${productId}.png" alt="" class="modal-img menu-card__img">
      </div>
      <div class="modal-content">
        <h2 class="font-heading-3 modal-title">${product.name}</h2>
        <p class="modal-text">${product.description}</p>
        <p class="modal-size-text">Size</p>
        <div class="modal-btns-wrap modal-size-buttons">
          <button class="menu-inv-btn active">
            <span class="menu-inv-btn__circle">s</span>
            <span>Small</span>
          </button>
          <button class="menu-inv-btn">
            <span class="menu-inv-btn__circle">m</span>
            <span>Medium</span>
          </button>
          <button class="menu-inv-btn">
            <span class="menu-inv-btn__circle">m</span>
            <span>Large</span>
          </button>
        </div>
      <div class="modal-btns-wrap modal-additives-buttons">
        <button class="menu-inv-btn active">
          <span class="menu-inv-btn__circle">1</span>
          <span>${product.additives[0].name}</span>
        </button>
        <button class="menu-inv-btn">
          <span class="menu-inv-btn__circle">1</span>
          <span>${product.additives[1].name}</span>
        </button>
        <button class="menu-inv-btn">
          <span class="menu-inv-btn__circle">1</span>
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
    console.log("Click! Card found: ", card);

    if (!card) return;
    const productName = card.dataset.name;
    const productId = card.dataset.id;
    console.log('Product name: ', productName, productId);
    openModal(productName, productId);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}