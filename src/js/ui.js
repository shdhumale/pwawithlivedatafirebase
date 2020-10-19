const users = document.querySelector('.users');

document.addEventListener('DOMContentLoaded', function () {
  // nav menu to show menu.
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add user form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});


// render User data
const userAdded = (data, id) => {
  const html = `<div class="card-panel user white row" data-id="${id}">
            <img src="/img/siddhu.jpg" alt="user thumb">
            <div class="user-details">
                <div class="user-title">${data.userName}</div>
                <div class="user-address">${data.userAddress}</div>
            </div>
            <div class="user-delete">
                <i class="material-icons" data-id="${id}">delete_outline</i>
            </div>
        </div>
        
  `;
  users.innerHTML += html;

};


// remove user
const userRemoved
  = (id) => {
    const user = document.querySelector(`.user[data-id=${id}]`);
    user.remove();
  };

