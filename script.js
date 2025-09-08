// Every food is gonna have 3 images
let imgLinks = [
    ["foods/food1-1.jpg", "foods/food1-2.jpg", "foods/food1-3.jpg"],
    ["foods/food2-1.jpg", "foods/food2-2.jpg", "foods/food2-3.jpg"],
    ["foods/food3-1.jpg", "foods/food3-2.jpg", "foods/food3-3.jpg"],
];

let mainElement = document.querySelector("main");
let imgElement = mainElement.children[0];
let currentImg = 0;
imgElement.src = imgLinks[2][currentImg];


mainElement.addEventListener("click", (event) => {

    // If clicks to on the left half of the card
    if(event.clientX < mainElement.offsetLeft){
        if(--currentImg < 0)
            currentImg = 2;
    } else {
        if(++currentImg > 2)
            currentImg = 0;
    }

    imgElement.src = imgLinks[2][currentImg];
});
