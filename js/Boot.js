var BasicGame = {};

BasicGame.Boot = function (game) {};
BasicGame.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;

        this.stage.disableVisibilityChange = true;
		
		//Scale game window
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
        /*if (this.game.device.desktop){
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }else{
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }*/
    },

    preload: function () {

        //  Here we load the assets required for our Preloader state (in this case a background and a loading bar)
        ////this.load.image('preloaderBar', 'assets/preloader_bar.png');

    },

    create: function () {

        //Move to Preloader State
        this.state.start('Preloader');

    }

};
