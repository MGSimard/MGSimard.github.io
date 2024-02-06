const notifCountDisplay = document.getElementById("notif-count");
const notifications = document.getElementById("notifications");
const notifCards = notifications.querySelectorAll("div.notif-card");
//Would usually get notification count from a database I guess, since if someone  had a large amount of notifications you can't possibly get the amount of "enabled" notif card elements since bottom would either be unloaded or inside an undisplayed page or whatever. So setting my own starting number instead of getting elements which contain card-unseen class
//Would also usually use the html template tag to create each notification by cloning the template X amount of time, modifying according to info and then appending to the notif container. That's what I did for my op.gg clone LoL match history project. Then if you want multiple pages you can display 5-10 cards per page and to choose which cards are displayed you'd do a range that's (page number * amount of cards you want to display, to that num + cards you want)
//Anyway this works fine for static project not like I'm given an alternative
let notifCount = 3;
notifCountDisplay.innerHTML = notifCount;

markAllRead.onclick = () => {
    clearNotifs()
}

function clearNotifs() {
    notifCount = 0;
    notifCountDisplay.innerHTML = notifCount;
    for (let i = 0; i < notifCards.length; i++) {
        notifCards[i].classList.remove("card-unseen")
    }
}