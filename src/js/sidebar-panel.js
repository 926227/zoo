export function runSidebarPanel() {
  const sidebar = document.querySelector('.zoos__sidebar');
  const togglePanel = sidebar.querySelector('.sidebar__top');

  function onToggleClick() {
    sidebar.classList.toggle('panel-opened');
  }
  function onSidebarMenuClick(evt) {
    if (evt.target.nodeName === 'A' && evt.target.parentElement.classList.contains('active')) {
      evt.preventDefault();
    }
  }

  togglePanel.addEventListener('click', onToggleClick);
  sidebar.addEventListener('click', onSidebarMenuClick);
}