const menuGrid = document.querySelector('.menu-grid');
const tabBtns = document.querySelectorAll('.menu-offer__tab');
const loadMoreBtn = document.querySelector('.pagination_btn');

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
      // console.log('Current card to maintain: ', productCard);
      productCard.classList.add('menu-card');
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