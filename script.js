const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const overlayMenu = document.getElementById('overlay-menu');
const btnFechar = document.querySelector('.btn-fechar');

btnMenu.addEventListener('click', () => {
    menuMobile.classList.add('abrir-menu');
    overlayMenu.classList.add('active');
});

btnFechar.addEventListener('click', () => {
    menuMobile.classList.remove('abrir-menu');
    overlayMenu.classList.remove('active');
});

overlayMenu.addEventListener('click', () => {
    menuMobile.classList.remove('abrir-menu');
    overlayMenu.classList.remove('active');
});

const menuLinks = document.querySelectorAll('#menu-mobile nav a, .menu-desktop a, .btn-contato a');

menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evita scroll instantâneo do href

        const targetId = link.getAttribute('href');

        // Se for o link para o topo (href="#"), rola para o topo
        if (targetId === '#' || targetId === '') {
            smoothScrollTo(0, 1500); // 1.5s
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                smoothScrollTo(targetPosition, 1500); // 1.5s
            }
        }

        // Fecha o menu mobile após clicar
        menuMobile.classList.remove('open-menu');
        overlayMenu.classList.remove('active');
    });
});

// Função de scroll suave com tempo customizável
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Botão flutuante

function scrollToTop(duration = 800) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      window.scrollTo(0, start * (1 - ease));

      if (elapsed < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  }

  function topFunction() {
    scrollToTop(1000); // 1 segundo de duração
  }
