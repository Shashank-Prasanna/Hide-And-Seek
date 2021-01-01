var playerCount = 0,
	playerCountRef;
var gameStateRef;
var gameState = 'Lobby';
var player1Sprite = {role: undefined, name: 'foo1'};
var player2Sprite = {role: undefined, name: 'foo2'};
var form, game, player;

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

function setup() {
	createCanvas(1000, 1000);

	player1Sprite = createSprite(20, 20, 30, 30);
	player1Sprite.shapeColor = '#FF0000';
	player2Sprite = createSprite(980, 980, 30, 30);
	player2Sprite.shapeColor = '#0000FF';

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

	if (random(0, 100) >= 50) {
		player1Sprite.role = 'hider';
		player2Sprite.role = 'seeker';
	} else {
		player1Sprite.role = 'seeker';
		player2Sprite.role = 'hider';
	}

	form = new Form();
	game = new Game();

	game.getFromDatabase();

	database.ref('/').update({
		GameState: 'Lobby',
		Players: {
			Player1: {
				name: 'Foo1',
				position: {
					x: 20,
					y: 20,
				},
			},

			Player2: {
				name: 'foo2',
				position: {
					x: 980,
					y: 980,
				},
			},
			PlayerCount: 0,
		},
	});
}

function draw() {
	game.display();
	game.play();
}
