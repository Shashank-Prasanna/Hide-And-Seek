class Player {
	constructor() {
		database.ref('Players').update({
			Player1: {
				position: {
					x: 20,
					y: 20,
				},
			},

			Player2: {
				position: {
					x: 980,
					y: 950,
				},
			},
		});
	}
	update(Player1X, Player1Y, Player2X, Player2Y) {
		if (form.player === 'Player 1') {
			database.ref('Players/Player1/position').update({
				x: Player1X,
				y: Player1Y,
			});
		} else {
			database.ref('Players/Player2/position').update({
				x: Player2X,
				y: Player2Y,
			});
		}
	}

	powerUp() {
		if (form.player === 'Player 1') {
			for (var i = 0; i < player1Sprite.powerupBad; i++) {
				if (player1Sprite.role === 'hider') {
					player1Sprite.visible = false;
				} else if (player1Sprite.role === 'seeker') {
					player1Sprite.speed = 3;
				}
			}

			for (var i = 0; i < player1Sprite.powerupGood; i++) {
				if (player1Sprite.role === 'hider') {
					player1Sprite.speed = 6;
				} else if (player1Sprite.role === 'seeker') {
					player2Sprite.visible = true;
				}
			}
		} else {
			for (var i = 0; i < player2Sprite.powerupBad; i++) {
				if (player2Sprite.role === 'hider') {
					player2Sprite.visible = false;
				} else if (player2Sprite.role === 'seeker') {
					player2Sprite.speed = 3;
				}
			}

			for (var i = 0; i < player2Sprite.powerupGood; i++) {
				if (player2Sprite.role === 'hider') {
					player2Sprite.speed = 6;
				} else if (player2Sprite.role === 'seeker') {
					player1Sprite.visible = true;
				}
			}
		}
	}

	powerUpMinus(sprite, powerUpType) {
		if (sprite === 'Player 1') {
			if (powerUpType === 'Bad') {
				player1Sprite.powerupBad--;
				if (player1Sprite.powerupBad != 0) {
					setTimeout(player.powerUpMinus, 10000, 'Player 1', 'Bad');
				}
			} else if (powerUpType === 'Good') {
				player1Sprite.powerupGood--;
				if (player1Sprite.powerupGood != 0) {
					setTimeout(player.powerUpMinus, 10000, 'Player 1', 'Good');
				}
			}
		}

		if (sprite === 'Player 2') {
			if (powerUpType === 'Bad') {
				player2Sprite.powerupBad--;
				if (player2Sprite.powerupBad != 0) {
					setTimeout(player.powerUpMinus, 10000, 'Player 2', 'Bad');
				}
			} else if (powerUpType === 'Good') {
				player2Sprite.powerupGood--;
				if (player2Sprite.powerupGood != 0) {
					setTimeout(player.powerUpMinus, 10000, 'Player 2', 'Good');
				}
			}
		}
	}
}
