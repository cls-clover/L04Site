// PHONE BLOCK
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'Ok';
        phoneResult.style.color = 'green';
    } else {
        phoneResult.innerHTML = 'not Ok';
        phoneResult.style.color = 'red';
    }
}


// TAB SLIDER

const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParent = document.querySelector('.tab_content_items');
let intervalId;
let currentIndex = 0;

const hideTabsContentCards = () => {
    tabsContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    });
    tabsItems.forEach((tabItem) => {
        tabItem.classList.remove('tab_content_item_active');
    });
};

const showTabsContentCards = (indexElement) => {
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active');
    currentIndex = indexElement;
};

const nextTab = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= tabsItems.length) {
        nextIndex = 0;
    }
    hideTabsContentCards();
    showTabsContentCards(nextIndex);
};

const startInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextTab, 3000);
};

hideTabsContentCards();
showTabsContentCards(currentIndex);

startInterval();

tabsItemsParent.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        const clickedIndex = Array.from(tabsItems).indexOf(event.target);

        if (clickedIndex !== currentIndex) {
            clearInterval(intervalId);

            hideTabsContentCards();
            showTabsContentCards(clickedIndex);
            startInterval();
        }
    }
});




// card_switcher

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let cardId = 1


const fetchTodo = (cardId) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(res => res.json())
        .then(data => {
            const {id, title} = data

            cardBlock.innerHTML = `
            <p>${title}</p>
            <p>${id}</p>
        `
        })
}


const updateIdForTodo = (btnType) => {
    if (btnType === 'next') {
        cardId = cardId === 200 ? 1 : cardId + 1;
    } else if (btnType === 'prev') {
        cardId = cardId === 1 ? 200 : cardId - 1;
    }
    fetchTodo(cardId)
}

btnNext.onclick = () => updateIdForTodo('next')
btnPrev.onclick = () => updateIdForTodo('prev')

fetchTodo(cardId)


// https://jsonplaceholder.typicode.com/posts

const fetchPosts = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => res.json())
        .then(data => console.log(data))
}

fetchPosts()


// Converter

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const cnyInput = document.querySelector('#cny')

const converter = (element, targetElements) => {
    element.oninput = async () => {
        const response = await fetch("../data/converter.json")
        const data = await response.json()

        for (const targetElement of targetElements) {
            if (element.id === "som") {
                if (targetElement.id === "usd") {
                    targetElement.value = (element.value / data.usd).toFixed(2)
                } else if (targetElement.id === "cny") {
                    targetElement.value = (element.value / data.cny).toFixed(2)
                }
            }

            if (element.id === "usd") {
                if (targetElement.id === "som") {
                    targetElement.value = (element.value * data.usd).toFixed(2)
                } else if (targetElement.id === "cny") {
                    targetElement.value = ((element.value * data.usd) / data.cny).toFixed(2)
                }
            }

            if (element.id === "cny") {
                if (targetElement.id === "som") {
                    targetElement.value = (element.value * data.cny).toFixed(2)
                } else if (targetElement.id === "usd") {
                    targetElement.value = ((element.value * data.cny) / data.usd).toFixed(2)
                }
            }


            if (element.value === '') targetElement.value = ''
        }
    }

}

converter(somInput, [usdInput, cnyInput]);
converter(usdInput, [somInput, cnyInput]);
converter(cnyInput, [somInput, usdInput]);


//WEATHER

const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector('#search')
const cityName = document.querySelector('.city')
const cityTemp = document.querySelector('.temp')

const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

searchButton.onclick = async () => {
    try {
        if (searchInput.value !== ''){
            const response = await fetch(`${BASE_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric&lang=ru`)
            const data = await response.json()
            if (data.cod === '404'){
                cityName.innerHTML = 'Город не найден'
            }else {
                cityName.innerHTML = data.name
                cityTemp.innerHTML = Math.round(data.main.temp) + '°C'
            }
            searchInput.value = ''

        }else {
            cityName.innerHTML = 'Введите название города'
            cityTemp.innerHTML = ''
        }
    } catch (e){
        console.error('Weather Error')
    }

}