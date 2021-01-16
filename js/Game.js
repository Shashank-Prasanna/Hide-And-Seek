class Game {
	constructor() {
		player = new Player();

		this.timerText = createElement('h2', '5:00');
		this.timerText.position(1500, 15);

		this.roleText = createElement('h2', 'Role');
		this.roleText.position(350, 15);
	}

	display() {
		if (gameState === 'Lobby') {
			form.display();
			timer.timeLeftMin = 5;
			timer.timeLeftSec = 0;
			console.log(timer.timeLeftMin + ':' + timer.timeLeftSec);
			this.play();
		}
		if (gameState === 'Play') {
			this.timer();
			form.hide();
			form.greeting.hide();
			if (form.player === 'Player 1') {
				this.roleText.html(player1Sprite.role);
			} else {
				this.roleText.html(player2Sprite.role);
			}
			background(0);
			goodPowerupCanvas.background('white');
			badPowerupCanvas.background('white');
			drawSprites();
			if (form.player === 'Player 1') {
				database.ref('Players/Player1').update({
					role: player1Sprite.role,
				});

				database.ref('Players/Player2').update({
					role: player2Sprite.role,
				});
			}
			this.play();
		}

		if (gameState === 'End') {
			if (timer.timeLeftMin + timer.timeLeftSec === 0) {
				this.timer();
			} else {
				winnerRef.once('value', (data) => {
					this.winnerFind(data);
				});
			}
		}
	}

	play() {
		this.move();

		if (!(player2Sprite.speed > 1)) {
			if (player2Sprite.role === 'hider') {
				player1Sprite.speed = 4;
				player2Sprite.speed = 2;
			} else {
				player1Sprite.speed = 2;
				player2Sprite.speed = 4;
			}
		}

		if (form.player === 'Player 1') {
			if (player1Sprite.role === 'hider') {
				for (var i = 0; i <= player1Sprite.powerupBad; i++) {
					badPowerupCanvas.image(moonImg, 0, 180 - i * 50);
				}

				for (var i = 0; i <= player1Sprite.powerupGood; i++) {
					goodPowerupCanvas.image(shoeImg, 0, 180 - i * 50);
				}
			} else {
				for (var i = 0; i <= player1Sprite.powerupBad; i++) {
					badPowerupCanvas.image(slimeImg, 0, 180 - i * 50);
				}

				for (var i = 0; i <= player1Sprite.powerupGood; i++) {
					goodPowerupCanvas.image(flashlightImg, 0, 180 - i * 50);
				}
			}
		}

		if (form.player === 'Player 2') {
			if (player2Sprite.role === 'hider') {
				for (var i = 0; i <= player2Sprite.powerupBad; i++) {
					badPowerupCanvas.image(moonImg, 0, 180 - i * 50);
				}

				for (var i = 0; i <= player2Sprite.powerupGood; i++) {
					goodPowerupCanvas.image(shoeImg, 0, 180 - i * 50);
				}
			} else {
				for (var i = 0; i <= player2Sprite.powerupBad; i++) {
					badPowerupCanvas.image(slimeImg, 0, 180 - i * 50);
				}

				for (var i = 0; i <= player2Sprite.powerupGood; i++) {
					goodPowerupCanvas.image(flashlightImg, 0, 180 - i * 50);
				}
			}
		}

		if (playerCount === 2 && gameState === 'Lobby') {
			gameState = 'Play';
			database.ref('/').update({
				GameState: gameState,
			});
		}
		distance = int(dist(player1Sprite.x, player1Sprite.y, player2Sprite.x, player2Sprite.y));
		database.ref('Players').update({
			distance: distance,
		});

		if (distance <= 200) {
			if (form.player === 'Player 1') {
				player2Sprite.visible = true;
				player1Sprite.visible = true;
			} else {
				player1Sprite.visible = true;
				player2Sprite.visible = true;
			}
		} else {
			if (form.player === 'Player 1') {
				player2Sprite.visible = false;
				player1Sprite.visible = true;
			} else {
				player1Sprite.visible = false;
				player2Sprite.visible = true;
			}
		}

		if (player1Sprite.isTouching(player2Sprite)) {
			if (player1Sprite.role === 'hider') {
				player2Sprite.winner = true;
				player1Sprite.winner = false;
			} else {
				player2Sprite.winner = false;
				player1Sprite.winner = true;
			}
			database.ref('Players/Player1').update({
				winner: player1Sprite.winner,
			});

			database.ref('Players/Player2').update({
				winner: player2Sprite.winner,
			});
		}

		if (form.player === 'Player 1') {
			if (player1Sprite.role === 'hider') {
				player1Sprite.speed = 4;
			} else {
				player1Sprite.speed = 6;
			}
		} else if (form.player === 'Player 2') {
			if (player2Sprite.role === 'hider') {
				player2Sprite.speed = 4;
			} else {
				player2Sprite.speed = 6;
			}
		}
		player.powerUp();
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

	timer() {
		if (keyDown(75)) {
			timer.timeLeftMin = 0;
			timer.timeLeftSec = 5;
		}
		if (form.player === 'Player 1') {
			if (timer.timeLeftMin + timer.timeLeftSec != 0)
				if (frameCount % 30 === 0) {
					timer.timeLeftSec--;
				}
			if (timer.timeLeftSec === -1) {
				timer.timeLeftMin -= 1;
				timer.timeLeftSec = 59;
			}
			console.log(timer.timeLeftMin + ':' + timer.timeLeftSec);
			database.ref('timerVal').update({
				mins: timer.timeLeftMin,
				secs: timer.timeLeftSec,
			});

			if (timer.timeLeftSec <= 9) {
				this.timerText.html(timer.timeLeftMin + ':' + '0' + timer.timeLeftSec);
			} else {
				this.timerText.html(timer.timeLeftMin + ':' + timer.timeLeftSec);
			}
		}

		if (form.player === 'Player 2') {
			if (timer.timeLeftSec <= 9) {
				this.timerText.html(timer.timeLeftMin + ':' + '0' + timer.timeLeftSec);
			} else {
				this.timerText.html(timer.timeLeftMin + ':' + timer.timeLeftSec);
			}
		}

		if (timer.timeLeftMin + timer.timeLeftSec === 0) {
			textSize(40);
			let p1Role, p2Role;
			var winnerName;
			var timerRoleRef = database.ref('Players');
			timerRoleRef.once('value', (data) => {
				p1Role = data.val().Player1.role;
				p2Role = data.val().Player2.role;
			});
			if (p1Role === 'hider') {
				var winnerNameRef = database.ref('Players/Player1/name');
				gameState = 'End';
				background('#FFFFFF');
				winnerNameRef.once('value', (data) => {
					winnerName = data.val();
				});
				text('Winner: ' + winnerName, 400, 200);
			} else if (p2Role === 'hider') {
				var winnerNameRef = database.ref('Players/Player2/name');
				gameState = 'End';
				background('#FFFFFF');
				winnerNameRef.once('value', (data) => {
					winnerName = data.val();
				});
				text('Winner: ' + winnerName, 400, 200);
			}
		}
	}

	winnerFind(data) {
		var p1winner = data.val().Player1.winner;
		var p2winner = data.val().Player2.winner;
		var winnerName;
		textSize(40);
		if (p1winner === true) {
			var winnerNameRef = database.ref('Players/Player1/name');
			gameState = 'End';
			background('#FFFFFF');
			winnerNameRef.once('value', (data) => {
				winnerName = data.val();
			});
			text('Winner: ' + winnerName, 400, 200);
		} else if (p2winner === true) {
			var winnerNameRef = database.ref('Players/Player2/name');
			gameState = 'End';
			background('#FFFFFF');
			winnerNameRef.once('value', (data) => {
				winnerName = data.val();
			});
			text('Winner: ' + winnerName, 400, 200);
		}
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
					player1Sprite.y = player1Sprite.y - player1Sprite.speed;
				}

				if (keyDown(DOWN_ARROW)) {
					player1Sprite.y = player1Sprite.y + player1Sprite.speed;
				}

				if (keyDown(LEFT_ARROW)) {
					player1Sprite.x = player1Sprite.x - player1Sprite.speed;
				}

				if (keyDown(RIGHT_ARROW)) {
					player1Sprite.x = player1Sprite.x + player1Sprite.speed;
				}
			} else if (player1Sprite.role === 'seeker') {
				if (keyDown(UP_ARROW)) {
					player1Sprite.y = player1Sprite.y - player1Sprite.speed;
				}

				if (keyDown(DOWN_ARROW)) {
					player1Sprite.y = player1Sprite.y + player1Sprite.speed;
				}

				if (keyDown(LEFT_ARROW)) {
					player1Sprite.x = player1Sprite.x - player1Sprite.speed;
				}

				if (keyDown(RIGHT_ARROW)) {
					player1Sprite.x = player1Sprite.x + player1Sprite.speed;
				}
			}
		} else {
			console.log('else');
			if (player2Sprite.role === 'hider') {
				console.log('hider');
				if (keyDown(UP_ARROW)) {
					player2Sprite.y = player2Sprite.y - player2Sprite.speed;
				}

				if (keyDown(DOWN_ARROW)) {
					player2Sprite.y = player2Sprite.y + player2Sprite.speed;
				}

				if (keyDown(LEFT_ARROW)) {
					player2Sprite.x = player2Sprite.x - player2Sprite.speed;
				}

				if (keyDown(RIGHT_ARROW)) {
					player2Sprite.x = player2Sprite.x + player2Sprite.speed;
				}
			} else if (player2Sprite.role === 'seeker') {
				console.log('seeker');
				if (keyDown(UP_ARROW)) {
					player2Sprite.y = player2Sprite.y - player2Sprite.speed;
				}

				if (keyDown(DOWN_ARROW)) {
					player2Sprite.y = player2Sprite.y + player2Sprite.speed;
				}

				if (keyDown(LEFT_ARROW)) {
					player2Sprite.x = player2Sprite.x - player2Sprite.speed;
				}

				if (keyDown(RIGHT_ARROW)) {
					player2Sprite.x = player2Sprite.x + player2Sprite.speed;
				}
			}
		}
		player1Sprite.x = constrain(player1Sprite.x, 10, 1000);
		player1Sprite.y = constrain(player1Sprite.y, 10, 950);
		player2Sprite.x = constrain(player2Sprite.x, 10, 1000);
		player2Sprite.y = constrain(player2Sprite.y, 10, 960);

		player.update(player1Sprite.x, player1Sprite.y, player2Sprite.x, player2Sprite.y);
	}
}
