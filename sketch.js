var playerCount = 0;
var playerCountRef;
var gameStateRef;
var gameState = 'Lobby';
var player1Sprite = {role: undefined, name: 'foo1', powerupBad: 0, powerupGood: 0, winner: undefined};
var player2Sprite = {role: undefined, name: 'foo2', powerupBad: 0, powerupGood: 0, winner: undefined};
var form, game, player;
var distance;
var p1Ref, p2ref, p1RoleRef, p2RoleRef;
var date = new Date();
var timer = {endMin: undefined, endSec: undefined, nowMin: undefined, nowSec: undefined, timeLeft: '5:00'};
const SLIMECODE = 927;
const FLASHLIGHTCODE = 427;
const SHOECODE = 827;
const LIGHTCODE = 227;
var reset_btn;

var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10;
var wall11,
	wall12,
	wall13,
	wall14,
	wall15,
	wall16,
	wall17,
	wall18,
	wall19,
	wall20,
	wall21,
	wall22,
	wall23,
	wall24,
	wall25,
	wall26,
	wall27,
	wall28,
	wall29,
	wall30,
	wall31,
	wall32,
	wall33,
	wall34,
	wall35;

var database = firebase.database();

var slimeImg, flashlightImg, shoeImg, lightbulbImg, questionImg;
var badPowerupSnd, goodPowerupSnd;
var slime, flashlight, shoe, lightbulb;
var question = [];

function preload() {
	slimeImg = loadImage('img/icons8-slime-50.png');
	flashlightImg = loadImage('img/icons8-flashlight-50.png');
	shoeImg = loadImage('img/icons8-running-shoe-50.png');
	lightbulbImg = loadImage('img/icons8-light-50.png');
	questionImg = loadImage('img/icons8-question-mark-64.png');

	badPowerupSnd = loadSound('sound/badPowerup.wav');
	goodPowerupSnd = loadSound('sound/goodPowerup.wav');
}

function setup() {
	createCanvas(1000, 970);

	player1Sprite = createSprite(20, 20, 30, 30);
	player1Sprite.shapeColor = '#FF0000';
	player2Sprite = createSprite(980, 950, 30, 30);
	player2Sprite.shapeColor = '#0000FF';

	distance = int(dist(player1Sprite.x, player1Sprite.y, player2Sprite.x, player2Sprite.y));

	wall1 = createSprite(80, 40, 30, 150);
	wall2 = createSprite(140, 40, 150, 30);
	wall3 = createSprite(80, 190, 200, 30);
	wall4 = createSprite(270, 200, 30, 150);
	wall5 = createSprite(350, 40, 150, 30);
	wall6 = createSprite(400, 245, 30, 240);
	wall7 = createSprite(200, 350, 230, 30);
	wall8 = createSprite(400, 530, 30, 150);
	wall9 = createSprite(100, 500, 30, 150);
	wall10 = createSprite(250, 500, 30, 150);
	wall11 = createSprite(200, 680, 500, 30);
	wall12 = createSprite(600, 680, 150, 30);
	wall13 = createSprite(820, 680, 150, 30);
	wall14 = createSprite(600, 680, 30, 300);
	wall15 = createSprite(400, 840, 30, 150);
	wall16 = createSprite(600, 900, 200, 30);
	wall17 = createSprite(712, 530, 30, 150);
	wall18 = createSprite(900, 1000, 30, 150);
	wall19 = createSprite(950, 800, 150, 30);
	wall20 = createSprite(750, 800, 100, 30);
	wall21 = createSprite(300, 840, 30, 150);
	wall22 = createSprite(150, 840, 150, 30);
	wall23 = createSprite(150, 990, 30, 150);
	wall24 = createSprite(740, 390, 150, 30);
	wall25 = createSprite(930, 580, 150, 30);
	wall26 = createSprite(550, 450, 100, 30);
	wall27 = createSprite(550, 270, 150, 30);
	wall28 = createSprite(790, 470, 150, 30);
	wall29 = createSprite(790, 270, 150, 30);
	wall30 = createSprite(670, 180, 150, 30);
	wall31 = createSprite(850, 80, 150, 30);
	wall32 = createSprite(500, 80, 30, 160);
	wall33 = createSprite(600, 70, 30, 70);
	wall34 = createSprite(940, 400, 30, 150);
	wall35 = createSprite(790, 270, 150, 30);
	player1Sprite.powerupBad = 0;
	player1Sprite.powerupGood = 0;
	console.log(player1Sprite.powerupBad);

	form = new Form();
	game = new Game();

	game.getFromDatabase();

	question.push(createSprite(240, 40, 20, 20));
	question.push(createSprite(900, 200, 20, 20));
	question.push(createSprite(150, 750, 20, 20));
	question.push(createSprite(950, 700, 20, 20));
	console.log(question);

	p1Ref = database.ref('Players/Player1/position');
	p1Ref.on('value', (data) => {
		player1Sprite.x = data.val().x;
		player1Sprite.y = data.val().y;
	});

	p2Ref = database.ref('Players/Player2/position');
	p2Ref.on('value', (data) => {
		player2Sprite.x = data.val().x;
		player2Sprite.y = data.val().y;
	});

	for (var i = 0; i < question.length; i++) {
		question[i].addImage(questionImg);
	}
}

function draw() {
	game.display();
	game.play();

	for (var i = 0; i < question.length; i++) {
		if (player1Sprite.isTouching(question[i]) && question[i].visible === true) {
			question[i].visible = false;
			var rand = random(0, 100);
			if (rand >= 65) {
				player1Sprite.powerupBad += 1;
				badPowerupSnd.play();
			} else {
				player1Sprite.powerupGood += 1;
				goodPowerupSnd.play();
			}

			console.log(player1Sprite.powerupBad);
			i++;
		}
	}

	for (var i = 0; i < question.length; i++) {
		if (player2Sprite.isTouching(question[i]) && question[i].visible === true) {
			question[i].visible = false;
			var rand = random(0, 100);
			if (rand >= 65) {
				player2Sprite.powerupBad += 1;
				badPowerupSnd.play();
			} else {
				player2Sprite.powerupGood += 1;
				goodPowerupSnd.play();
			}

			console.log(player2Sprite.powerupBad);
			i++;
		}
	}
}
