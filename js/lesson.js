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