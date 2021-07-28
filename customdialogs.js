window.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("alertBtn").addEventListener("click", alertUser);
    document.getElementById("alertOkBtn").addEventListener("click", closeAlert);
    document.getElementById("confirmBtn").addEventListener("click", confirmUser);
    document.getElementById("promptBtn").addEventListener("click", promptUser);
    document.getElementById("confirmOkBtn").addEventListener("click", confirmDialog);
    document.getElementById("confirmCancelBtn").addEventListener("click", confirmCancel);
    document.getElementById("promptCancelBtn").addEventListener("click", promptCancel);
    document.getElementById("promptOkBtn").addEventListener("click", savePrompt);
}

function resetOutput() {
    document.getElementById("resultTxt").innerHTML="";
}

//When alert button pressed
function alertUser() {
    resetOutput();
    let alertDialog = document.getElementById("alertCustomDialog");
    alertDialog.showModal();

}

//used to close alert
function closeAlert() {
    let alertDialogID = document.getElementById("alertCustomDialog");
    alertDialogID.close();
}

//when confirm button pressed
function confirmUser() {
    resetOutput();
    let confirmDialogID = document.getElementById("confirmCustomDialog");
    confirmDialogID.showModal();
}

//when prompt button pressed
function promptUser() {
    resetOutput();
    let promptDialog = document.getElementById("promptCustomDialog");
    promptDialog.showModal();
    
}

//when user says yes to confirm
function confirmDialog() {
    let confirmDialogID = document.getElementById("confirmCustomDialog");
    confirmDialogID.close();
    document.getElementById("resultTxt").innerHTML="Confirm result: true";
}

//when user says cancel to confirm
function confirmCancel() {
    let confirmDialogID = document.getElementById("confirmCustomDialog");
    confirmDialogID.close();
    document.getElementById("resultTxt").innerHTML="Confirm result: false";
}

function promptCancel() {
    let promptDialogID = document.getElementById("confirmCustomDialog");
    promptDialogID.close();
}

function savePrompt() {
    let promptDialogID = document.getElementById("confirmCustomDialog");
    let promptTxt = document.getElementById("name");
    console.log(promptTxt);
    promptDialogID.close();
}