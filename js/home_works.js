// EMAIL BLOCK
const emailInput = document.querySelector('#gmail_input');
const emailButton = document.querySelector('#gmail_button');
const emailResult = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

emailButton.onclick = () => {
    if (regExp.test(emailInput.value)) {
        emailResult.innerHTML = 'Ok';
        emailResult.style.color = 'green';
    } else {
        emailResult.innerHTML = 'not Ok';
        emailResult.style.color = 'red';
    }
}

// MOVE BLOCK

const parent_block = document.querySelector('.parent_block');
const child_block = document.querySelector('.child_block');

let child_pos_x = 0, child_pos_y = 0;

const maxX = parent_block.clientWidth - child_block.offsetWidth;
const maxY = parent_block.clientHeight - child_block.offsetHeight;

child_block.style.left = `${child_pos_x}px`;
child_block.style.top = `${child_pos_y}px`;

let currentState = 'end';

const animate = () => {

    switch (currentState) {
        case 'end':
            if (child_pos_x < maxX) {
                child_pos_x++;
            } else {
                child_pos_x = maxX;
                currentState = 'bottom';
            }
            child_block.style.left = `${child_pos_x}px`;
            requestAnimationFrame(animate)
            break;

        case 'bottom':
            if (child_pos_y < maxY) {
                child_pos_y++;
            } else {
                child_pos_y = maxY;
                currentState = 'start';
            }
            child_block.style.top = `${child_pos_y}px`;
            requestAnimationFrame(animate)
            break;

        case 'start':
            if (child_pos_x > 0) {
                child_pos_x--;
            } else {
                child_pos_x = 0;
                currentState = 'top';
            }
            child_block.style.left = `${child_pos_x}px`;
            requestAnimationFrame(animate)
            break;

        case 'top':
            if (child_pos_y > 0) {
                child_pos_y--;
            } else {
                child_pos_y = 0;
                currentState = 'end';
            }
            child_block.style.top = `${child_pos_y}px`;
            requestAnimationFrame(animate)
            break;

        default:
            break;
    }
};

animate();


// HW 2 - Stopwatch


const time = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');


let startTime = 0;
let elapsedTime = 0;
let intervalId;
let paused = true;

const pad = (unit, targetLength = 2) => {
    const unitString = String(unit);
    return unitString.padStart(targetLength, '0');
}

const updateTime = () => {
    elapsedTime = Date.now() - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const millis = elapsedTime % 100;

    renderTime(hrs, mins, secs, millis);
}

const renderTime = (hrs, mins, secs, millis) => {
    const formattedHrs = pad(hrs);
    const formattedMins = pad(mins);
    const formattedSecs = pad(secs);
    const formattedMillis = pad(millis);

    time.textContent = `${formattedHrs}:${formattedMins}:${formattedSecs}.${formattedMillis}`;

}

startButton.addEventListener('click', (e) => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    }
})

pauseButton.addEventListener('click', (e) => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
})

resetButton.addEventListener('click', (e) => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;

    renderTime(0, 0, 0, 0);
})

renderTime(0, 0, 0, 0);



// -------- CHARACTERS ---------

const characters_list = document.querySelector('.characters-list');

const getCharacters = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `../data/characters.json`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
        const data = JSON.parse(request.response);
        createCharacters(data);
    }
}

const createCharacters = (characters) => {
    characters_list.innerHTML = '';

    characters.forEach((character) => {
        const character_card = document.createElement('div');
        character_card.classList.add('character-card');

        character_card.innerHTML = `
        <div class="character-photo">
            <img src="${character.photo}" alt="${character.name}"></img>
        </div>
        <h3>${character.name}</h3>
        <span><i>alias:</i> ${character.alias}</span>
        <span><i>gender:</i> ${character.gender}</span>
    `

        characters_list.append(character_card);
    })
}

getCharacters()

// --------- myself ---------

const getMyself = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `../data/any.json`);
    request.setRequestHeader('Content-type', 'application/json');
    request.send();

    request.onload = () => {
        const myself = JSON.parse(request.response);
        console.log(myself);
    }
}

getMyself();
