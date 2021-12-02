const savedAnswer = document.getElementById('saved-answer');
const saveButton = document.getElementById('save-button');
const clearButton = document.getElementById('clear-saved-answer');

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
    localStorage.setItem(name, gender);
    updateSavedAnswersSection();
    showAlert(`${name} was saved as a ${gender} successfully!`, 'green');
}

/** Removing a data from localStorage and show an alert */
const clearSavedDate = name => {
    localStorage.removeItem(name);
    updateSavedAnswersSection();
    showAlert(`${name} was removed from saved items!`, 'green');
}