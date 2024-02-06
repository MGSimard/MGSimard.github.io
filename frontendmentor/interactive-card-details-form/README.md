# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Live Site URL: https://mgsimard.github.io/frontendmentor/interactive-card-details-form/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Javascript
- [iMask.js](iMask.js) - JS library
- My best homie Brackets

### What I learned

- IMask.js
- How annoying form validation is
- How even more annoying form validation used to be before HTML5
- Targeting invalid form input events
- Gradient borders are also annoying

### Continued development

Gonna have to work on more efficient form validation, I probably have some redundant stuff because I learned about new things as I went and probably didn't replace some of the old stuff.

### Useful resources

- [imask.js](https://imask.js.org/) - Didn't notice the project had a Mask plugin to begin with so I ended up getting the iMask.js library while fumbling around with manually setting rules and checked out their documentation. Not sure how it functions behind the scenes but I assume it's a simplified library for more complicated regex type stuff which allowed me to easily automate spaces every 4 numbers in credit card field and other stuff. Assume it moderates keypresses and only writes the ones allowed in each specific character position using regex, won't bother looking though w/e it works.

## Author

- Website - [MGSimard @ Github](https://mgsimard.github.io/)
- Frontend Mentor - [@MGSimard](https://www.frontendmentor.io/profile/MGSimard)