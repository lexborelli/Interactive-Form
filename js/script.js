const nameFocus = document.querySelector('input[type="text"]'); 
const jobOptions = document.querySelector('#other-job-role');
const jobSelect = document.querySelector('#title'); 
const shirtColor = document.querySelector('#shirt-colors'); 
const colorSelect = document.querySelectorAll('option[data-theme]');
const design = document.querySelector('#design'); 


/*When the page first loads, the first text field should have the focus state by default to prompt the user. Used focus on the name input.*/

window.onload = function focusOnName() {
    nameFocus.focus(); 
};

/* JOB ROLE -- first, I hid the "other job role" text input until "other" is selected in the drop down menu. Then, I created an eventlistener to listen for clicks on the drop down menu. If "other" is clicked then the text input will become visible and enabled to allow the user to input other job roles. if not, then the text input under the drop down menu is diabled and not visible.*/
jobOptions.hidden = true; 

jobSelect.addEventListener('change', (e) => {

        if (e.target.value === 'other') {
            jobOptions.hidden = false; 
            jobOptions.disabled = false; 
        } else {
        jobOptions.disabled = true;
    }
});

/* T-shirt Info--- */

    shirtColor.hidden = true; 

    design.addEventListener('click', (e) => {   
        shirtColor.hidden = false;

        for(let i = 0; i < colorSelect.length; i++) {

        if (e.target.value !== colorSelect[i].getAttribute("data-theme")) {
           colorSelect[i].hidden = true; 
           colorSelect[i].disabled = true;
            } else {
                colorSelect[i].hidden = false; 
                colorSelect[i].disabled = false; 
            }
         }
});

/*Activities */
const activities = document.querySelector('#activities');
const totalCost = document.querySelector('#activities-cost');
const checkedCost = document.querySelectorAll('#activities input[type="checkbox"]');


activities.addEventListener('change', (e) => {
    let price = 0;
    checkedActivity = e.target;
    checkedActivityPrice = checkedActivity.getAttribute("data-cost");


    for (let i = 0; i < checkedCost.length; i++) {

        if (checkedActivity !== checkedCost[i].checked) {
           price += checkedActivityPrice;
           console.log(`Total: $${checkedActivityPrice}`);
        }
        else {
           price -= checkedActivityPrice; 
        }
        totalCost.innerHTML = `Total: $${checkedActivityPrice}`; 
    }
}); 