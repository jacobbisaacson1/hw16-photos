const express = require('express')
const router = express.Router()
const User = require('../models/user')

// create account
router.get('/register', (req, res) => {
  const session = req.session
  messageToDisplay = req.session.message
  req.session.message = ""
  res.render('auth/register.ejs', {
    message: messageToDisplay,
    session: session
  })
})


//to register
router.post('/register', async (req, res, next) => {
  try {
    // desired username and password
    const desiredUsername = req.body.username
    const desiredPassword = req.body.password
    // check if they belong to an existing user
    const userWithSameUsername = await User.findOne({ username: req.body.username })
    // if they do, 
    if(userWithSameUsername) {
      // reload register page and display message 
      req.session.message = "Sorry, that username is taken"
      res.redirect('/auth/register')
    // else they dont
    } else {
      // store the username and password and id
      const createdUser = await User.create({
        username: desiredUsername,
        password: desiredPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      req.session.loggedIn = true
      req.session.userId = createdUser._id
      req.session.username = createdUser.username
      // redirect to home page with message welcoming them
      req.session.message = `Thanks for signing up, ${createdUser.firstName}!`
      res.redirect('/')
    }
  } catch (error) {
    next(error)
  }
})


router.get('/login', (req, res) => {
  const session = req.session
  messageToDisplay = req.session.message
  req.session.message = ""
  res.render('auth/login.ejs', {
    message: messageToDisplay,
    session: session
  })
})

//to log in
router.post('/login', async (req, res, next) => {
  try {
    // check if there is a user with that username
    const user = await User.findOne({ username: req.body.username })
      // if not, this means the username isnt in the database
      if(!user) {
        console.log("bad username");
        // message "bad username or password"
        req.session.message = "Invalid Username or Password"
        // redirect to login page to let them try again
        res.redirect('/auth/login')
      // else _-user w this name exists
      } else {
        // check this password
        // if good, 
        if(user.password == req.body.password) {
          // login and store info
          req.session.loggedIn = true
          req.session.userId = user._id
          req.session.username = user.username
          //message says welcome back 
          req.session.message = `Welcome back, ${user.firstName}`
          // redirect to home page
          res.redirect('/')
        // else
        } else {
          console.log("bad password");
          // message 'bad username or password'
          req.session.message = "Invalid Username or Password"
          // redirect to login page
          res.redirect('/auth/login')
        }

      }
  } catch (error) {
    next(error)
  }
})


router.get('/logout', async (req, res, next) => {
  await req.session.destroy()
  res.redirect('/auth/login')
})








module.exports = router