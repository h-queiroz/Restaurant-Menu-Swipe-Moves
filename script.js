// Every food is gonna have 3 images
let imgLinks = [
    ["foods/food1-1.jpg", "foods/food1-2.jpg", "foods/food1-3.jpg"],
    ["foods/food2-1.jpg", "foods/food2-2.jpg", "foods/food2-3.jpg"],
    ["foods/food3-1.jpg", "foods/food3-2.jpg", "foods/food3-3.jpg"],
];

let mainElement = document.querySelector("main");
let frontCardElement = mainElement.children[0];
let frontCardImg = frontCardElement.children[0];
let backCardElement = mainElement.children[1];
let backCardImg = backCardElement.children[0];

let cartElement = document.querySelector("#cart");
let cartIcon = cartElement.firstElementChild;
let cartMenu = cartElement.children[1];

let shoppingList = [];

let currentFoodIndex = 0;
let backCardFoodIndex;
let currentImg = 0;
frontCardImg.src = imgLinks[currentFoodIndex][currentImg];

updateCurrentFoodCounter();

// Swipe Event Listener on Mouse
let initPosX = 0;
let initPosY = 0;

mainElement.addEventListener("mousedown", (event) => {
    initPosX = event.clientX;
    initPosY = event.clientY;
});

document.body.addEventListener("mouseup", (event) => {
    if(initPosX != 0 && initPosY != 0){
        let deltaX = initPosX - event.clientX;
        let deltaY = initPosY - event.clientY;

        // Makes sure to don't work on a subtle swipe
        if(Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {

            // Applies the Swipe only to vertical or horizontal
            if(Math.abs(deltaX) > Math.abs(deltaY)) {

                if(deltaX > 0) {// Swipped LEFT
                    if(--currentFoodIndex < 0)
                        currentFoodIndex = 2;

                    frontCardElement.style.animationName = "disappear-back";
                } else {        // Swipped RIGHT
                    if(++currentFoodIndex > 2)
                        currentFoodIndex = 0;

                    frontCardElement.style.animationName = "disappear-front";
                }

                setTimeout(() => {
                    swap();
                }, 350);

            } else {
                let foundItem = shoppingList.find(food => food.id == currentFoodIndex);

                if(deltaY > 0) {// Swipped UP
                    if(foundItem == undefined)
                        shoppingList.push({id: currentFoodIndex, amount: 1});
                    else
                        foundItem.amount++;

                } else {        // Swipped DOWN
                    if(foundItem != undefined) {
                        foundItem.amount--;

                        if(foundItem.amount <= 0)
                            shoppingList = shoppingList.filter(item => item != foundItem);
                    }

                }

                updateShoppingListElement();
                updateCurrentFoodCounter();
                frontCardElement.style.transform = "translate(0)";
            }


        } else if (deltaX == 0 && deltaY == 0) { // If user simply clicks. I had to set this instead of the "click" event Listener cause even a slighty swipe triggers a "click" which is not what I want.

            if(event.clientX < mainElement.offsetLeft){
                if(--currentImg < 0)
                    currentImg = 2;
            } else {
                if(++currentImg > 2)
                    currentImg = 0;
            }

            frontCardImg.src = imgLinks[currentFoodIndex][currentImg];
        } else { // Reposition the card
            frontCardElement.style.transform = "rotate(0) translate(0)";
        }

        initPosX = 0;
        initPosY = 0;
    }
});


// Swipe Event Animation on Mouse Move
mainElement.addEventListener("mousemove", (event) => {
    if(initPosX != 0 && initPosY != 0) {
        let deltaX = initPosX - event.clientX;
        let deltaY = initPosY - event.clientY;

        // Animation for horizontal swipes
        if(Math.abs(deltaX) > Math.abs(deltaY)) {
            frontCardElement.style.transform = "rotate(" + (0.15 * -deltaX) + "deg) translate(" + (-deltaX) + "px)";

            // Dinamically change what is the food on the back card depending on the direction of the swipe
            if(-deltaX < 0){
                backCardFoodIndex = (currentFoodIndex - 1);

                if(currentFoodIndex == 0)
                    backCardFoodIndex = 2;

            } else {
                backCardFoodIndex = (currentFoodIndex + 1);

                if(currentFoodIndex == 2)
                    backCardFoodIndex = 0;
            }

            currentImg = 0;
            backCardImg.src = imgLinks[backCardFoodIndex][currentImg];
            updateBackFoodCounter();

        // Animation for vertical swipes
        } else {
            if(deltaY > 0) {
                if(deltaY > 100)
                    frontCardElement.style.transform = "translate(0, -100px)";
                else
                    frontCardElement.style.transform = "translate(0, -" + deltaY + "px)";

            } else {
                if(Math.abs(deltaY) > 100)
                    frontCardElement.style.transform = "translate(0, 100px) scale(0.7)";
                else
                    frontCardElement.style.transform = "translate(0, " + -deltaY + "px) scale(0.7)";
            }
        }
    }
});



// Swipe Event Listener on Touch
mainElement.addEventListener("touchstart", (event) => {
    initPosX = event.targetTouches[0].clientX;
    initPosY = event.targetTouches[0].clientY;
});

document.body.addEventListener("touchend", (event) => {
    if(initPosX != 0 && initPosY != 0){
        let deltaX = initPosX - event.changedTouches[0].clientX;
        let deltaY = initPosY - event.changedTouches[0].clientY;

        // Makes sure to don't work on a subtle swipe
        if(Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {

            // Applies the Swipe only to vertical or horizontal
            if(Math.abs(deltaX) > Math.abs(deltaY)) {

                if(deltaX > 0) {// Swipped LEFT
                    if(--currentFoodIndex < 0)
                        currentFoodIndex = 2;

                    frontCardElement.style.animationName = "disappear-back";
                } else {        // Swipped RIGHT
                    if(++currentFoodIndex > 2)
                        currentFoodIndex = 0;

                    frontCardElement.style.animationName = "disappear-front";
                }

                setTimeout(() => {
                    swap();
                }, 350);

            } else {
                let foundItem = shoppingList.find(food => food.id == currentFoodIndex);

                if(deltaY > 0) {// Swipped UP
                    if(foundItem == undefined)
                        shoppingList.push({id: currentFoodIndex, amount: 1});
                    else
                        foundItem.amount++;

                } else {        // Swipped DOWN
                    if(foundItem != undefined) {
                        foundItem.amount--;

                        if(foundItem.amount <= 0)
                            shoppingList = shoppingList.filter(item => item != foundItem);
                    }

                }

                updateShoppingListElement();
                updateCurrentFoodCounter();
                frontCardElement.style.transform = "translate(0)";
            }


        // I was going to set the same event for tap touching in the same way
        // as in tap clicking, but for some reason, the "tap on touch" also triggers
        // the "tap on click" that I set on mouseup, so only one of them is needed
        } else { // Reposition the card
            frontCardElement.style.transform = "rotate(0) translate(0)";
        }

        initPosX = 0;
        initPosY = 0;
    }
});


// Swipe Event Animation on Touch Move
mainElement.addEventListener("touchmove", (event) => {
    event.preventDefault(); // Prevents window scroll
    if(initPosX != 0 && initPosY != 0) {
        let deltaX = initPosX - event.targetTouches[0].clientX;
        let deltaY = initPosY - event.targetTouches[0].clientY;
        // frontCardElement.style.transform = "rotate(" + (0.5 * -deltaX) + "deg) translate(" + (2.5 * -deltaX) + "px)";

        // Animation for horizontal swipes
        if(Math.abs(deltaX) > Math.abs(deltaY)) {
            frontCardElement.style.transform = "rotate(" + (0.15 * -deltaX) + "deg) translate(" + (-deltaX) + "px)";

            // Dinamically change what is the food on the back card depending on the direction of the swipe
            if(-deltaX < 0){
                backCardFoodIndex = (currentFoodIndex - 1);

                if(currentFoodIndex == 0)
                    backCardFoodIndex = 2;

            } else {
                backCardFoodIndex = (currentFoodIndex + 1);

                if(currentFoodIndex == 2)
                    backCardFoodIndex = 0;
            }

            currentImg = 0;
            backCardImg.src = imgLinks[backCardFoodIndex][currentImg];
            updateBackFoodCounter();

        // Animation for vertical swipes
        } else {
            if(deltaY > 0) {
                if(deltaY > 100)
                    frontCardElement.style.transform = "translate(0, -100px)";
                else
                    frontCardElement.style.transform = "translate(0, -" + deltaY + "px)";

            } else {
                if(Math.abs(deltaY) > 100)
                    frontCardElement.style.transform = "translate(0, 100px) scale(0.7)";
                else
                    frontCardElement.style.transform = "translate(0, " + -deltaY + "px) scale(0.7)";
            }
        }
    }
});


function swap() {
    frontCardElement.remove();
    frontCardElement = backCardElement;
    let counter1 = document.createElement("div");
    updateCurrentFoodCounter();
    frontCardImg = frontCardElement.children[0];
    backCardElement = mainElement.children[1];
    let counter2 = document.createElement("div");
    counter2.classList.add("counter");
    backCardElement.appendChild(counter2);
    backCardImg = backCardElement.children[0];
    backCardImg.src = "foods/food1-1.jpg";
    backupCardElement = document.createElement("div");
    backupCardElement.classList.add("card");
    backupCardImg = document.createElement("img");
    backupCardImg.src = "foods/food1-1.jpg";
    backupCardElement.appendChild(backupCardImg);
    mainElement.insertBefore(backupCardElement, cartElement);
}


// If clicked on the shopping cart instead of the food card itself
cartElement.addEventListener("mouseup", (event) => {
    if(initPosX != 0 && initPosY != 0){
        let deltaX = initPosX - event.clientX;
        let deltaY = initPosY - event.clientY;

        if (deltaX == 0 && deltaY == 0) {
            event.stopPropagation();

            if(cartElement.clientWidth < 60) // Prevent weird behaviour if menu is already being shown
                showCartMenu();
        }

        initPosX = 0;
        initPosY = 0;
    }
});


function showCartMenu() {
    mainElement.style.overflow = "hidden";

    cartElement.style.padding = "350px";
    cartElement.style.top = "-50px";
    cartElement.style.right = "-180px";

    cartIcon.style.opacity = "0";
    setTimeout(() => {
        cartIcon.style.display = "initial";

        cartMenu.style.display = "flex";
        cartMenu.style.opacity = "1";

        cartElement.style.transition = "none";
        cartElement.style.padding = "30px 15px";
        cartElement.style.top = "0";
        cartElement.style.right = "0";
        cartElement.style.borderRadius = "0";
        cartElement.style.width = mainElement.clientWidth + "px";
        cartElement.style.height = mainElement.clientHeight + "px";
    }, 500);
}

document.querySelector("#close-cart-btn").addEventListener("mouseup", (event) => {
    event.stopPropagation();

    hideCartMenu();

    initPosX = 0;
    initPosY = 0;
});

function hideCartMenu() {

    cartElement.style.padding = "350px";
    cartElement.style.top = "-50px";
    cartElement.style.right = "-180px";
    cartElement.style.borderRadius = "50%";
    cartElement.style.width = "50px";
    cartElement.style.height = "50px";

    cartMenu.style.display = "none";

    // I need this tiny timeout for the animation run properly
    setTimeout(() => {
        cartElement.style.transition = "0.5s all ease-in";

        cartElement.style.padding = "0";
        cartElement.style.top = "15px";
        cartElement.style.right = "15px";

        cartIcon.style.display = "block";
        setTimeout(() => {
            cartIcon.style.opacity = "1";

            mainElement.style.overflow = "initial";
        }, 500);

    }, 50);

}

// Make it so it's not possible to slide by selecting the shopping cart
cartElement.addEventListener("mousemove", (event) => {
    event.stopPropagation();
});


function updateShoppingListElement() {
    let ulElement = document.createElement("ul");
    shoppingList.forEach(item => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let span = document.createElement("span");
        img.src = "foods/food" + (item.id+1) + "-1.jpg";
        span.textContent = item.amount + "x";
        li.appendChild(img);
        li.appendChild(span);
        ulElement.appendChild(li);
    });
    document.querySelector("ul").innerHTML = ulElement.innerHTML;
};

function updateCurrentFoodCounter() {
    let foundItem = shoppingList.find(food => food.id == currentFoodIndex);

    let currentCounter = document.querySelector(".counter");
    if(foundItem != undefined && foundItem.amount > 0) {
        currentCounter.textContent = foundItem.amount;
        currentCounter.style.display = "flex";
    } else
        currentCounter.style.display = "none";
};

function updateBackFoodCounter() {
    let foundItem = shoppingList.find(food => food.id == backCardFoodIndex);

    let backCounter = document.querySelectorAll(".counter")[1];
    if(backCounter != undefined) {
        if(foundItem != undefined && foundItem.amount > 0) {
            backCounter.textContent = foundItem.amount;
            backCounter.style.display = "flex";
        } else 
            backCounter.style.display = "none";
    }
};
