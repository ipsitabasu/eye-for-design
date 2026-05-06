export function renderNav(apps, activeApp, activeScreen, navigate) {
  renderAppNav(apps, activeApp, navigate);
  renderScreenNav(activeApp, activeScreen, navigate);
}

function renderAppNav(apps, activeApp, navigate) {
  const switcher = document.getElementById('app-switcher');
  switcher.innerHTML = '';

  for (const app of apps) {
    const btn = document.createElement('button');
    btn.className = 'app-tab' + (app.id === activeApp.id ? ' active' : '');
    btn.setAttribute('aria-current', app.id === activeApp.id ? 'page' : 'false');
    btn.innerHTML = `<span class="app-dot" aria-hidden="true"></span>${app.name}`;
    btn.addEventListener('click', () => navigate(app.id));
    switcher.appendChild(btn);
  }
}

function renderScreenNav(app, activeScreen, navigate) {
  const nav = document.getElementById('screen-nav');
  nav.innerHTML = '';

  for (const screen of app.screens) {
    const btn = document.createElement('button');
    btn.className = 'screen-tab' + (screen.id === activeScreen.id ? ' active' : '');
    btn.setAttribute('aria-current', screen.id === activeScreen.id ? 'true' : 'false');
    btn.textContent = screen.label;
    btn.addEventListener('click', () => navigate(app.id, screen.id));
    nav.appendChild(btn);
  }
}
