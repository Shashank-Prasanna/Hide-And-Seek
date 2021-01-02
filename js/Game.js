class Game {
	constructor() {
		player = new Player();
	}

	display() {
		if (gameState === 'Lobby') {
			form.display();
		}
		if (gameState === 'Play') {
			form.hide();
			form.greeting.hide();
			background(0);
			this.move();
			drawSprites();
		}
	}

	play() {
		this.move();

		if (playerCount === 2 && gameState === 'Lobby') {
			gameState = 'Play';
			database.ref('/').update({
				GameState: gameState,
			});
		}
	}

	getFromDatabase() {
		playerCountRef = database.ref('Players/PlayerCount');
		playerCountRef.on('value', (data) => {
			playerCount = data.val();
		});

		gameStateRef = database.ref('GameState');
		gameStateRef.on('value', (data) => {
			gameState = data.val();
		});
	}

	move() {
		player1Sprite.collide(wall1);
		player1Sprite.collide(wall2);
		player1Sprite.collide(wall3);
		player1Sprite.collide(wall4);
		player1Sprite.collide(wall5);
		player1Sprite.collide(wall6);
		player1Sprite.collide(wall7);
		player1Sprite.collide(wall8);
		player1Sprite.collide(wall9);
		player1Sprite.collide(wall10);
		player1Sprite.collide(wall11);
		player1Sprite.collide(wall12);
		player1Sprite.collide(wall13);
		player1Sprite.collide(wall14);
		player1Sprite.collide(wall15);
		player1Sprite.collide(wall16);
		player1Sprite.collide(wall17);
		player1Sprite.collide(wall18);
		player1Sprite.collide(wall19);
		player1Sprite.collide(wall20);
		player1Sprite.collide(wall21);
		player1Sprite.collide(wall22);
		player1Sprite.collide(wall23);
		player1Sprite.collide(wall24);
		player1Sprite.collide(wall25);
		player1Sprite.collide(wall26);
		player1Sprite.collide(wall27);
		player1Sprite.collide(wall28);
		player1Sprite.collide(wall29);
		player1Sprite.collide(wall30);
		player1Sprite.collide(wall31);
		player1Sprite.collide(wall32);
		player1Sprite.collide(wall33);
		player1Sprite.collide(wall34);
		player1Sprite.collide(wall35);

		player2Sprite.collide(wall1);
		player2Sprite.collide(wall2);
		player2Sprite.collide(wall3);
		player2Sprite.collide(wall4);
		player2Sprite.collide(wall5);
		player2Sprite.collide(wall6);
		player2Sprite.collide(wall7);
		player2Sprite.collide(wall8);
		player2Sprite.collide(wall9);
		player2Sprite.collide(wall10);
		player2Sprite.collide(wall11);
		player2Sprite.collide(wall12);
		player2Sprite.collide(wall13);
		player2Sprite.collide(wall14);
		player2Sprite.collide(wall15);
		player2Sprite.collide(wall16);
		player2Sprite.collide(wall17);
		player2Sprite.collide(wall18);
		player2Sprite.collide(wall19);
		player2Sprite.collide(wall20);
		player2Sprite.collide(wall21);
		player2Sprite.collide(wall22);
		player2Sprite.collide(wall23);
		player2Sprite.collide(wall24);
		player2Sprite.collide(wall25);
		player2Sprite.collide(wall26);
		player2Sprite.collide(wall27);
		player2Sprite.collide(wall28);
		player2Sprite.collide(wall29);
		player2Sprite.collide(wall30);
		player2Sprite.collide(wall31);
		player2Sprite.collide(wall32);
		player2Sprite.collide(wall33);
		player2Sprite.collide(wall34);
		player2Sprite.collide(wall35);
		if (form.player === 'Player 1') {
			if (player1Sprite.role === 'hider') {
				if (keyDown(UP_ARROW)) {
					player1Sprite.y = player1Sprite.y - 2;
				}

				if (keyDown(DOWN_ARROW)) {
					player1Sprite.y = player1Sprite.y + 2;
				}

				if (keyDown(LEFT_ARROW)) {
					player1Sprite.x = player1Sprite.x - 2;
				}

				if (keyDown(RIGHT_ARROW)) {
					player1Sprite.x = player1Sprite.x + 2;
				}
			} else if (player1Sprite.role === 'seeker') {
				if (keyDown(UP_ARROW)) {
					player1Sprite.y = player1Sprite.y - 4;
				}

				if (keyDown(DOWN_ARROW)) {
					player1Sprite.y = player1Sprite.y + 4;
				}

				if (keyDown(LEFT_ARROW)) {
					player1Sprite.x = player1Sprite.x - 4;
				}

				if (keyDown(RIGHT_ARROW)) {
					player1Sprite.x = player1Sprite.x + 4;
				}
			}
		} else {
			if (player2Sprite.role === 'hider') {
				if (keyDown(UP_ARROW)) {
					player2Sprite.y = player2Sprite.y - 2;
				}

				if (keyDown(DOWN_ARROW)) {
					player2Sprite.y = player2Sprite.y + 2;
				}

				if (keyDown(LEFT_ARROW)) {
					player2Sprite.x = player2Sprite.x - 2;
				}

				if (keyDown(RIGHT_ARROW)) {
					player2Sprite.x = player2Sprite.x + 2;
				}
			} else if (player2Sprite.role === 'seeker') {
				if (keyDown(UP_ARROW)) {
					player2Sprite.y = player2Sprite.y - 4;
				}

				if (keyDown(DOWN_ARROW)) {
					player2Sprite.y = player2Sprite.y + 4;
				}

				if (keyDown(LEFT_ARROW)) {
					player2Sprite.x = player2Sprite.x - 4;
				}

				if (keyDown(RIGHT_ARROW)) {
					player2Sprite.x = player2Sprite.x + 4;
				}
			}
		}

		player.update(player1Sprite.x, player1Sprite.y, player2Sprite.x, player2Sprite.y);
	}
}
