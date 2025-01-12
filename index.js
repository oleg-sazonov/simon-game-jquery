'use strict';

let colors = ['green', 'red', 'yellow', 'blue'];
let gameChain = [];
let playerChain = [];
let index = 0;
let keyPressed;

const clickHandler = (btnSelector) => {
	let audioFile = getSoundPath(btnSelector);
	let audio = new Audio(audioFile);

	$(`#${btnSelector}`).addClass('pressed');
	audio.play();
	setTimeout(() => $(`#${btnSelector}`).removeClass('pressed'), 100);
}

const startGame = () => {
	index = 0;
	playerChain = [];
	keyPressed = true;

	let i = Math.floor(Math.random() * 4);
	let level = gameChain.length + 1;

	$('#level-title').text(`Level ${level}`);

	clickHandler(colors[i]);
	gameChain.push(colors[i]);

	// console.log(`gameChain: ${gameChain}`);
}

const gameOver = () => {
	let audio = new Audio('./sounds/wrong.mp3');
	audio.play();
	$('#level-title').text(`Game Over, Press Any Key to Restart`);
	$('body').addClass('game-over');
	setTimeout(() => $('body').removeClass('game-over'), 100);
	gameChain = [];
	playerChain = [];
	index = 0;
	keyPressed = false;
}

const getSoundPath = (color) => {
	return `./sounds/${color}.mp3`;
  }

$(window).keypress(() => { 
	if (!keyPressed && playerChain.length == 0 && gameChain.length == 0) {
		keyPressed = true;
		setTimeout(() => {
			startGame();
		}, 100);
	}
});

$('.btn').click((e) => {
	if (!keyPressed || playerChain.length > gameChain.length) {
		gameOver();
		return;
	}

	let btnSelector = e.target.id;

	clickHandler(btnSelector);
	playerChain.push(btnSelector);

	// console.log(`playerChain: ${playerChain}`);
	// console.log(`gameChain: ${gameChain}`);

	if (playerChain[index] !== gameChain[index]) {
		gameOver();
	}
	index++;

	if (playerChain.length === gameChain.length && keyPressed) { 
		setTimeout(() => startGame(), 1000);
	}
});