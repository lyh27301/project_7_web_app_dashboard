/** 
 * Alert Close Button 
 * */

const alertZone = document.getElementById('alert-zone');
alertZone.addEventListener('click', (e) => {
    console.log(e.target.className);
    if (e.target.className === 'alert-close-sign') {
        const alert = e.target.parentElement;
        alert.style.display = 'none';
    }
});

/**
 * Send Message
 */

const btnSend = document.getElementById('btn-send');
const messageArea = document.getElementById('message-area');
const feedback = document.getElementById('sending-feedback');
const feedbackCloseSign = document.getElementsByClassName('feedback-close-sign')[0];
const feedbackTextElement = document.getElementById('feedback-text');
btnSend.addEventListener('click', sendMsg);

function sendMsg() {

    let feedbackText = '';
    
    let uppercaseUsers = [];
    user_list.forEach(user => {
        uppercaseUsers.push(user.toUpperCase());
    });

    let currentInput = userSearchInput.value.toUpperCase();

    // Check if user is valid
    if (uppercaseUsers.includes(currentInput)) {
        // If valid, check if textArea is empty.
        if (messageArea.value !== '') {
            // If not empty, display the feedback of success.
            feedbackText = 'message sent successfully';
            feedback.style.backgroundColor = '#7ac087';
            // clear content of inputs.
            userSearchInput.value = '';
            messageArea.value = '';
        } else {
            // Display the empty message area error.
            feedbackText = 'invalid empty message';
            feedback.style.backgroundColor = 'darksalmon';
        }

    } else {
        // Display the invalid username error.
        feedbackText = `user ${userSearchInput.value} does not exist`;
        feedback.style.backgroundColor = 'darksalmon';
    }
    feedbackTextElement.textContent = feedbackText.toUpperCase();
    feedback.style.display = 'block';
}

feedback.addEventListener('click', (e) => {
    console.log(e.target.className);
    if (e.target.className === 'feedback-close-sign') {
        feedback.style.display = 'none';
    }
});


/**
 * Save and Cancel of Setting Preferences
 */
let emailNotificationSetting = '';
let profileSetting = '';
let timezoneSelection = '';

// Get checkboxes.
const emailSettingCheckbox = document.getElementById('email-setting-checkbox');
const profileSettingCheckbox = document.getElementById('profile-setting-checkbox');

// Get timezone section element.
const timezoneSection = document.getElementById('timezone');

// Get an array of timezoneOptions in timezone section. 
const timezoneOptions = Array.from(timezoneSection.children);

// Check if local storage is supported, then load previous settind (if exist).
if (supportsLocalStorage()) {
        // Get the user's previous email notification setting.
        if (localStorage.getItem('emailNotificationSetting')) {
            // If theres is such item saved previously, load the value.
            emailNotificationSetting = localStorage.getItem('emailNotificationSetting');
        }

        // Get the user's previous profile setting.
        if (localStorage.getItem('profileSetting')) {
            // If theres is such item saved previously, load the value.
            profileSetting = localStorage.getItem('profileSetting');
        }

        // Get the user's previous timezone setting.
        if (localStorage.getItem('timezoneSelection')) {
            // If theres is such item saved previously, load the value.
            timezoneSelection = localStorage.getItem('timezoneSelection');
        }

        initSetting(emailNotificationSetting, profileSetting, timezoneSelection);


}

function initSetting(settingEmail, settingProfile, timezoneId) {

    // If previous setting is off (or default), or no previous setting, no action needed.

    if (settingEmail === 'on') {
        emailSettingCheckbox.checked = true;
    }

    if (settingProfile === 'on') {
        profileSettingCheckbox.checked = true;
    }

    if (timezoneId) {
        timezoneOptions.forEach(opt => {
            if (opt.id) {
                // In case of default option, unselect it.
                opt.selected = false;
            }else{
                if(opt.id('timeZoneId') === timezoneId) {
                    opt.selected = true;
                }
            }
        }
        )
    }
}

// Handle the save button of Setting.
const btnSave = document.getElementById('btn-save');

btnSave.addEventListener('click', (e) => {

    // Email
    if (emailSettingCheckbox.checked) {
        localStorage.setItem('emailNotificationSetting', 'on');
    } else {
        localStorage.setItem('emailNotificationSetting', 'off');
    }

    // Profile
    if (profileSettingCheckbox.checked) {
        localStorage.setItem('profileSetting', 'on');
    } else {
        localStorage.setItem('profileSetting', 'off');
    }

    // Timezone
    let timezoneStatus = '';
    timezoneOptions.forEach(opt => {
        if (opt.selected && opt.id) {
            timezoneStatus = opt.id;
        }
    });
    localStorage.setItem('timezoneSelection', timezoneStatus);
})


// Handle the cancel button of Setting.
const btnCancel = document.getElementById('btn-cancel');
btnCancel.addEventListener('click', (e) => {
    // Set value of all three setting to empty strings.
    localStorage.setItem('emailNotificationSetting', '');
    localStorage.setItem('profileSetting', '');
    localStorage.setItem('timezoneSelection', '');
});

/**
 * Dropdown notifications
 */

// Set a counter of unchecked notifications.
let numNotifications = 2;

// Get button bell.
const bell = document.getElementById('bell');

// Get the green dot on bell icon.
const bellDot = document.getElementById('bell-dot');

// Get hidden dropdown menu.
const notifications = document.getElementsByClassName('dropdown-content')[0];

// Show dropdown menu when the bell icon is clicked.
bell.addEventListener('click', (e) => {
    notifications.style.display = 'block';
});

// Handle close signs of notifications.
notifications.addEventListener('click', (e) => {
    if(e.target.className === 'notification-close') {
        e.target.parentElement.style.display = 'none';
        numNotifications --;
        if(numNotifications === 0) {
            bellDot.style.display = 'none'; 
        }
    }
})