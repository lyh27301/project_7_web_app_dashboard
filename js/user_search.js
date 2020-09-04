// Declare variables
const userSearchInput = document.getElementById('user-search');
const container = document.getElementById("auto-complete");
const user_list = [
     'Alfonso Iglesias',
     'Petar Bühler', 
     'Leonora Hassel', 
     'Marialba Pires', 
];

let filter, user, i, name;
let nameElements = [];

userSearchInput.addEventListener('keyup', searchFunction);
userSearchInput.addEventListener('click', searchFunction);
userSearchInput.addEventListener("focusout", hideNames);

container.addEventListener('click', e => {
    console.log(e.target);
    if(e.target.tagName === 'P') {
        userSearchInput.value = e.target.textContent;
    }
});

function searchFunction() {

    // Check if name list is initialized.
    if(nameElements.length === 0) {
        nameElements = init_list();
    }

    filter = userSearchInput.value.toUpperCase();

    // Loop through all users' names and hide those who don't match the search query.
    for (i = 0; i < user_list.length; i++) {
        name = user_list[i];
        if (name.toUpperCase().indexOf(filter) > -1) {
            // If matched (case of empty input value is included)
            nameElements[i].style.display = '';
        } else {
            nameElements[i].style.display = 'none';
        }
    }
}

function init_list() {
    let nameElement = null;
    const nameElements = [];
    user_list.forEach(name => {
        nameElement = document.createElement('p');
        nameElement.textContent = name;
        nameElement.id = name.replace(/\s/g, '');
        container.appendChild(nameElement);
        nameElements.push(nameElement);
    });
    return nameElements;
}

function hideNames() {
    setTimeout( function () {
            nameElements.forEach(nameElement => {
                nameElement.style.display = 'none';
            });
        }, 500);
}


