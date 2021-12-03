// disabling buttons initially
saveButton.disabled = true;
clearButton.disabled = true;

/** Changing "Saved Answer" part of the page */
const updateSavedAnswersSection = () => {
    const isInLocalStorage = localStorage.getItem(textareaObject.value);
    setSavedAnswerSectionVisibility(isInLocalStorage);
    savedAnswer.innerText = isInLocalStorage
        ? `${textareaObject.value}: ${localStorage.getItem(textareaObject.value)}`
        : 'Not Saved!';
    clearButton.disabled = savedAnswer.innerHTML.includes('Not Saved!');
}

/** Adding a data to the localStorage and show an alert */
const saveGender = (name, gender) => {
    guessGender();
    if (gender.includes('male') && !(femaleRadioButton.checked || maleRadioButton.checked)) {
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

};

/** Removing a data from localStorage and show an alert */
const clearSavedDate = name => {
    localStorage.removeItem(name);
    updateSavedAnswersSection();
    showAlert(`${name} was removed from saved items!`, 'green');
};

/** Checking if saving is acceptable */
const checkSaveButtonValidity = () => {
    saveButton.disabled = !((predictionGender.innerHTML.includes('male')
        || femaleRadioButton.checked
        || maleRadioButton.checked) && /^[a-zA-Z ]{1,255}$/.test(textareaObject.value));
};

/** Set the visibility of "Saved Answer" section area */
const setSavedAnswerSectionVisibility = show => {
    [document.getElementById('saved-answer-header'), savedAnswer, clearButton].forEach(element => {
        element.style.visibility = show ? 'visible' : 'hidden';
    })
};

// hiding this section initially
setSavedAnswerSectionVisibility(false);