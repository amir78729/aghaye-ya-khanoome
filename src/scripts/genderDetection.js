const textareaObject = document.getElementById('name-input');
const submitButton = document.getElementById('submit-button');
const predictionGender = document.getElementById('prediction-gender');
const predictionProbability = document.getElementById('prediction-probability');


// disabling submit button initially
submitButton.disabled = true;

/** Clearing "Prediction" and "Saver Answer" sections while waiting for the response of API call and adding wait icon */
const goingToWaitingStatus = () => {
    [predictionGender, predictionProbability].forEach(section => {
        section.innerHTML = `<i class='fas fa-clock'></i>`;
    });
    savedAnswer.innerHTML = localStorage.getItem(textareaObject.value)
        ? `${textareaObject.value}: ${localStorage.getItem(textareaObject.value)}`
        : `<i class='fas fa-clock'></i>`;

}

/** Guessing gender for a name using https://api.genderize.io and updating "Prediction" section */
const guessGender = () => {
    // updating "Prediction" and "Saver Answer" sections if necessary
    goingToWaitingStatus();
    // API call
    fetch(`https://api.genderize.io/?name=${textareaObject.value}`)
        .then(res => res.json())
        .then(res => {
            // showing predicted gender
            predictionGender.innerHTML = res.gender
                ? `${res.gender} <i class='fas fa-${res.gender}'></i>`
                : `unknown! <i class='fas fa-question-circle'></i>`;
            // showing probability
            predictionProbability.innerHTML = `${res.probability * 100}%` || '<i class=\'fas fa-question-circle\'></i>';
            if (res.probability === 0)
                predictionProbability.innerHTML = `unknown! <i class='fas fa-question-circle'></i>`;
            // enabling save button if the response was valid
            checkSaveButtonValidity();
            updateSavedAnswersSection();
            if (!res.gender) showAlert(`${textareaObject.value.trim()}'s gender was not found!`, 'red');
            clearButton.disabled = savedAnswer.innerHTML.includes('Not Saved!');
        });
    event.preventDefault()

};

/** Checking if input name only contains alphabets and the string length is between 1 and 255
 *  and disabling save button*/
const checkSubmitButtonValidity = () => {
    saveButton.disabled = true;
    submitButton.disabled = !(/^[a-zA-Z ]{1,255}$/.test(textareaObject.value));
};
