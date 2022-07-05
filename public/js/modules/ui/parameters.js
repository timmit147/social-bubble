export const parameters = () => {
  const buttons = document.querySelectorAll('nav > ul > li > button')
  const parameterCards = document.querySelectorAll('#parameters > .card')

  buttons.forEach((e) => {
    e.addEventListener('click', () => {
      const paramArr = Array.from(parameterCards)
      const btnArr = Array.from(buttons)
      const iBtn = btnArr.indexOf(e)
      const iParam = paramArr.indexOf(parameterCards[iBtn])
      parameterCards[iBtn].classList.toggle('hidden')
      paramArr.splice(iParam, 1)
      paramArr.forEach((e) => {
        e.classList.add('hidden')
      })
    })
  })
}
