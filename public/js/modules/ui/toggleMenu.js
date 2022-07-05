
export const openMenu = () => {
  const menuButton = document.getElementById('menuButton')
  const menu = document.querySelector('section')

  menu.classList.toggle('open')
  if (menu.matches('.open')) {
    menuButton.src = 'img/arrow-left.png'
  } else {
    menuButton.src = 'img/arrow-right.png'
  }
}
