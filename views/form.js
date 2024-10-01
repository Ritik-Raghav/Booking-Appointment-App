window.addEventListener('DOMContentLoaded', loadData);

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = event.target.userName.value;
    const mobile = event.target.userNum.value;
    const email = event.target.userMail.value;

    const userObj = {
        username,
        mobile,
        email
    }
    try {
        const response = await axios.post('http://localhost:3000/', userObj);
        const user = response.data;
        console.log(user);
        displayUser(user);
    }
    catch(error) {
        console.log(error);
    }

    event.target.reset();
});

function displayUser(userObj) {
    const heading = document.createElement('h4');
    heading.textContent = userObj.username + ' - ' + userObj.mobile + ' - ' + userObj.email;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    heading.appendChild(delBtn);
    heading.appendChild(editBtn);

    delBtn.onclick = (event) => {
        axios.delete(`http://localhost:3000/delete/${userObj.id}`)
        .then(response => {
            console.log(response);
            list.removeChild(event.target.parentElement);
        })
        .catch(err => {
            console.log(err);
        })
    }
    editBtn.onclick = (event) => {
        document.querySelector('#userName').value = userObj.username;
        document.querySelector('#userNum').value = userObj.mobile;
        document.querySelector('#userMail').value = userObj.email;
        axios.delete(`http://localhost:3000/delete/${userObj.id}`)
        .then((response) => {
            console.log(response);
            
            list.removeChild(event.target.parentElement);

        })
    }

    const list = document.querySelector('ul');
    list.appendChild(heading);
}


async function loadData() {
    try {
        const response = await axios.get('http://localhost:3000/');
            const data = response.data;
            data.forEach(user => {
            displayUser(user);
        });
    }
    catch(error) {
        console.log(error);
    }
}