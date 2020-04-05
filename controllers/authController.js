const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// registration form route: GET /auth/register
router.get('/register', (req, res) => {
  let messageToDisplay = req.session.message
  // prevent the message from showing up more than once
  req.session.message = ''
  res.render('auth/register.ejs', {
    message: messageToDisplay
  })
})

// register route: POST /auth/register
router.post('/register', async (req, res, next) => {

  try {
    // create a user in the database
    console.log(req.body);
    const desiredUsername = req.body.username
    const desiredPassword = req.body.password
    const userWithThisUsername = await User.findOne({
      username: desiredUsername
    })
    console.log(userWithThisUsername);
    // if username is taken  -- 
    if(userWithThisUsername) { 
      console.log("username exists")
      req.session.message = `Username ${desiredUsername} already taken.`
      res.redirect('/auth/register')

    }
    else {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(desiredPassword, salt)

      const createdUser = await User.create({
        username: desiredUsername,
        password: hashedPassword
      })

      req.session.loggedIn = true
      req.session.userId = createdUser._id // "more unique"
      req.session.username = createdUser.username
      req.session.message = `Thanks for signing up, ${createdUser.username}`
      res.redirect('/')

    }

  } catch(error) {
    next(error)
  }

})

// login routes
// show form GET /auth/login
router.get('/login', (req, res) => {
  let message = req.session.message

  req.session.message = undefined

  res.render('auth/login.ejs', {
    message: message
  })
})

// process login POST /auth/login 
router.post('/login', async (req, res, next) => {
  
  try {
    // is there a user with this username? 
    const user = await User.findOne({ username: req.body.username })

    // if not
    if(!user) {
      // user does not exist
      console.log("bad username");
      // message: bad username or password
      req.session.message = "Invalid username or password."
      // redirect to login page so they can reattempt   
      res.redirect('/auth/login')
    
    }
    
    // else // i.e. user w/ this username exists
    else {
      // check their password
      const loginInfoIsValid = bcrypt.compareSync(req.body.password, user.password)
      // if pw is good
      if(loginInfoIsValid) {
        // log them in in session
        req.session.loggedIn = true
        req.session.userId = user._id
        req.session.username = user.username

        // set message welcome back
        req.session.message = `Welcome back, mr. ${user.username}!`
        // redirect to /
        res.redirect('/')

      } 
      // else // i.e. pw is bad
      else {
        console.log("bad password");
        // message: invalid un or pw
        req.session.message = "Invalid username or password."
        // redirect to /auth/login
        res.redirect('/auth/login')
      }

    } // user exists (else)

  } catch(err) {
    next(err)
  }

})


router.get('/logout', async (req, res) => {
	await req.session.destroy()
	res.redirect('/auth/login')
})



module.exports = router