# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![](./screenshot.jpg)

### Links

Live Site URL: https://mgsimard.github.io/frontendmentor/age-calculator-app/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Javascript
- Flexbox
- Mobile-first workflow
- [Luxon](https://moment.github.io/luxon/#/)

### What I learned

Luxon DateTime

### Continued development

Wasted a lot of time trying to reinvent the wheel by accounting for precision with leap years, differing month lengths, while keeping "wholes" (direct date comparison on different years) and "erased" dates". Looked at momentjs and date-fns, settled for Luxon DateTime since date-fns no longer supports CDN and Luxon DateTime is supposedly a better version of momentjs.

### Useful resources

- [Luxon Demo](https://moment.github.io/luxon/demo/global.html)
- [Luxon Docs](https://moment.github.io/luxon/api-docs/index.html)

## Author

- Website - [MGSimard @ Github](https://mgsimard.github.io/)
- Frontend Mentor - [@MGSimard](https://www.frontendmentor.io/profile/MGSimard)
