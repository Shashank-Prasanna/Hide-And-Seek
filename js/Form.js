class Form {
	constructor() {
		this.header = createElement('h1');
		this.greeting = createElement('h1');
		this.input = createInput('Name');
		this.button = createButton('Join');
		this.player;
		this.reset_btn = createButton('RESET');
	}

	display() {
		this.header.position(displayWidth / 2 - 100, 20);
		this.header.html('Hide And Seek');

		this.input.position(displayWidth / 2 - 100, 200);

		this.button.position(displayWidth / 2 - 100, 400);
		this.reset_btn.position(10, 10);

		this.button.mousePressed(() => {
			var name = this.input.value();
			//this.greeting.position(displayWidth / 2, displayHeight / 2);
			this.greeting.html('Hello ' + name);
			this.greeting.center();

			if (playerCount === 0) {
				database.ref('Players/Player1').update({
					name: name,
				});
				this.player = 'Player 1';
				player1Sprite.name = name;
				this.hide();
			} else {
				database.ref('Players/Player2').update({
					name: name,
				});
				this.player = 'Player 2';
				player2Sprite.name = name;
				this.hide();
			}
			playerCount++;
			if (this.player === 'Player 1') {
				if (random(0, 100) > 50) {
					player1Sprite.role = 'hider';
					player2Sprite.role = 'seeker';
					player1Sprite.speed = 4;
					player2Sprite.speed = 6;
				} else {
					player1Sprite.role = 'seeker';
					player2Sprite.role = 'hider';
					player1Sprite.speed = 6;
					player2Sprite.speed = 4;
				}
				database.ref('Players/Player1').update({
					role: player1Sprite.role,
				});

				database.ref('Players/Player2').update({
					role: player2Sprite.role,
				});
			}

			if (this.player === 'Player 2') {
				roleRef = database.ref('Players');
				roleRef.on('value', (data) => {
					player2Sprite.role = data.val().Player2.role;
					player1Sprite.role = data.val().Player1.role;
				});
			}

			database.ref('Players').update({
				PlayerCount: playerCount,
			});

			if (form.player === 'Player 2') {
				timerRef = database.ref('timerVal');
				console.log(timerRef);
				timerRef.on('value', (data) => {
					timer.timeLeftMin = data.val().mins;
					timer.timeLeftSec = data.val().secs;
					console.log('UPDATED!');
				});
			}
		});

		this.reset_btn.mousePressed(() => {
			database.ref('/').update({
				GameState: 'Lobby',
				Players: {
					distance: distance,
					Player1: {
						name: 'Foo1',
						winner: 'foo',
						position: {
							x: 20,
							y: 20,
						},
						role: 'foo',
					},

					Player2: {
						name: 'foo2',
						winner: 'foo',
						position: {
							x: 980,
							y: 950,
						},
						role: 'foo',
					},
					PlayerCount: 0,
				},
			});
			location.reload();
		});
	}
	hide() {
		this.header.hide();
		this.input.hide();
		this.button.hide();
	}
}
