const GAME_LEVELS = {
	0: "Easy",
	1: "Average",
	2: "Ambitious"
};

const DISKS_NUM_BY_LEVEL = {
    0: 3,
    1: 5,
    2: 7
}

const GAME_ACTIONS = {
	"wait": "wait",
	"match": "match",
	"retry": "retry"
};

const MAX_STARS = 5;

const GAME_SOUNDS = {
	"gameTheme": new Audio("audio/puzzleGame.mp3"),
	"move": new Audio("audio/woodKnock.wav"),
	"drop": new Audio("audio/drop.wav"),
	"levelComplete": new Audio("audio/levelComplete.mp3"),
};

GAME_SOUNDS.gameTheme.loop = true;
