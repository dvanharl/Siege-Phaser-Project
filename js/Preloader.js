BasicGame.Preloader = function (game) {
	this.gameOptions = null;
	
	this.preloader = true;
	this.preloader_logo = true;
	this.preloader_option = 4;
	this.preloader_text_option = 2;
	
	this.loading = null;
	this.pleaseWait = null;
	this.spokeCircle = null;
	this.solidCircle = null;
	this.preloadBar = null;
	this.preloadBarFill = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {
	init: function (gameOptions, preloader, preloader_logo,preloader_option,preloader_text_option) {
		this.gameOptions = gameOptions;
		this.preloader = preloader;
		this.preloader_logo = preloader_logo;
		this.preloader_option = preloader_option;
		this.preloader_text_option = preloader_text_option;
	},

	preload: function () {
		//Preloader Sprites based on option
		if(this.preloader){
			if(this.preloader_option == 1){
				this.spokeCircle = this.add.sprite(400,480, 'preloaderSpokeCircle');
				this.spokeCircle.anchor.setTo(.5,.8);
			}else if(this.preloader_option == 2){
				this.solidCircle = this.add.sprite(400,300,'preloaderSolidCircle');
				this.solidCircle.anchor.setTo(.5,.5);
			}else if(this.preloader_option == 3){
				this.preloadBar = this.add.sprite(175, 200, 'preloaderBar');
				this.preloadBarFill = this.add.sprite(175, 200, 'preloaderBarFill');
				this.preloadBarFill.scale.setTo(2.5);
				this.load.setPreloadSprite(this.preloadBarFill);
			}
			if(this.preloader_text_option == 1){
				this.pleaseWait = this.add.sprite(400,385,'preloaderPleaseWait');
				this.pleaseWait.anchor.setTo(.5,.5);
			}else if(this.preloader_text_option == 2){
				this.loading = this.add.sprite(400,385,'preloaderLoading');
				this.loading.anchor.setTo(.5,.5);
			}
		}

		//Game Sprites
		//Terrain
		this.load.image('map','assets/Terrain/map.jpg');
		this.load.image('plot','assets/Terrain/plot.png');
		//this.load.image('road1','assets/Terrain/road01.png');
		//this.load.image('road2','assets/Terrain/road02.png');
		this.load.image('road','assets/Terrain/road.png');
		
		//Structures
		////this.load.spritesheet('barracksBlue','assets/Structures/barracks_blue.png',,437,3);
		this.load.image('barracksRed','assets/Structures/barracks_red.png');
		////this.load.spritesheet('farmBlue','assets/Structures/farm_blue.png',700,453,3);
		////this.load.spritesheet('farmRed','assets/Structures/farm_red.png',700,453,3);
		////this.load.spritesheet('goldmineBlue','assets/Structures/goldmine_blue.png',1000,620,3);
		this.load.spritesheet('goldmineRed','assets/Structures/goldmine_red.png',100,62,3);
		////this.load.image('palaceBlue','assets/Structures/palace_blue.png');
		this.load.image('palaceRed','assets/Structures/palace_red.png');
		////this.load.spritesheet('wall','assets/Structures/wall.png',800,525,3);
		this.load.spritesheet('wall-a','assets/Structures/wall-a.png',160,105,3);
		////this.load.spritesheet('watchtowerBlue','assets/Structures/watchtower_blue.png',1000,1000,3);
		this.load.spritesheet('watchtowerRed','assets/Structures/watchtower_red.png',200,200,3);
		//this.load.spritesheet('upgradeAnim','assets/Structures/upgradeAnimation.png',1002,696,17);
		this.load.spritesheet('upgradeAnim','assets/Structures/upgrade2.png',250.5,174,17);
		
		//Units
		this.load.spritesheet('enemySoldiers','assets/Units/enemy_soldiers.png',96,86,21);
		this.load.spritesheet('enemyHero','assets/Units/enemy_hero.png',143,143,36);
		this.load.spritesheet('barracksSoldier','assets/Units/barracks_soldier.png',126.8077,121,26)
		this.load.image('cannonball','assets/Units/cannonball.png');
		this.load.image('healthGreen','assets/Units/health_bar_green.png');
		this.load.image('healthRed','assets/Units/health_bar_red.png');
		
		//UI
		this.load.image('gold','assets/UI/gold.png');
		this.load.image('wallHP','assets/UI/wall-hpbar.png');
		this.load.image('wallBarGreen','assets/UI/wall-hpbar-green.png');
		this.load.image('wallBarRed','assets/UI/wall-hpbar-red.png');
		this.load.image('hand','assets/UI/hand.png');
		this.load.image('upgrade','assets/UI/upgrade.png');
		this.load.image('tooltip','assets/UI/tooltip_legacy.png');
		this.load.image('defeat','assets/UI/defeat.png');
		this.load.image('gameover','assets/UI/gameover.png');
		this.load.image('buttonClose','assets/UI/button-close2.png');
		this.load.image('buttonGetApp','assets/UI/button-get-app.png');
		this.load.image('buttonTryAgain','assets/UI/button-try-again.png');
		this.load.image('blackScreen','assets/UI/blackscreen.png');
		this.load.image('buttonInstallNow','assets/UI/button-install-now.png');
		this.load.spritesheet('purchaseFrame','assets/UI/purchase-frame.png',800,780,2);
		
	},

	create: function () {
		this.state.start('Game',true,false,this.gameOptions,this.gameOptions.banner,this.gameOptions.banner_clickable_on_show,this.gameOptions.hide_countdown_close_button_on_first_action,this.gameOptions.hideCloseButtonTime,this.gameOptions.countDownCloseButton,this.gameOptions.didInteractTimeLimit,this.gameOptions.didInteractTimeLimitEnabled,this.gameOptions.ClickURL,this.gameOptions.MAX_PLAY_TIME,this.gameOptions.tutorial);
	},
	
	loadUpdate: function () {
		//Animate any existing circles
		if(this.spokeCircle != null){
			this.spokeCircle.angle += 6;
		}else if(this.solidCircle != null){
			this.solidCircle.angle += 6;
		}
	}
};
