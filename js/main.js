'use strict'

var gCurrQuestIdx = 0;

var gQuests = [
    {
        id: 1, opts: [
            'it is a deer',
            'it is a horse'
        ], correctOptIndex: 0
    },
    {
        id: 2, opts: [
            'it is a bear',
            'it is a dog'
        ], correctOptIndex: 0
    },
    {
        id: 3, opts: [
            'it is a cat',
            'it is a fox'
        ], correctOptIndex: 1
    }
];



function init() {
    renderQuest();
    document.querySelector('.modal').style.display = 'none';
}


function renderQuest() {
    var strHTML = '';
    strHTML = `<img src="assets/img/${gCurrQuestIdx + 1}.jpg"/>`;
    for (var i = 0; i < gQuests.length - 1; i++) {
        strHTML += `<button onclick="checkAnswer(${i})" class="btn-answer">${gQuests[gCurrQuestIdx].opts[i]}</button>`;
    }

    var elQuest = document.querySelector('.quest-pic')
    elQuest.innerHTML = strHTML;
}



function checkAnswer(optIdx) {
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        if (gCurrQuestIdx === gQuests.length - 1) {
            reset()
        } else {
            gCurrQuestIdx++;
            renderQuest();
        }
    }
}


function reset() {
    gCurrQuestIdx = 0;
    var elModal = document.querySelector('.modal');
    elModal.innerText = 'Victory!';
    elModal.style.display = 'block';
    elModal.innerHTML = `<button class="reset" onclick="init(this)"/>New Game?</button>`;
    var elQuest = document.querySelector('.quest-pic')

}
