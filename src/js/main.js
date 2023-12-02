init();

function init() {
    // JS Warning
    document.getElementById("enableJS").classList.add("hidden");
    if (sessionStorage.getItem('listData') !== null) {
        document.getElementById('itemInput').value = sessionStorage.getItem('listData');
    }
}

function toggleModal(modalID) {
    let modal = document.getElementById(modalID);
    modal.classList.toggle("hidden");
}

function reset() {
    toggleModal('confirmModal');
    document.getElementById('itemInput').value = '';
}

function startGame() {
    if (!validateList()) {
        return false;
    }
    storeGameContent();
    setGameContent();
    startAnim();
    setTimeout(() => {
        // Hide game options and show game
        showGame();
        endAnim();
    }, 900);
}

function startAnim() {
    document.getElementById('animationTransition').classList.remove('animEnd');
    document.getElementById('animationTransition').classList.add('animStart');
}

function endAnim() {
    document.getElementById('animationTransition').classList.remove('animStart');
    document.getElementById('animationTransition').classList.add('animEnd');
}

function validateList() {
    let list = document.getElementById('itemInput').value;
    if (list == '') {
        // No list present
        toggleModal('invalidListModal');
        return false;
    } else {
        // List present
        return true;
    }
}

function showGame() {
    document.getElementById('randomWheel').classList.toggle('showGame');
    document.getElementById('randomWheel').classList.toggle('hidden');
    document.getElementById('dataInput').classList.toggle('hidden');
    document.getElementById('pastChoices').classList.toggle('hidden');
}

function storeGameContent() {
    let list = document.getElementById('itemInput').value.toString();
    list.trim();
    sessionStorage.setItem('listData', list);
}

function setGameContent() {
    let list = sessionStorage.getItem('listData');
    let items = [];
    let temp = '';

    for (let i = 0; i < list.length; i++) {
        if (list.charAt(i) != '\n') {
            temp += list.charAt(i);
        } else if (temp == '') {
            // Skipped line (blank line)
        } else {
            items.push(temp);
            temp = '';
        }
    }
    items.push(temp);

    let gameList = "";
    items.forEach((item) => {
        gameList += "\t\t<p class=\"listItem\">" + item + "</p>\n";
    });
    document.getElementById('gameOptions').innerHTML = gameList;
}