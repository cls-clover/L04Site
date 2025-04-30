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

// hw part 2

const parent_block = document.querySelector('.parent_block');
const child_block = document.querySelector('.child_block');

let child_pos_x = 0;
let child_pos_y = 0;

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