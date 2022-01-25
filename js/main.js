'use strict'


var gNums;
var gCount;
var gIsGameOn;
var gSeconds;
var gMilliseconds;
var gInterval;
var gBoardLength;




function init() {
    gBoardLength = 4;
    gSeconds = 0;
    gMilliseconds = 0;
    gIsGameOn = false;
    gCount = 1;

    if (gInterval) {
        clearInterval(gInterval);
        gInterval = null;
        reset()
    }
    gNums = shuffle(createNumsArray())
    renderBoard(gNums);
}

function start() {
    pause();
    gInterval = setInterval(timer, 10);
    if (gCount === (gBoardLength ** 2)) {
        pause();
    }
}

function createNumsArray() {
    var nums = [];

    for (var i = 0; i < (gBoardLength ** 2); i++) {
        nums.push(i + 1);
    }
    return nums;
}


function shuffle(nums) {
    var randIdx, keep, i;
    for (i = nums.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, nums.length);

        keep = nums[i];
        nums[i] = nums[randIdx];
        nums[randIdx] = keep;
    }
    return nums;
}


function renderBoard(nums) {
    var strHtml = '';
    for (var i = 0; i < gBoardLength; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < gBoardLength; j++) {
            strHtml += `<td onclick="cellClicked(this)">${nums.pop()}</td>`;
        }
        strHtml += `</tr>`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}


function cellClicked(clickedNum) {
    var num = parseInt(clickedNum.innerText);

    if (num === 1) {
        gInterval = setInterval(timer, 10);
    }

    if (num === gCount) {
        clickedNum.classList.add('clicked');
        gCount++
    }


    gIsGameOn = true;
    if (num === (gBoardLength ** 2) && clickedNum.classList.contains('clicked')) {
        clearInterval(gInterval);
    }
}


function clickBtn(btn) {
    if (btn.classList.contains('easy')) {
        gCount = 1;
        reset();
        clearInterval(gInterval);
        gBoardLength = 4;
        gNums = shuffle(createNumsArray());
        renderBoard(gNums);
    } else if (btn.classList.contains('hard')) {
        gCount = 1;
        reset();
        clearInterval(gInterval);
        gBoardLength = 5;
        gNums = shuffle(createNumsArray());
        renderBoard(gNums);
    } else {
        gCount = 1;
        reset();
        clearInterval(gInterval);
        gBoardLength = 6;
        gNums = shuffle(createNumsArray());
        renderBoard(gNums);
    }
}


function pause() {
    clearInterval(gInterval);
}

function reset() {
    gSeconds = 0;
    gMilliseconds = 0;
    document.getElementById('second').innerText = '00';
    document.getElementById('millisecond').innerText = '000';
}


function timer() {
    if ((gMilliseconds += 10) === 1000) {
        gMilliseconds = 0;
        gSeconds++;
    }
    document.getElementById('second').innerText = returnData(gSeconds);
    document.getElementById('millisecond').innerText = returnData(gMilliseconds);
}


function returnData(input) {
    return input > 10 ? input : `0${input}`
}





function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}