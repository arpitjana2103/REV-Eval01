const URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees`;
const empConainer = document.querySelector('.employee-container');
const filterForm = document.querySelector('.emp-filter-form');
const page = filterForm.querySelector('.page');
const order = filterForm.querySelector('.salary');
const department = filterForm.querySelector('.department');
const gender = filterForm.querySelector('.gender');
const token = localStorage.getItem('token');
if (!token) {
    alert('Please Login to Continue');
    location.assign('/index.html');
}

const createCard = function (data) {
    // console.log();
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.innerHTML = `
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
      <h3>${data.name}</h3>
      <p>Gender : ${data.gender}</p>
      <p>Department : ${data.department}</p>
      <p>Salary : ${data.salary}</p>

    `;
    return card;
};

let displayCards = function (data) {
    empConainer.innerHTML = null;
    data.forEach(function (el) {
        empConainer.append(createCard(el));
    });
};

let displayEmp = async function (
    page,
    order = 'asc',
    filterBy = '',
    filterValue = ''
) {
    if (!filterBy) {
        filterValue = '';
    } else if (!filterValue) {
        filterBy = '';
    }
    if (!page) page = 1;
    let limit = 6;
    let url =
        URL +
        `?page=${page}&limit=${limit}&sort=salary&order=${order}&filterBy=${filterBy}&filterValue=${filterValue}`;
    console.log(url);
    try {
        let reult = await fetch(url);
        let data = await reult.json();
        displayCards(data.data);
    } catch (error) {
        console.log(error);
    }
};

////////////////////////////////////////////////////////////

window.addEventListener('load', async function () {
    if (token) {
        displayEmp();
    }
});

filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let filterBy = '';
    let filterValue = '';
    if (!department.value) {
        filterBy = 'gender';
        filterValue = gender.value;
    } else if (!gender.value) {
        filterBy = 'gender';
        filterValue = gender.value;
    } else if (department.value && gender.value) {
        alert(
            'Both Department and Gender can-not filtered togenter! Select one at a time'
        );
        filterForm.reset();
    }
    displayEmp(page.value, order.value, filterBy, filterValue);
});
