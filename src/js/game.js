function playGame() {
    let items = JSON.parse(sessionStorage.getItem('listArray'));
    let randChoice = Math.floor(Math.random() * items.length);
    items = setLongList(items);

    // Past Choice
    document.getElementById('dispChoice').innerText = items[randChoice];

    // Set Animation Data
    let playedData = document.getElementById('playList');
    let individualData = "";
    items.forEach((item) => {
        individualData += "\t\t<p class=\"listItem\">" + item + "</p>\n";
    });

    // Add Extra visual items for effect starting and item selection
    for (let i = 0; i < 8; i++) {
        playedData.innerHTML += individualData;
    }

    playedData.classList.toggle('hidden');

    let optionLists = document.getElementsByClassName('gameOptions');
    Array.prototype.forEach.call(optionLists, function (op) {
        op.classList.toggle('hidden');
        op.classList.toggle('defaultAnim');
    });

    // random choice, items in list (may be different)
    animationDisp(randChoice, items.length);
}

function resetGame() {

}

function newGame() {

}

function removeItem(removeBool, index) {

}

function nextItem() {

}

function nextItemRemove() {

}

function animationDisp(index, listLength) {
    let num = (6 * listLength) + index;
    let den = 8 * listLength;
    let finalPercent = (num / den) * 100;

    let list = document.getElementById('playList');

    let transformations = [
        { transform: "translateY(0%)" },
        { transform: "translateY(calc(-" + finalPercent + "% - 2rem)" },
        { transform: "translateY(calc(-" + finalPercent + "% - 2rem)" }
    ];

    const timing = {
        duration: 2500,
        iterations: 1,
    };

    list.animate(transformations, timing);
    // list.style.setProperty();
    list.style.transform = "translateY(calc(-" + finalPercent + "% - 2rem))";

    console.log(index);
    console.log(finalPercent);
}