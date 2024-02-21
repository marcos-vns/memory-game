const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', handleGame);
const buttons = document.querySelectorAll('.btn');

const points = document.querySelector('.points');
const record = document.querySelector('.record');

const message = document.querySelector('.message');
message.style.display = 'none';

let ind = 0;

let sequence = [];
let attempt = [];

function handleGame(evt){
    if(evt){
        if(Number(points.innerHTML) > Number(record.innerHTML)){
            record.innerHTML = points.innerHTML;;
        }
        points.innerHTML = "0";
        sequence = [];
    }

    startBtn.style.visibility = 'hidden';
    message.style.display = 'none';

    addSequence();
    playSequence();
}

function addSequence(){
    let nextElement = Math.floor(Math.random() * 4);
    sequence.push(nextElement);
}

function playSequence(){
    let i=0;

    for(const b of buttons){
        b.removeEventListener('click', guessSequence);
    }

    const interval = setInterval(() => {
        const currentIndex = sequence[i];
        const currentButton = buttons[currentIndex];

        currentButton.style.border = '4px solid #000';
        i++;
        setTimeout(() => {
            currentButton.style.border = '';
        }, 700);

        if(i>=sequence.length){
            clearInterval(interval);
            waitInput();
        }
    }, 1000);
}

function waitInput(){
    for(const b of buttons){
        b.addEventListener('click', guessSequence);
    }
}

function guessSequence(evt){
    let elementAttempt = Number(evt.target.id);
    
    if(elementAttempt === sequence[ind]){
        ind++;
    }
    else{
        message.style.display = 'block';
        startBtn.innerHTML = "Jogar novamente";
        startBtn.style.visibility = 'visible';
        ind = 0;
    }

    if(ind == sequence.length){
        points.innerHTML = Number(points.innerHTML) + 1;
        ind = 0;
        handleGame();
    }
}