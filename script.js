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

let currentFoodIndex = 0;
let currentImg = 0;
frontCardImg.src = imgLinks[currentFoodIndex][currentImg];

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

            } else {

                if(deltaY > 0) {// Swipped UP
                    console.log("Swipped UP");
                } else {        // Swipped DOWN
                    console.log("Swipped DOWN");
                }

            }

            setTimeout(() => {
                swap();
            }, 350);

        } else if (deltaX == 0 && deltaY == 0) { // If user simply clicks. I had to set this instead of the "click" event Listener cause even a slighty swipe triggers a "click" which is not what I want.

            if(event.clientX < mainElement.offsetLeft){
                console.log("left clicked");
                if(--currentImg < 0)
                    currentImg = 2;
            } else {
                console.log("right clicked");
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
        frontCardElement.style.transform = "rotate(" + (0.5 * -deltaX) + "deg) translate(" + (2.5 * -deltaX) + "px)";

        // Dinamically change what is the food on the back card depending on the direction of the swipe
        let backCardFoodIndex;
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

            } else {

                if(deltaY > 0) {// Swipped UP
                    console.log("Swipped UP");
                } else {        // Swipped DOWN
                    console.log("Swipped DOWN");
                }

            }

            setTimeout(() => {
                swap();
            }, 350);

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
        frontCardElement.style.transform = "rotate(" + (0.5 * -deltaX) + "deg) translate(" + (2.5 * -deltaX) + "px)";

        // Dinamically change what is the food on the back card depending on the direction of the swipe
        let backCardFoodIndex;
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
    }
});


function swap() {
    frontCardElement.remove();
    frontCardElement = backCardElement;
    frontCardImg = frontCardElement.children[0];
    backCardElement = mainElement.children[1];
    backCardImg = backCardElement.children[0];
    backCardImg.src = "foods/food1-1.jpg";
    backupCardElement = document.createElement("div");
    backupCardElement.classList.add("card");
    backupCardImg = document.createElement("img");
    backupCardImg.src = "foods/food1-1.jpg";
    backupCardElement.appendChild(backupCardImg);
    mainElement.appendChild(backupCardElement);
}
