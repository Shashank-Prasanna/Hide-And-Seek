class Form {
	constructor() {
		this.header = createElement('h1');
		this.greeting = createElement('h1');
		this.input = createInput('Name');
		this.button = createButton('Join');
		this.player;
	}

	display() {
		this.header.position(displayWidth / 2 - 100, 20);
		this.header.html('Hide And Seek');

		this.input.position(displayWidth / 2 - 100, 200);

		this.button.position(displayWidth / 2 - 100, 400);

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
				if (random(0, 100) >= 50) {
					player1Sprite.role = 'hider';
					player2Sprite.role = 'seeker';
				} else {
					player1Sprite.role = 'seeker';
					player2Sprite.role = 'hider';
				}
				database.ref('Players/Player1').update({
					role: player1Sprite.role,
				});

				database.ref('Players/Player2').update({
					role: player2Sprite.role,
				});
			}

			if (this.player === 'Player 2') {
				var roleRef = database.ref('Players/Player2/role');
				roleRef.on('value', (data) => {
					player2Sprite.role = data.val();
				});
			}

			database.ref('Players').update({
				PlayerCount: playerCount,
			});
		});
	}

	hide() {
		this.header.hide();
		this.input.hide();
		this.button.hide();
	}
}
