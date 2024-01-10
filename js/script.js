const nameInput = document.querySelector('input[type="text"]'); 
const jobOptions = document.querySelector('#other-job-role');
const jobSelect = document.querySelector('#title'); 
const shirtColor = document.querySelector('#shirt-colors'); 
const colorSelect = document.querySelectorAll('option[data-theme]');
const design = document.querySelector('#design'); 
const activities = document.querySelector('#activities');
const totalCost = document.querySelector('#activities-cost');
const checkedCost = document.querySelectorAll('input[type="checkbox"]');
const payment = document.querySelector('#payment'); 
const creditCard = document.querySelector('option[value="credit-card"]');
const paypalDiv = document.querySelector("#paypal"); 
const bitcoinDiv = document.querySelector("#bitcoin"); 
const creditCardDiv = document.querySelector('#credit-card');

/*When the page first loads, the first text field should have the focus state by default to prompt the user. Used focus on the name input.*/

window.onload = function load() {
    nameInput.focus(); 
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
let price = 0;

activities.addEventListener('change', (e) => {
    checkedActivity = e.target;

    for (let i = 0; i < checkedCost.length; i++) {

        if (checkedCost[i].checked) {
           price += parseInt(checkedCost[i].getAttribute('data-cost'));
        }
     
        }
        totalCost.innerHTML = `Total: $${price}`; 
    
}); 

/* Payment info Section*/


creditCard.selected = true;  
paypalDiv.hidden = true; 
bitcoinDiv.hidden = true; 

payment.addEventListener("change", (e) => {
       
        if (e.target.value === 'paypal') {
            paypalDiv.hidden = false; 
            bitcoinDiv.hidden = true; 
            creditCardDiv.hidden = true; 
        }
        if (e.target.value === 'bitcoin') {
            paypalDiv.hidden = true; 
            bitcoinDiv.hidden = false; 
            creditCardDiv.hidden = true; 
        }
        else if (e.target.value === 'credit-card') {
            paypalDiv.hidden = true; 
            bitcoinDiv.hidden = true; 
            creditCardDiv.hidden = false; 
        }
    });

    /*form validation*/

    const emailInput = document.querySelector('input[type="email"]');
    const ccNumber = document.querySelector('input[id="cc-num"]');
    const zipCode = document.querySelector('input[id="zip"]');
    const cvv = document.querySelector('input[id="cvv"]');
    
    document.querySelector('form').addEventListener('submit', (e) => {
        const isValidUsername = () => /^[a-z]+$/.test(nameInput.value); 
        const isValidEmail = () => /^[^@] + @ [^@.]+\.[a-z]+$/i.test(emailInput.value); 
        const isValidccNumber = () => /^4[0-9]{12}(?:[0-9]{3})?$/.test(ccNumber.value); 
        const isValidCvv = () => /^[0-9]{3,4}$/.test(cvv.value); 
        const isValidZipCode = () => /^[0-9]{5}$/.test(zipCode.value);
        const isValidActivity = () => price > 0; 
        
        //name validator 

        if (isValidUsername()) {
            nameInput.closest('label').nextElementSibling.className.add = 'valid';
           } else {
            nameInput.closest('label').className = 'name-hint';
            nameInput.nextElementSibling.style.display = 'block'; 
           } 

           //email validator 
           if (isValidEmail()) {
            emailInput.closest('label').className.add = 'valid'; 
           } else {
            emailInput.closest('label').className = 'email-hint'; 
            emailInput.nextElementSibling.style.display = 'block'; 
        }
        //card number validator 
        if (isValidccNumber()) {
            ccNumber.closest('label').className.add = 'valid'; 
        } else {
            ccNumber.closest('label').className = '"cc-hint'; 
            ccNumber.nextElementSibling.style.display = 'block'; 
        }
        //cvv validator 
        if (isValidCvv()) {
            cvv.closest('label').className.add = 'valid';
        } else {
            cvv.closest('label').className = 'cvv-hint'; 
            cvv.nextElementSibling.style.display = 'block'; 
        }

        //zipcode validator
        if (isValidZipCode()) {
            zipCode.closest('label').className.add = 'valid'; 
        } else {
            zipCode.closest('label').className = 'zip-hint'; 
            zipCode.nextElementSibling.style.display = 'block'; 
        }

        //activities validator
        for (let i = 0; i < checkedCost.length; i++) {

        if (checkedCost[i].checked <= 1) {
            activities.lastChild.className.add = 'valid'; 
         } else {
            activities.lastChild.className = 'activities-hint'; 
            activities.lastElementChild.style.display = 'block';
            }
        }
        e.preventDefault();
    });  