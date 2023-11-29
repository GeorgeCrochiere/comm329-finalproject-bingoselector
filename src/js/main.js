init();

function init() {
    // JS Warning
    document.getElementById("enableJS").classList.add("hidden");
}

function toggleModal(modalID) {
    let modal = document.getElementById(modalID);
    modal.classList.toggle("hidden");
}