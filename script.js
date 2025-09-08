// Every food is gonna have 3 images
let imgLinks = [
    ["foods/food1-1.jpg", "foods/food1-2.jpg", "foods/food1-3.jpg"],
    ["foods/food2-1.jpg", "foods/food2-2.jpg", "foods/food2-3.jpg"],
    ["foods/food3-1.jpg", "foods/food3-2.jpg", "foods/food3-3.jpg"],
];

let mainElement = document.querySelector("main");
let imgElement = mainElement.children[0];
let currentFoodIndex = 0;
let currentImg = 0;
imgElement.src = imgLinks[currentFoodIndex][currentImg];


// Tap Event Listener
mainElement.addEventListener("click", (event) => {

    // If clicks to on the left half of the card
    if(event.clientX < mainElement.offsetLeft){
        if(--currentImg < 0)
            currentImg = 2;
    } else {
        if(++currentImg > 2)
            currentImg = 0;
    }

    imgElement.src = imgLinks[currentFoodIndex][currentImg];
});


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
                } else {        // Swipped RIGHT
                    if(++currentFoodIndex > 2)
                        currentFoodIndex = 0;
                }

            } else {

                if(deltaY > 0) {// Swipped UP
                    console.log("Swipped UP");
                } else {        // Swipped DOWN
                    console.log("Swipped DOWN");
                }

            }


            // Updates Food Image
            imgElement.src = imgLinks[currentFoodIndex][currentImg];

            initPosX = 0;
            initPosY = 0;
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

        console.log("DeltaX: " + deltaX);
        console.log("DeltaY: " + deltaY);
        console.log("Absolute DeltaX: " + Math.abs(deltaX));
        console.log("Absolute DeltaY: " + Math.abs(deltaY));

        // Makes sure to don't work on a subtle swipe
        if(Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {

            // Applies the Swipe only to vertical or horizontal
            if(Math.abs(deltaX) > Math.abs(deltaY)) {

                if(deltaX > 0) {// Swipped LEFT
                    if(--currentFoodIndex < 0)
                        currentFoodIndex = 2;
                } else {        // Swipped RIGHT
                    if(++currentFoodIndex > 2)
                        currentFoodIndex = 0;
                }

            } else {

                if(deltaY > 0) {// Swipped UP
                    console.log("Swipped UP");
                } else {        // Swipped DOWN
                    console.log("Swipped DOWN");
                }

            }


            // Updates Food Image
            imgElement.src = imgLinks[currentFoodIndex][currentImg];

            initPosX = 0;
            initPosY = 0;
        }
    }
});
