// Every food is gonna have 3 images
let imgLinks = [
    ["foods/food1-1.jpg", "foods/food1-2.jpg", "foods/food1-3.jpg"],
    ["foods/food2-1.jpg", "foods/food2-2.jpg", "foods/food2-3.jpg"],
];

let mainElement = document.querySelector("main");
let imgElement = mainElement.children[0];
imgElement.src = imgLinks[0][0];

let currentImg = 1;
mainElement.addEventListener("click", () => {
    if(currentImg > 2)
        currentImg = 0;

    imgElement.src = imgLinks[0][currentImg++];
});
