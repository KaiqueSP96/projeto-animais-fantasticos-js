function initTabNav() {

  const tabMenu = document.querySelectorAll('.js-tabmenu li');
  const tabContent = document.querySelectorAll('.js-content section');

  tabContent[0].classList.add('ativo');

  if (tabContent.length && tabMenu.length) {

    function activeTab(index) {

      tabContent.forEach((section) => {
        section.classList.remove('ativo');
      });

      tabContent[index].classList.add('ativo');
    }

    tabMenu.forEach((itemMenu, index) => {

      itemMenu.addEventListener('click', () => {
        activeTab(index);
      });
    });
  }
}
initTabNav();

/////////////////////////////////////////////////////

function initAccordion() {

  const accordionItem = document.querySelectorAll('.js-accordion dt');
  const activeClass = 'ativo';

  accordionItem[0].classList.add(activeClass);
  accordionItem[0].nextElementSibling.classList.add(activeClass);

  function activeAccordion() {
    this.classList.toggle(activeClass);
    this.nextElementSibling.classList.toggle(activeClass);
  }

  accordionItem.forEach((item) => {
    item.addEventListener('click', activeAccordion);
  })
}
initAccordion();

//////////////////////////////////////////////////

function InitScrollSuave() {

  const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]');

  function scrollToSection(event) {

    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    const topo = section.offsetTop;

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  }

  linksInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection);
  });
}

InitScrollSuave();

//////////////////////////////////////////

function animacaoScroll() {

  const sections = document.querySelectorAll('.js-scroll');
  const windowMetade = window.innerHeight * 0.6;

  function animaScroll() {
    sections.forEach((sections) => {
      const sectionTop = sections.getBoundingClientRect().top - windowMetade;
      if (sectionTop < 0) {
        sections.classList.add('ativo');
      }
    })
  };

  animaScroll();

  window.addEventListener('scroll', animaScroll);

}

animacaoScroll();

///////////////////////////////////////////


function initModal() {

  const botaoAbrir = document.querySelector('[data-modal="abrir"');
  const botaoFechar = document.querySelector('[data-modal="fechar"');
  const containerModal = document.querySelector('[data-modal="container"');

  if (botaoAbrir && botaoFechar && containerModal) {
    function toggleModal(event) {
      event.preventDefault();
      containerModal.classList.toggle('ativo');
    }

    function cliqueForaModal(event) {
      if (event.target === this)
        toggleModal(event);
    }

    botaoAbrir.addEventListener('click', toggleModal);
    botaoFechar.addEventListener('click', toggleModal);
    containerModal.addEventListener('click', cliqueForaModal)

  }
}

initModal();

////////////////////////////////////////////////////


function initToolTip() {
  const tooltips = document.querySelectorAll('[data-tooltip]');


  tooltips.forEach((item) => {
    item.addEventListener('mouseover', onMouseover);
  })

  function onMouseover(event) {
    const tooltipBox = criarTooltipBox(this);
    tooltipBox.style.top = event.pageY + 'px';
    tooltipBox.style.left = event.pageX + 'px';

    onMouseMove.tooltipBox = tooltipBox;
    this.addEventListener('mousemove', onMouseMove);
    onMouseLeave.tooltipBox = tooltipBox;
    this.addEventListener('mouseleave', onMouseLeave);
  }

  const onMouseLeave = {
    tooltipBox: '',
    handleEvent() {
      this.tooltipBox.remove();
    }
  }

  const onMouseMove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + 'px';
      this.tooltipBox.style.left = event.pageX + 20 + 'px';
    }
  }

  function criarTooltipBox(element) {
    const tooltipBox = document.createElement('div');
    const text = element.getAttribute('aria-label');
    tooltipBox.classList.add('tooltip');
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    return tooltipBox;
  }
}

initToolTip();

///////////////////////////////////////////////////

function initDropDownMenu() {

  const dropdownMenus = document.querySelectorAll('[data-dropdown]');

  dropdownMenus.forEach(menu => {
    ['touchstart', 'click'].forEach(userEvent => {
      menu.addEventListener(userEvent, handleClick);
    })
  })

  function handleClick(event) {
    event.preventDefault();
    this.classList.toggle('active');
    outsideClick(this, ['touchstart', 'click'], () => {
      this.classList.remove('active');
    });
  };

  function outsideClick(element, events, callback) {
    const html = document.documentElement;
    const outside = 'data-outside';

    if (!element.hasAttribute(outside)) {
      events.forEach(userEvent => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
      element.setAttribute(outside, '');
    }

    function handleOutsideClick(event) {
      if (!element.contains(event.target)) {
        element.removeAttribute(outside);
        events.forEach(userEvent => {
          html.removeEventListener(userEvent, handleOutsideClick);
        });
        callback();
      }
    }
  }
}

initDropDownMenu();

//////////////////////////////////////////////////////////





