/* Traffic chart switch */
// Get Elements
const switchControl = document.getElementById('hourly').parentElement;
switchControl.addEventListener('click', e => {
    let newOpt = null;
    if (e.target.tagName === 'INPUT') {
        newOpt = e.target.id;
    }

    if (e.target.tagName === 'LABEL') {
        newOpt = e.target.getAttribute('for');
    }

    if (newOpt) {
        // Display the chosen chart
        for (var prop in trafficOpts) {
            if (prop !== newOpt) {
                trafficOpts[`${prop}`].canvas.style.display = 'none';
            } else {
                trafficOpts[`${prop}`].canvas.style.display = '';
            }
        }
        // Update local storage
        if (supportsLocalStorage) {
            localStorage.setItem('trafficOption', newOpt);
        } else {
            trafficOpt = defaultOpt;
        }
    }
});
