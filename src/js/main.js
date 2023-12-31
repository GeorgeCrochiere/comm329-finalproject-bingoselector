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
    }, 650);
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
}

function storeGameContent() {
    let list = document.getElementById('itemInput').value.toString();
    list.trim();
    sessionStorage.setItem('listData', list);
}

function setGameContent() {
    let list = sessionStorage.getItem('listData');
    list.trim();
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
    if (temp != '') {
        items.push(temp);
    }
    sessionStorage.setItem('listArray', JSON.stringify(items));
    setVisual();
}

function setVisual() {
    let items = JSON.parse(sessionStorage.getItem('listArray'));
    items = setLongList(items);

    let gameList = "";
    items.forEach((item) => {
        gameList += "\t\t<p class=\"listItem\"><span>" + item + "</span></p>\n";
    });
    // several lists to account for 1 item, example
    let optionLists = document.getElementsByClassName('gameOptions');
    Array.prototype.forEach.call(optionLists, function (op) {
        op.innerHTML = gameList + gameList;
    });
}

function setLongList(list) {
    let tbAdded = list;
    while (list.length < 20) {
        list = list.concat(tbAdded);
    }
    return list;
}

