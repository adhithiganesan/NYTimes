// Create Date String
    let currdate = new Date();
    //console.log(currdate);

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[currdate.getDay()];
    //console.log(day);

    let date = currdate.getDate();
    //console.log(date);

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[currdate.getMonth()];

    let year = currdate.getFullYear();

    let dateString = day + ", " + month + " " + date + ", " + year;
    console.log(dateString);

    document.getElementById("date").innerHTML = dateString;
