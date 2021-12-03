/** Showing a customized alert with message and color parameters */
const showAlert = (message, color) => {
    alertContainer.style.backgroundColor = color;
    alertContainer.innerHTML = message;
    alertContainer.style.top = '0';
    setTimeout(() => {
        alertContainer.style.top = '-64px';
    }, 3000);
}