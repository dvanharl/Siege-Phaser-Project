var BasicGame = {};

BasicGame.Boot = function (game) {};
BasicGame.Boot.prototype = {
    init: function () {

        this.input.maxPointers = 1;
		
		//Make active if on different window
        this.stage.disableVisibilityChange = true;
		
		//Scale game window
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
    },

    preload: function () {
		//Load JSON file
		////this.load.text('gameOptions','gameOptions.json');
		
        //Load preloader assets
        this.load.image('preloaderBar', 'assets/Preloader/preloader_loading_bar.png');
		this.load.image('preloaderBarFill', 'assets/Preloader/preloader_loading_bar_fill.png');
		this.load.image('loading','assets/Preloader/preloader_loading.png');
    },

    create: function () {
        //Move to Preloader State
        this.state.start('Preloader');
    }
};
