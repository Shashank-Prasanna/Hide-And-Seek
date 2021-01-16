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
					player1Sprite.speed = 4;
				}
			}

			for (var i = 0; i < player1Sprite.powerupGood; i++) {
				if (player1Sprite.role === 'hider') {
					player1Sprite.speed = 6;
				} else if (player1Sprite.role === 'seeker') {
					player2Sprite.visible = true;
				}
			}
		}
	}
}
