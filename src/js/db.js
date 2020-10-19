// enable offline data
db.enablePersistence()
    .catch(function (err) {
        if (err.code == 'failed-precondition') {
            // probably multible tabs open at once
            console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
            // lack of browser support for the feature
            console.log('persistance not available');
        }
    });

// real-time listener
db.collection('users').onSnapshot(snapshot => {
    console.log("-----------------------", snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        console.log(change);
        console.log(change, change.doc.data(), change.doc.id);
        if (change.type === 'added') {
            userAdded(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // remove the document data from the web page
            userRemoved(change.doc.id);
        }
    });
});

// add new user
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const user = {
        userName: form.title.value,
        userAddress: form.address.value
    };

    db.collection('users').add(user)
        .catch(err => console.log(err));

    form.title.value = '';
    form.address.value = '';
});


// remove a user
const recipeContainer = document.querySelector('.users');
recipeContainer.addEventListener('click', evt => {
    if (evt.target.tagName === 'I' && evt.target.textContent === 'delete_outline') {
        const id = evt.target.getAttribute('data-id');
        //console.log(id);
        db.collection('users').doc(id).delete();
    }
})

