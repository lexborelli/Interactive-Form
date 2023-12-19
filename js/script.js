const nameFocus = document.querySelector('input[type="text"]'); 
const jobOptions = document.querySelector('#other-job-role');
const otherOption = document.querySelector('option[value="other"]'); 
const jobSelect = document.querySelector('#title'); 


window.onload = function focusOnName() {
    nameFocus.focus(); 
};


jobOptions.hidden = true; 

jobSelect.addEventListener('change', (e) => {

        if (e.target.value === 'other') {
            jobOptions.hidden = false; 
            jobOptions.diabled = false; 
        } else {
        jobOptions.diabled = true;
    }
});