function playGame() {
    // const backgroundColorList = ["red", "orange", "yellow", "lime", "aqua", "blue", "blueviolet"];

    let items = JSON.parse(sessionStorage.getItem('listArray'));
    let randChoice = Math.floor(Math.random() * items.length);
    items = setLongList(items);

    // Get Choice
    document.getElementById('dispChoice').innerText = items[randChoice];
    document.getElementById('oldChoices').innerHTML += "<p>" + items[randChoice] + "</p>";

    // Set Animation Data
    let playedData = document.getElementById('playList');
    while (playedData.firstChild) {
        playedData.removeChild(playedData.lastChild);
    }

    let individualData = "";
    items.forEach((item) => {
        // let randColorIndex = Math.floor(Math.random() * backgroundColorList.length);
        // individualData += "\t\t<p class=\"listItem\"><span style=\"color: " + backgroundColorList[randColorIndex] + "\">&laquo;&emsp;</span><span class=\"itemOneLine\">" + item + "</span><span style=\"color: " + backgroundColorList[randColorIndex] + "\">&emsp;&raquo;</span></p>\n";
        individualData += "\t\t<p class=\"listItem\"><span>" + item + "</span></p>\n";
    });

    // Add Extra visual items for effect starting and item selection
    for (let i = 0; i < 10; i++) {
        playedData.innerHTML += individualData;
    }

    playedData.classList.toggle('hidden');

    let optionLists = document.getElementsByClassName('gameOptions');
    Array.prototype.forEach.call(optionLists, function (op) {
        op.classList.toggle('hidden');
        op.classList.toggle('defaultAnim');
    });

    document.getElementById('playTurn').classList.toggle('hidden');
    // random choice, items in list (may be different)
    animationDisp(randChoice, items.length);
    showResult();
}

function resetGame() {
    startAnim();
    document.getElementById('oldChoices').innerHTML = "";
    storeGameContent();
    setGameContent();
    setTimeout(() => {
        if (!document.getElementById('results').classList.contains('hidden')) {
            closeResult();
        }
        setVisual();
        endAnim();
    }, 650);
}

function newGame() {
    startAnim();
    document.getElementById('oldChoices').innerHTML = "";
    setTimeout(() => {
        if (!document.getElementById('results').classList.contains('hidden')) {
            closeResult();
        }
        showGame();
        endAnim();
    }, 650);
}

function removeItem() {
    let items = JSON.parse(sessionStorage.getItem('listArray'));
    let num = items.indexOf(document.getElementById('dispChoice').innerText);
    items.splice(num, 1);
    sessionStorage.setItem('listArray', JSON.stringify(items));
    console.log(items);
}

function nextItem() {
    startAnim();
    setTimeout(() => {
        setVisual();
        closeResult();
        endAnim();
    }, 650);
}

function nextItemRemove() {
    if (JSON.parse(sessionStorage.getItem('listArray')).length == 1) {
        toggleModal('results');
        toggleModal('emptyModal');
    } else {
        removeItem();
        nextItem();
    }
}

function showPastGuesses() {
    document.getElementById('pastModal').classList.toggle('hidden');
}

function showResult() {
    setTimeout(() => {
        document.getElementById('results').classList.toggle('hidden');
    }, 4000);
}

function closeResult() {
    document.getElementById('results').classList.toggle('hidden');
    document.getElementById('playList').style.transform = "";
    document.getElementById('playList').classList.toggle('hidden');
    document.getElementById('playTurn').classList.toggle('hidden');
    let optionLists = document.getElementsByClassName('gameOptions');
    Array.prototype.forEach.call(optionLists, function (op) {
        op.classList.toggle('hidden');
        op.classList.toggle('defaultAnim');
    });
}

function animationDisp(index, listLength) {
    let num = (9 * listLength) + index;
    let den = 10 * listLength;
    let finalPercent = (num / den) * 1.0;

    let list = document.getElementById('playList');
    list.style.transform = "";
    let movement = list.offsetHeight * finalPercent;

    let transformations = [
        { transform: "translateY(0%)" },
        { transform: "translateY(calc(-" + movement + "px + 2rem))" }
    ];

    const timing = {
        duration: 3500,
        iterations: 1,
        easing: "ease-out",
    };

    list.animate(transformations, timing);
    list.style.transform = "translateY(calc(-" + movement + "px + 2rem))";
}

function endStateNewGame() {
    endStateClear();
    setTimeout(() => {
        newGame();
    }, 650);
}

function endStateResetGame() {
    endStateClear();
    setTimeout(() => {
        resetGame();
    }, 650);
}

function endStateClear() {
    startAnim();
    setTimeout(() => {
        // Hide modal
        toggleModal('emptyModal');

        // Reset Results
        document.getElementById('playList').style.transform = "";
        document.getElementById('playList').classList.toggle('hidden');
        document.getElementById('playTurn').classList.toggle('hidden');
        let optionLists = document.getElementsByClassName('gameOptions');
        Array.prototype.forEach.call(optionLists, function (op) {
            op.classList.toggle('hidden');
            op.classList.toggle('defaultAnim');
        });

        endAnim();

    }, 650);
}