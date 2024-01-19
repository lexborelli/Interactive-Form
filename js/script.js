const nameInput = document.querySelector('input[type="text"]'); 
const jobOptions = document.querySelector('#other-job-role');
const jobSelect = document.querySelector('#title'); 
const shirtColor = document.querySelector('#color'); 
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
        jobOptions.hidden = true; 
    }
});

/* T-shirt Info--- targeted the shirt colors id to hide the the dropdown color menu. Upon clicking the design drop down menu the color selection becomes visible. When selecting the design, the forloop in the eventlisteners loops through the colors and targets the data-theme attributes under the same data theme. Either Js-puns or  "i love js". Once selected the opposite data-theme becomes disable and hidden.   */



    shirtColor.disabled = true; 


    design.addEventListener('change', (e) => {   
        shirtColor.disabled = false; 

        for (let i = 0; i < colorSelect.length; i++) {

        if (e.target.value !== colorSelect[i].getAttribute("data-theme")) {
           const option = document.querySelector(`[data-theme = "${e.target.value}"]`);
           option.selected = true; 
           colorSelect[i].hidden = true; 
           colorSelect[i].disabled = true;
            } else {
                colorSelect[i].hidden = false; 
                colorSelect[i].disabled = false; 
            }
         }
});

/*Activities Added an event listener to the "Register for Activities" fieldset Id element to listen for changes. If an activity is checked, the total cost should increase by the value in the data-cost attribute of the activity’s <input type="checkbox"> element.
If an activity is unchecked, the total cost should decrease by that amount. The checked an uncheck checkbox show display the correct data-cost price in the p element with the id "activities-cost".Programmed all the activity section checkbox input elements to listen
for focus and blur elements.When the blur event is detected, remove the .focus class from the label element that possesses it. It can be helpful here to directly target the element with the className of .focus in order to remove it. created an if statement that targets the input type ='checkbox' element for changes if an element was selected and the price is not equal to & the totalCost(p element with #activities-cost) is the valid class is added. 
if selected then unselected the valid class is removed and the not valid class is displayed with the activities-hint, which asks user to select at leasst one activity.  */

for (let i = 0; i < checkedCost.length; i++) {
    checkedCost[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
        });

    checkedCost[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus'); 
    });

};

activities.addEventListener('change', (e) => {
    let price = 0;

    for (let i = 0; i < checkedCost.length; i++) {

        if (checkedCost[i].checked) {
           price += parseInt(checkedCost[i].getAttribute('data-cost'));
        } else {
            price - parseInt(checkedCost[i].getAttribute('data-cost'));
        }
        }
        totalCost.innerHTML = `Total: $${price}`; 
    
    if (totalCost !== 0 && price !== 0) {
       activities.closest('fieldset').classList.add('valid');
       activities.closest('fieldset').classList.remove('not-valid');
       activities.lastElementChild.style.display = 'none';
       activities.classList.remove('activities-hint');
      } else {
        activities.closest('fieldset').classList.remove('valid');
        activities.closest('fieldset').classList.add('not-valid');
        activities.lastElementChild.style.display = 'block';
        activities.classList.add('activities-hint');

        } 
    
}); 





/* Payment info Section defaulted the credit card payment to be visible as a form of payment. 
Until, paypal or bitcoin is selected. Created an event listener to listen for changes in the payment drop down menu and desplay the form of payment that was selected and 
hide the payments that were not selected. */


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
    const isValidUsername = () => /^[A-Za-z.\s_-]+$/.test(nameInput.value); 
    const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value); 
    const isValidccNumber = () => /^\d{13,16}$/.test(ccNumber.value); 
    const isValidCvv = () => /^[0-9]{3}$/.test(cvv.value); 
    const isValidZipCode = () => /^[0-9]{5}$/.test(zipCode.value);

    /* added a prevalidation upon typing in input element to tell user if valid in realtime*/
  
    nameInput.addEventListener('keyup', () => {
        validateInputs(); 
    });
    
    emailInput.addEventListener('keyup', () => {
        validateInputs();
    }); 

    ccNumber.addEventListener('keyup', () => {
        validateInputs();
    });

    cvv.addEventListener('keyup', () => {
        validateInputs();
    });

    zipCode.addEventListener('keyup', () => {
        validateInputs();
    });
    
    activities.addEventListener('keyup', () => {
        validateInputs();
    });

    const validateInputs = () => {

         //name validator 


        if (nameInput.value === '') {
            nameInput.closest('label').classList.add('name-hint');
            nameInput.closest('label').classList.remove('valid'); 
            nameInput.closest('label').classList.add('not-valid'); 
            nameInput.nextElementSibling.style.display = 'block'; 
        } else if (!isValidUsername()) {
            nameInput.closest('label').classList.add('name-hint');
            nameInput.closest('label').classList.remove('valid'); 
            nameInput.closest('label').classList.add('not-valid'); 
            nameInput.nextElementSibling.style.display = 'block'; 
        } else {
            nameInput.closest('label').classList.remove('name-hint');
            nameInput.closest('label').classList.remove('not-valid'); 
            nameInput.closest('label').classList.add('valid');
            nameInput.nextElementSibling.style.display = 'none'; 
        }

         //email validator 


        if (emailInput.value === '') {
            emailInput.closest('label').classList.add('name-hint');
            emailInput.closest('label').classList.remove('valid'); 
            emailInput.closest('label').classList.add('not-valid'); 
            emailInput.nextElementSibling.style.display = 'block';
        } else if (!isValidEmail()) {
            emailInput.closest('label').classList.add('name-hint');
            emailInput.closest('label').classList.remove('valid'); 
            emailInput.closest('label').classList.add('not-valid'); 
            emailInput.nextElementSibling.style.display = 'block';
        } else {
            emailInput.closest('label').classList.remove('name-hint');
            emailInput.closest('label').classList.remove('not-valid'); 
            emailInput.closest('label').classList.add('valid');
            emailInput.nextElementSibling.style.display = 'none'; 
        }
        
        //credit card number validator 


        if (ccNumber.value === '') {
            ccNumber.closest('label').classList.add('name-hint');
            ccNumber.closest('label').classList.remove('valid'); 
            ccNumber.closest('label').classList.add('not-valid'); 
            ccNumber.nextElementSibling.style.display = 'block';
        } else if (!isValidccNumber()) {
            ccNumber.closest('label').classList.add('name-hint');
            ccNumber.closest('label').classList.remove('valid'); 
            ccNumber.closest('label').classList.add('not-valid'); 
            ccNumber.nextElementSibling.style.display = 'block';
        } else {
            ccNumber.closest('label').classList.remove('name-hint');
            ccNumber.closest('label').classList.remove('not-valid'); 
            ccNumber.closest('label').classList.add('valid');
            ccNumber.nextElementSibling.style.display = 'none';  
        }

         //cvv validator 


        if (cvv.value === '') {
            cvv.closest('label').classList.add('name-hint');
            cvv.closest('label').classList.remove('valid'); 
            cvv.closest('label').classList.add('not-valid'); 
            cvv.nextElementSibling.style.display = 'block';
        } else if (!isValidCvv()) {
            cvv.closest('label').classList.add('name-hint');
            cvv.closest('label').classList.remove('valid'); 
            cvv.closest('label').classList.add('not-valid'); 
            cvv.nextElementSibling.style.display = 'block';
        } else {
            cvv.closest('label').classList.remove('name-hint');
            cvv.closest('label').classList.remove('not-valid'); 
            cvv.closest('label').classList.add('valid');
            cvv.nextElementSibling.style.display = 'none';  
        }

        //zipcode validator
        if (zipCode.value === '') {
            zipCode.closest('label').classList.add('name-hint');
            zipCode.closest('label').classList.remove('valid'); 
            zipCode.closest('label').classList.add('not-valid'); 
            zipCode.nextElementSibling.style.display = 'block';
        } else if (!isValidZipCode()) {
            zipCode.closest('label').classList.add('name-hint');
            zipCode.closest('label').classList.remove('valid'); 
            zipCode.closest('label').classList.add('not-valid'); 
            zipCode.nextElementSibling.style.display = 'block';
        } else {
            zipCode.closest('label').classList.remove('name-hint');
            zipCode.closest('label').classList.remove('not-valid'); 
            zipCode.closest('label').classList.add('valid');
            zipCode.nextElementSibling.style.display = 'none';  
        }

        //activities validator 

        const activitySelected = activities.querySelector('input[type="checkbox"]:checked');
        activities.className = `activities ${activitySelected ? 'valid' : 'not-valid'}`;

    };



    

    document.querySelector('form').addEventListener('submit', (e) => {
      
        if (!isValidUsername || !isValidCvv || !isValidEmail || !isValidZipCode || !isValidccNumber) {
            e.preventDefault();
        } ;

        
       
    });    

   
