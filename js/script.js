const nameFocus = document.querySelector('input[type="text"]'); 
const jobSelect = document.querySelector("#title"); 
const jobOptions = document.querySelectorAll('option[value]');
const jobOtherOption = document.querySelector('option[value="other"]'); 


window.onload = function focusOnName() {
    nameFocus.focus(); 
};

jobSelect.addEventListener("change", (e) => {
    for (let i = 0; i < jobSelect.length; i++) {

        if (e.target.value !== jobOtherOption) {
            jobOtherOption[i].hidden = true; 
            jobOtherOption[i].diabled = true; 
        } else {
        jobOtherOption[i].hidden = false; 
        jobOtherOption[i].diabled = false;
    }
}   if (jobOptions.value !== "") {
    jobOptions.value = "reselect"
}
});