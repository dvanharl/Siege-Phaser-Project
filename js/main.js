window.onload = function() {
	//var game = new Phaser.Game(800,600, Phaser.AUTO, 'game' );
	var game = new Phaser.Game(window.innerWidth *window.devicePixelRatio,window.innerHeight*window.devicePixelRatio, Phaser.AUTO, 'game' );

	//Add Game States
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('Game', BasicGame.Game);
	
	//Start boot state
	game.state.start('Boot');
};
