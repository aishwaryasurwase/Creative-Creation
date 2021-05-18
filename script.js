var noOfCreative;
var formColorSelected;

window.onload = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(xhttp.responseText);
            let colors = response.colors;

            let mainColor = document.getElementById('displayColors');
            let mainColor1 = document.getElementById('displayColors1');

            for (let i = 0; i < colors.length; i++) {
                let color = document.createElement('button');
                let color1 = document.createElement('button');
                color.id = colors[i];
                color1.id = colors[i];
                color.className = 'eachColor';
                color1.className = 'eachColor';
                color.style.backgroundColor = colors[i];
                color1.style.backgroundColor = colors[i];
                mainColor.appendChild(color);
                mainColor1.appendChild(color1);
            }
        }
    };
    xhttp.open("GET", "https://random-flat-colors.vercel.app/api/random?count=5", true);
    xhttp.send();

    noOfCreative = localStorage.getItem('count');
    let setProgress = document.getElementById('creativesProgress');
    setProgress.value = noOfCreative

    if (noOfCreative == null) {
        countCreative.innerText = 0;
    } else {
        let countCreative = document.getElementById('countCreative');
        countCreative.innerText = noOfCreative;
    }
    let data = JSON.parse(localStorage.getItem('creativeData'));
    displayCards(data);
}

function displayCards(filterData) {

    let showCreatives = document.getElementById('showCreatives');
    showCreatives.innerHTML = '';

    if (filterData) {
        for (let i = 0; i < filterData.length; i++) {
            let displayCreative = document.createElement('div');
            displayCreative.innerHTML = `<h1>${filterData[i].title}</h1> 
            <p>${filterData[i].subtitle}</p>`
            displayCreative.className = 'showCreative';
            displayCreative.style.backgroundColor = filterData[i].color;
            showCreatives.appendChild(displayCreative);
        }
    }
}

function addCreative() {
    let addCreativesbtn = document.getElementById('addCreatives');
    addCreativesbtn.disabled = true;

    let creativeCreation = document.getElementById('creativeCreation');
    creativeCreation.style.display = 'block';
}

function submitCreative() {

    if (noOfCreative < 5) {
        let creativeForm = document.getElementById('creativeForm').elements;
        let title = creativeForm[0].value;
        let subtitle = creativeForm[1].value;

        let data = localStorage.getItem('creativeData');
        let storeData = [];

        let obj = {
            title: title,
            subtitle: subtitle,
            color: formColorSelected
        }

        if (data) {
            let previousData = JSON.parse(data);
            previousData.push(obj);
            let previousCount = JSON.parse(localStorage.getItem('count'));
            previousCount += 1;
            localStorage.setItem('count', JSON.stringify(previousCount));
            localStorage.setItem('creativeData', JSON.stringify(previousData))
        } else {
            storeData.push(obj);
            localStorage.setItem('creativeData', JSON.stringify(storeData))
            localStorage.setItem('count', JSON.stringify(1));
        }
        let addCreativesbtn = document.getElementById('addCreatives');
        addCreativesbtn.disabled = false;

        let noOfCreative = localStorage.getItem('count');

        let setProgress = document.getElementById('creativesProgress');
        setProgress.value = noOfCreative;

        let countCreative = document.getElementById('countCreative');
        countCreative.innerText = noOfCreative;

        let showCreatives = document.getElementById('showCreatives');
        let displayCreative = document.createElement('div');
        displayCreative.innerHTML = `<h1>${title}</h1> <p>${subtitle}</p>`
        displayCreative.className = 'showCreative';
        displayCreative.style.backgroundColor = formColorSelected;
        showCreatives.appendChild(displayCreative);

        let creativeCreation = document.getElementById('creativeCreation');
        creativeCreation.style.display = 'none';

    } else {
        alert("Creative is above limit");
    }
    document.getElementById("creativeForm").reset();
}


function closeForm() {
    let creativeCreation = document.getElementById('creativeCreation');
    creativeCreation.style.display = 'none';

    let addCreativesbtn = document.getElementById('addCreatives');
    addCreativesbtn.disabled = false;
}


function colorSelected(event) {
    formColorSelected = event.target.id;
    event.preventDefault();
}

function colorSelectedForSearch(event) {
    console.log("Color selected for search", event.target.id);
    let data = localStorage.getItem('creativeData');

    if (data) {
        console.log("DATA ", JSON.parse(data));
        let localStorageResponse = JSON.parse(data);
        console.log(localStorageResponse.filter((item) => item.color === event.target.id))
        let filterData = localStorageResponse.filter((item) => item.color === event.target.id);
        displayCards(filterData);
    }
}

function selectCard(event) {
    console.log("title and subtitle Event ", event.target.value);
    let data = localStorage.getItem('creativeData');

    if (data) {
        console.log("DATA ", JSON.parse(data));
        let localStorageResponse = JSON.parse(data);
        console.log(localStorageResponse.filter((item) => item.title.startsWith(event.target.value)))
        let filterData = localStorageResponse.filter((item) => item.title.startsWith(event.target.value));
        displayCards(filterData);
    }
}