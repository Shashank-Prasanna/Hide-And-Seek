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
