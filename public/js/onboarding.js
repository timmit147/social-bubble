const items = document.querySelectorAll("section.onboarding article")
const onboardingStart = document.querySelector('button.onboarding-start')
const userInfo = document.querySelector('p.user-info')
const allUserInfo = document.querySelector('p.all-user-info')
const documentInfo = document.querySelector('p.document-info')
const userSvg = document.querySelector('button.user-svg img')
const documentSvg = document.querySelectorAll('button.document-svg img')
const allUserSvg = document.querySelectorAll('button.all-user-svg img')

console.log(userSvg)

let onboardingIndex = 1

onboardingStart.addEventListener("click", () => {
  document.querySelector(`article:nth-of-type(${onboardingIndex})`).classList.remove("active")
  onboardingIndex++

  document.querySelector(`article:nth-of-type(${onboardingIndex})`).classList.add("active")

});


// Give 'user pentagon' button a click function to toggle class and change img
userSvg.addEventListener('click', () => {
  if (userSvg.src.match('img/user.svg')) {
    userInfo.classList.add('show-user')
    userSvg.src = 'img/user-filled.svg'
  } else if (userSvg.src.match('img/user-filled.svg')) {
    userSvg.src = 'img/user.svg'
    userInfo.classList.remove('show-user')
  }

})

console.log(userInfo)


// Give each document button a click function
documentSvg.forEach(document => {

  document.addEventListener('click', () => {
    if (document.src.match('img/document.svg')) {
      documentInfo.classList.add('show-document')
      document.src = 'img/document-filled.svg'
    } else if (document.src.match('img/document-filled.svg')) {
      documentInfo.classList.remove('show-document')
      document.src = 'img/document.svg'
    }
  })
})

console.log(allUserSvg)

// Give each 'user pentagon' a click function
allUserSvg.forEach(user => {

  user.addEventListener('click', () => {
    if (user.src.match('img/user.svg')) {
      allUserInfo.classList.add('show-user')
      user.src = 'img/user-filled.svg'
    } else if (user.src.match('img/user-filled.svg')) {
      allUserInfo.classList.remove('show-user')
      user.src = 'img/user.svg'
    }
  })
})