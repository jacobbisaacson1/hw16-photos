![GA Logo](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)

# Photo Site

📸🌉📷🏯📸🗽📷🏰📸🎇📷🌇📸🌄📷🌋📸🗻📷🌅📸🏕📷🌈📸

Type: Homework <br>
Competencies: Full CRUD in Express with Mongoose - 2 Model <br>
Idea/website credit goes to Kaylie Weable: https://picblog.herokuapp.com<br>
Adapted for SEI-CC and SEI-CHI by Reuben Ayres<br>

## Task

You will be creating a **two-model CRUD application** with Express, Mongoose & MongoDB where users can post and view each others photos.

## Setup & Commits

**Fork and clone this and build the project in the forked-and-cloned directory**.

**Read this entire page before you start**.

**There should be at least a couple dozen commits for this by the time you finish.**  We will not be telling you when to commit.  You should build one functionality at a time and commit when you get each piece of that functionality finished, similar to what we do in class.  You should be getting to a point where you're remembering to do this on your own.

## Setup your app

Make an app that runs and renders a home template, and has some basic CSS, and has partials.

The site should have a nav.  As you add functionality, add whatever links in the nav that are appropriate. At all times, you should be able to navigate the site by clicking around. You should never have to type in a URL except for the first time you go to the site. 

## Start off with Models: `Photo` and `User`.

When building a complex application, once you have a clear idea of what you want to build, **always** start with thinking about the **data** in your app, how you will model it, and how those models are related to each other.

When creating a schema for `User`, think about validations. The username and password should _definitely_ be required.  You could have other fields too if you like, such as first name and last name and email and hometown, etc.  

A `Photo` should have a URL (link to some photo on the internet) and a title and a date that it was added.  You can have whatever other fields you want (date taken? extended description? location photo was taken?)

Think about validations. For `Photo`, the URL and the title should be required. How can you accomplish that?  How can you make the dateAdded default to the time it was uploaded?  For `User`, the username and password are required, how you set it up beyond that is up to you.


### Model associations

We also want `User` to be _associated_ with `Photo`.  How to implement that?  You could have each photo reference a User or you could have an array of Photo references in the user model.  Is one or the other "correct"?  Why might you do one or the other?  What would happen if you did both?

In answering these questions, try to design your models _in the simplest way possible that gets the job done._ 

You could even try different things and see what works. If you're absolutely stumped, click below for a recommendation.

<details>
  <summary>Hint/recommendation</summary>

Add a reference to the `User` in the `Photo` model:

  ```javascript
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }    
  ```

</details>

## Next build some authentication. 

Add sessions to your app. 

Add an `authController`.  Make sure it's wired up correctly.  

Allow the user to "create an account"/"sign up"/"register", to "log in", and to "log out."

Be sure to put Login, Logout, and Register links in your nav!

They should not be able to register an account with an existing username.  If they try to do so, they should be redirected to the registration page and see a message there telling them that username is taken.  If, on the login page, they enter the credentials incorrectly, they should be redirected back to the login page and see a message telling them the username or password was wrong.

<details>
  <summary>Hints for the messaging</summary>

  >In the `POST` register and login routes, if something goes wrong store a message in session then redirect back to the form.  Do **not** try to `res.render()` in the `POST` routes.

  >Program the GET register and login routes to display the message from session in the templates. 

  >in the `GET` routes, don't forget to capture that message in a variable and clear out the message from `req.session` so the message doesn't remain on the page after it is shown initially.

</details>

<br>

Bonus: You may also wish to get the user's first and last name, home town, and the other location in their profile. You _could_ do this on the registration page, buit making registration a two-step process might be a nicer user experience. 

### Use sessions to "remember" who's logged in

When the user logs in or registers, use the session to store information about the fact that someone is `loggedIn`.  You should probably their `userId` so you can know which user it is.  You may also want to store their `username` in the session.

## Next, build out the photo controller `/photos`

#### Start with REST.  

### New 

There should be a page to add a new photo. For this app, don't worry about uploading the photos with your app, just use links to photos elsewhere on the internet. (You could use imgur, for example.)

The photo new page should have fields for:

1. The URL of a photo hosted online somewhere (you won't be storing any photos, just storing the URL) (required)
2. Information about the photo (not required for the user to fill out, but required for you to enable them to if they want 🙂)
3. Any other fields you thought to include.  (not required).
4. Note: The photo new page will **not** have a place to input the username or a dropdown to choose the user associated from the photo.  That information will come from the _session_. 
5. Similarly, the `dateAdded` will be set by default on `create()` so it should not appear in the form.

Bonus:  Use client-side JS to validate the URL field when user submits the form (i.e. if the URL field is blank, prevent form submission and show them an alert telling them their mistake). 

### Create

Make a route that adds the photos to the database.  

#### The user must be logged in to add a photo

If someone wants to add a photo and they're not logged in, don't let them!  Maybe suggest that they create an account.  How might you handle this?  What about putting logic in the "new" and/or "create" routes that checks the session and if they're not logged in, redirects them to the login page which should then display an appropriate error message.

#### Associating the photo with a user 

The thing you'll have to figure out is how to use the user that's currently logged in as the user with which this photo is associated.  Try to think through how to do this yourself.  But if you get very stumped, check the hints below.

<details>
  <summary>Hints</summary>  
  
  >Remember: info about who's logged in is (should be) available in the session (provided you stored it there in the login (`POST /auth/login`) and register (`POST /auth/register`) routes).

  >If the session middleware is set up correctly, and you stored that data the session data is available in _every_ route in `req.session`. 

</details>





### Index

For now, the index page should show all of the pictures that have been submitted, by any user. By each photo, you should see the user's username, the title, and the date it was added.  Make it look nice.

<details>
  <summary>Hint: showing the username</summary>

  >If you followed our suggestion for the association between the model, and you're seeing just the user's ID instead of their name, don't forget to `.populate()`!!!

</details>

### Show

There should be a page to show the individual photo.

It should show the photo and the title and the username, in some kind of way that is more prominent.  If there is a description, or any other info you chose to add, that comes with the photo, those should be displayed as well.

### Edit, Update, Destroy

#### The challenge -- only showing things on templates _sometimes_

**If this photo belongs to the currently logged in user**, the **show** page should have a button to **delete** the photo, and a link that takes you to a page to **edit** the photo.  However, These things should **not** appear if the photo belongs to another user or if no one is logged in.

Additionally, it's not just about hiding or showing things on the template—the **routes** for photo edit, delete, and update should not work unless it's the logged in user who owns that photo that is trying to use them.  

By "not work," we mean perhaps redirecting the user somewhere (show page or login page?) and showing some kind of message saying they can't do that if they're not logged in. 

Other than coding these extra restrictions, the edit, update, and delete functionalities should function as normal.


## The Users controller

This will start to make your site more "social." :) 

### Index: `GET /users`

There should be a page that you can access from the nav to see all of the users (displaying just the username is enough, but feel free to get creative here).

You don't need to display any photos here—just display the usernames and maybe a little bit of their other info.


### "Show"ing all of one user's photos

There should be a show page for a user.  It should show all of their photos. On this page, you should be able to see the user's username and any other "profile" info you collected about them, all pictures that this particular user has posted, in a way that is similar to what is displayed on the `/photos` index.

A new challenge here is how to structure the URL? How about `GET /users/:id`? But could you make a case that it could be set up a different way? (Yes.)

<details>
  <summary>Click for rabbit hole about how to set this up</summary>

But perhaps in the future, as our site becomes more complex, we might want a page for the user's profile with other info about them, and a different one that just showed all their photos. In which case the "profile page" might be `GET /users/:id` and the "all a user's photos" page might be `GET /photos/:userId`.  So if you want to set it up this way, then that's fine too, as long as the functionality is there and it's clear to the user how to access it.

</details>


### User "destroy"

#### `User` "destroy" basically means "Cancel account"

On a user's show page, **only if they are the one logged in**, They should see a button to "cancel their account."  If the user clicks on the **"cancel account"** button, the user's be deleted. 

#### IMPORTANT:

* ___This route should only work if that user is the one logged in and they are trying to delete themselves.___  
* **This should also delete all of that user's photos.** (But maybe delete the photos first?).  
* This should also log the user out (redirect to `/auth/logout`).

<hr>

### You're doing great!

<hr>


# Optional extra functionality.

The following sections are optional, but highly recommended. 

## Edit/update user

On a user's show page, **only if they are the one logged in**, they should see a link to a page that lets them edit their account information. 

### Change user "profile" information 

If you are storing properties other than username/password, then create a form and route that lets the user update their information.

Again, these routes should not be accessible to anyone other than the logged in user.  Use logic in your routes that checks if the correct person is logged in and redirects them somewhere else if not.  

### Update password

This basically a form that lets the user change their password.  

You know how it works... make them confirm the old PW, and then type in the new one twice. 

Use client side validation to make sure the new passwords match.  

If they type the old password incorrectly, bring them back to the update password page with a message telling them so.

## Other nice-to-haves:

* clicking user's username anywhere it appears should go to user show page (or the page showing their photos)

* clicking any photo in any list of photos should go to that photo's show page

## CSS

Use Bootstrap (or just CSS and elbow grease) to make it look awesome.  Any kind of awesome you want, just make it look awesome. 

## Free user testing

Show the app to someone. Classmate, partner, roommate, friend, relative, co-worker, someone that's around.  Watch them try to use it and see where they have trouble using the site.  Ask them for very candid feedback on how intuitive the site is.  

Classic story, right? You'll think you've hammered out all the kinks, but users will always come up with amazing ways to cause a site to "break"!  

Take their feedback and use it to improve the usability of your site!

<hr>

### Congrats!  You finished the assignment!  That was a LOT!

<hr>

# Hungry for more?

## Encypting passwords with bcrypt 

> Note: We will cover this very soon in a lesson in class. 

We've been storing plain text passwords, but you should [never ever ever store plain text passwords](https://www.google.com/search?q=plain+text+password&oq=plain+text+password&aqs=chrome..69i57j0l7.2855j0j7&sourceid=chrome&ie=UTF-8). 

Read [this documentation about the **bcrypt** npm module](https://www.npmjs.com/package/bcrypt) and see if you can figure out how to use it to store encrypted passwords.


## "Logged in as": 

Research how you might use [`res.locals`](https://expressjs.com/en/api.html#res.locals) to change what the user sees in the nav depending on whether they're logged in.  When they're logged in they should see "Logged in as &lt;their username&gt;" and a logout link.  But if they're not logged in, they should see links to register/"sign up" or log in.

## "You must be logged in to do that": Router level middleware

Read [this](https://expressjs.com/en/guide/using-middleware.html) to get a much more comprehensive understanding how express works.  Turns out it's actually just one fairly simple concept applied a bunch of times.

Ponder these particular sentences: 

>"An Express application is essentially a series of middleware function calls. Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next." 

Whoa. Think about that for a few minutes.  Whoa.

Then re-read [this part about router-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router) closely.

When you think you have a handle on it, figure out ways DRY up your app by using router-level middleware function to block routes that shouldn't work for users that aren't logged in.  

## Comments

Research [Mongoose Subdocuments](https://mongoosejs.com/docs/subdocs.html), and use them to implement comments on posts.  Your `Post` model should contain an array of `Comment` subdocuments. Think: why might you use subdocuments vs just storing comments with a reference to the post they're related to?  How might subdocuments vs references make certain things easier and certain things more difficult?

## Likes

This is more challenging than it looks when you casually use it on social media sites.  But how might you implement it?  See what you can come up with on your own!  A user should only be able to "like" something one time, and a user should be able to "unlike" something.  Anyone should be able to see a list of usernames of who "likes" something.

## Follows and/or Friendships

Code some type of "following" or "friendship". 

Following = a user follow other users and those are the people whose photos they see in the `GET /photos` index. 

Friendship = a user makes "requests" and people must accept your request, then you can see each others' photos in the `GET /photos` index.




