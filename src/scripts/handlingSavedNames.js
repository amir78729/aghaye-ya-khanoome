const savedAnswer = document.getElementById('saved-answer');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-saved-answer');
const femaleRadioButton = document.getElementById('female-radio');
const maleRadioButton = document.getElementById('male-radio');


// disabling buttons initially
saveButton.disabled = true;
clearButton.disabled = true;

/** Changing "Saved Answer" part of the page */
const updateSavedAnswersSection = () => {
    if (localStorage.getItem(textareaObject.value)) {
        savedAnswer.innerText = `${textareaObject.value}: ${localStorage.getItem(textareaObject.value)}`;
    } else {
        savedAnswer.innerText = 'Not Saved!';
    }
    clearButton.disabled = savedAnswer.innerHTML.includes('Not Saved!');
}

/** Adding a data to the localStorage and show an alert */
const saveGender = (name, gender) => {
    if (gender.includes('male')) {
        // saving server's answer to localStorage
        localStorage.setItem(name, gender);
        updateSavedAnswersSection();
        showAlert(`${name} was saved as a ${gender} successfully from server's guess!`, 'green');
    } else {
        // saving our answer to localStorage
        if (!(femaleRadioButton.checked || maleRadioButton.checked)) {
            // no guess was inserted!
            showAlert(`Please select a guess using radio buttons to continue`, 'red');
        } else {
            localStorage.setItem(name, femaleRadioButton.checked ? 'female' : 'male');
            updateSavedAnswersSection();
            showAlert(`${name} was saved as a ${gender} successfully by you!`, 'green');
        }
    }

}

/** Removing a data from localStorage and show an alert */
const clearSavedDate = name => {
    localStorage.removeItem(name);
    updateSavedAnswersSection();
    showAlert(`${name} was removed from saved items!`, 'green');
}
const checkSaveButtonValidity = () => {
    saveButton.disabled = !((predictionGender.innerHTML.includes('male')
        || femaleRadioButton.checked
        || maleRadioButton.checked) && /^[a-zA-Z ]{1,255}$/.test(textareaObject.value));
}