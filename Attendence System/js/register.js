document.getElementsByTagName('form')[0].addEventListener('submit', store);

function store(e) {
    e.preventDefault();

    //Start of load
    //const form = document.getElementById('register-form');
    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let age = document.getElementById('age').value;
    let randomusername = "Emp_" + firstName.length + firstName.charAt(2) + geneerateRondomUsername(1, 9999) + firstName.charAt(1) + lastName.charAt(1);
    let randompassword = email.charAt(1) + "@" + geneerateRondomPassword(9999, 99999999999999) + address.charAt(2) + "_" + lastName.length;

    let flpattern = /^[a-zA-Z]{3,30}$/;
    let adpattern = /^[a-zA-Z0-9]{5,50}$/;
    let empattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    const fnameSpan = document.getElementById('fnameSpan');
    const lnameSpan = document.getElementById('lnameSpan');
    const emailSpan = document.getElementById('emailSpan');
    const addressSpan = document.getElementById('addressSpan');
    const ageSpan = document.getElementById('ageSpan');

    // validate firstname

    if (firstName.match(flpattern)) {
        fnameSpan.style.display = 'none';
        firstName.className = 'succes';
    } else {
        e.preventDefault();
        fnameSpan.style.display = 'block';
        firstName.className = 'error'
        //firstName.focus();
        firstName.select();
        return;
    }

    // validate lastname
    if (lastName.match(flpattern)) {
        lnameSpan.style.display = 'none';
        lastName.className = 'succes';
    } else {
        e.preventDefault();
        lnameSpan.style.display = 'block';
        lastName.className = 'error'
        // lastName.focus();
        lastName.select();
    }

    // validate address
    if (address.match(adpattern)) {
        address.className = 'succes';
        addressSpan.style.display = 'none';
    } else {
        e.preventDefault();
        address.className = 'error';
        addressSpan.style.display = 'block';
        //  address.focus();
        address.select();
        return;
    }

    // validate email
    if (email.match(empattern)) {
        email.className = 'succes';
        emailSpan.style.display = 'none';
    } else {
        e.preventDefault();
        email.className = 'error';
        emailSpan.style.display = 'block';
        //  email.focus();
        email.select();
        return;
    }

    // object hold employee information
    let data = {
        "id": randomusername,
        "flag": 0,
        "today_date": "",
        "attendace_state": "",
        "attendace_time": 0,
        "absence_times": 0,
        "attendace_times": 0,
        "excuse_times": 0,
        "late_times": 0,
        "firstname": firstName,
        "lastname": lastName,
        "address": address,
        "email": email,
        "age": age,
        "username": randomusername,
        "password": randompassword
    };
    
    localStorage.setItem('employeedata', JSON.stringify(data));

    
    //Send MAil
    sendMail(firstName, lastName, address, email, age, randomusername, randompassword);
    document.forms[0].reset();
}


function geneerateRondomUsername(min, max) {
    return Math.floor(Math.random() * (max - min + 3)) + min;
}

// Generate Rondom Password
function geneerateRondomPassword(min, max) {
    return Math.floor(Math.random() * (max - min + 5)) + min;
}

//Send MAil
function sendMail(fname, lname, add, em, ag, randomusername, randompassword) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "test0123app@gmail.com",
        Password: "cmfnukepwnvzjqgl",
        To: `${em}`,
        From: `${em}`,
        Subject: `${fname} ${lname} want to autherize to the system`,
        Body: `First Name : ${fname} <br/> Last Name : ${lname} <br/> Address : ${add} <br/> Email : ${em} <br/> Age : ${ag}<br/> Random Username : ${randomusername} <br/> Random Password : ${randompassword} <br/>`
    }).then(alert("Message Send"));
}


$(function () {

    const firstName = document.getElementById('fname');
    const lastName = document.getElementById('lname');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const age = document.getElementById('age');
    const fnameSpan = document.getElementById('fnameSpan');
    const lnameSpan = document.getElementById('lnameSpan');
    const emailSpan = document.getElementById('emailSpan');
    const addressSpan = document.getElementById('addressSpan');
    const ageSpan = document.getElementById('ageSpan');

    firstName.addEventListener('blur', function () {
        if (!isfnamevalid()) {
            fnameSpan.style.display = 'block';
            firstName.className = 'error'
            //firstName.focus();
            firstName.select();
        } else {
            fnameSpan.style.display = 'none';
            firstName.className = 'succes';
        }
    });

    lastName.addEventListener('blur', function () {
        if (!islnamevalid()) {
            lnameSpan.style.display = 'block';
            lastName.className = 'error'
            // lastName.focus();
            lastName.select();
        } else {
            lnameSpan.style.display = 'none';
            lastName.className = 'succes';
        }
    });

    email.addEventListener('blur', function () {
        if (!isuseremailvalid()) {
            email.className = 'error';
            emailSpan.style.display = 'block';
            //  email.focus();
            email.select();
        } else {
            email.className = 'succes';
            emailSpan.style.display = 'none';
        }
    });


    address.addEventListener('blur', function () {
        if (!isaddresslvalid()) {
            address.className = 'error';
            addressSpan.style.display = 'block';
            //  address.focus();
            address.select();
        } else {
            address.className = 'succes';
            addressSpan.style.display = 'none';
        }
    });

    age.addEventListener('blur', function () {
        if (!isagelvalid()) {
            age.className = 'error';
            ageSpan.style.display = 'block';
            //   age.focus();
            age.select();
        } else {
            age.className = 'succes';
            ageSpan.style.display = 'none';
        }
    });


    // Submit 

    document.forms[0].addEventListener('submit', function (data) {
        /*
         if (!(isfnamevalid() && islnamevalid() && isuseremailvalid() && isaddresslvalid() && isagelvalid())) {
             //prevnet default
             data.preventDefault();
         }
         if (!isfnamevalid()) {
             fnameSpan.style.display = 'block';
             firstName.className = 'error'
             firstName.focus();
             firstName.select();
         }
         if (!islnamevalid()) {
             lnameSpan.style.display = 'block';
             lastName.className = 'error'
             lastName.focus();
             lastName.select();
         }
         if (!isuseremailvalid()) {
             email.className = 'error';
             emailSpan.style.display = 'block';
             email.focus();
             email.select();
         }
         if (!isaddresslvalid()) {
             address.className = 'error';
             addressSpan.style.display = 'block';
             address.focus();
             address.select();
         }
         if (!isagelvalid()) {
             age.className = 'error';
             ageSpan.style.display = 'block';
             age.focus();
             age.select();
         }
         */
        // Send Email to admin with employee data
        //sendMail(firstName, lastName, address, email, age, randomusername, randompassword);
        //document.forms[0].reset();
    }); //end of submit event

}); //End of load




function isfnamevalid() {
    var usernamepattern = /^[A-Za-z]{4,18}$/;
    return fname.value.match(usernamepattern);
}

function islnamevalid() {
    var usernamepattern = /^[A-Za-z]{4,18}$/;
    return lname.value.match(usernamepattern);
}

function isuseremailvalid() {
    var emailExpr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email.value.match(emailExpr);
}

function isaddresslvalid() {
    var usernamepattern = /^[#.0-9a-zA-Z\s,-]+$/;
    return address.value.match(usernamepattern);
}

function isagelvalid() {
    if (age.value >= 18 && age.value <= 60) {
        return true;
    } else {
        return false;
    }
}