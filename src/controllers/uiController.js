
export const directToOnboarding = (req, res) => {
  res.redirect('onboarding')
}

export const renderIndex = (req, res) => {
  res.render('home')
}

export const renderOnboarding = (req, res) => {
    res.render('onboarding')
  }

