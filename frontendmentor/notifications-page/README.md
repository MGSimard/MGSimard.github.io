# Frontend Mentor - Notifications page solution

This is a solution to the [Notifications page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/notifications-page-DqK5QAmKbC). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

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

- Distinguish between "unread" and "read" notifications
- Select "Mark all as read" to toggle the visual state of the unread notifications and set the number of unread messages to zero
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Live Site URL: https://mgsimard.github.io/frontendmentor/notifications-page/index.html

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### What I learned

- Removing classes with classList.remove

### Continued development

- The idea of dynamically creating cards with data on them from a template, not doing it for this since not necessary but if this were live production that's how I would do it. Currently doing it for my LoLCBL prototype which is a barebones version of a player profile match history for League of Legends similar to op.gg or u.gg. Searching a player + their region fetches a ton of data from different Riot APIs and dynamically creates match history cards for each match in a set range with their stats, champ, player list, runes, items etc from a template card using html template tag and then cloning + appending each card modified in a loop.

### Useful resources

- classList.remove => https://stackoverflow.com/questions/2155737/remove-css-class-from-element-with-javascript-no-jquery

## Author

- Website - [MGSimard @ Github](https://mgsimard.github.io/)
- Frontend Mentor - [@MGSimard](https://www.frontendmentor.io/profile/MGSimard)