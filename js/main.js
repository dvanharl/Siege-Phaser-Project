adInfo.gameOptions = {
	"preloader": "true",
	"preloader_logo": "true",
	"preloader_option": "1",
	"preloader_text_option": "2",
	"banner": "true",
	"banner_clickable_on_show":"true",
	"hide_countdown_close_button_on_first_action": "false",
	"hideCloseButtonTime": "0",
	"countDownCloseButton": "true",
	"Property3":"1",
	"preloaderStartCountdown": "true",
	"didInteractTimeLimit": "30",
	"didInteractTimeLimitEnabled": "true",
	"ClickURL": "http://www.google.com/",
	"max_play_time":"90",
	"tutorial": "true",
	"install_banner_option": "1",
	"install_banner_text":"We're under attack! Build a tower to defend against the enemy troops.",
	"stage1_enable":"true",
	"stage1_message1":"false",
	"stage1_pointer":"false",
	"stage2_enable":"true",
	"stage2_message1":"true",
	"stage2_pointer":"true"
};

var settings = {};

window.onload = function() {
	PlayableSdk.start(startGame);
};

function startGame(){
	settings = {
		preloader: PlayableSdk.cfg.getBoolean("preloader",true),
		preloader_logo: PlayableSdk.cfg.getBoolean("preloader_logo",true),
		preloader_option: PlayableSdk.cfg.getNumber("preloader_option",1),
		preloader_text_option: PlayableSdk.cfg.getNumber("preloader_text_option",1),
		banner: PlayableSdk.cfg.getBoolean("banner",true),
		banner_clickable_on_show: PlayableSdk.cfg.getBoolean("banner_clickable_on_show",true),
		hide_countdown_close_button_on_first_action: PlayableSdk.cfg.getBoolean("hide_countdown_close_button_on_first_action",false),
		hideCloseButtonTime: PlayableSdk.cfg.getNumber("hideCloseButtonTime",0),
		countDownCloseButton: PlayableSdk.cfg.getBoolean("countDownCloseButton",true),
		Property3: PlayableSdk.cfg.getNumber("Property3",1),
		preloaderStartCountdown: PlayableSdk.cfg.getBoolean("preloaderStartCountdown",true),
		didInteractTimeLimit: PlayableSdk.cfg.getNumber("didInteractTimeLimit",30),
		didInteractTimeLimitEnabled: PlayableSdk.cfg.getBoolean("didInteractTimeLimitEnabled",true),
		max_play_time:PlayableSdk.cfg.getNumber("max_play_time",90),
		tutorial:PlayableSdk.cfg.getBoolean("tutorial",true),
		install_banner_option:PlayableSdk.cfg.getNumber("install_banner_option",1),
		install_banner_text: PlayableSdk.cfg.getString("install_banner_text",""),
		stage1_enable: PlayableSdk.cfg.getBoolean("stage1_enable",true),
		stage1_message1:PlayableSdk.cfg.getBoolean("stage1_message1",true),
		stage1_pointer:PlayableSdk.cfg.getBoolean("stage1_pointer",true),
		stage2_enable:PlayableSdk.cfg.getBoolean("stage2_enable",true),
		stage2_message1:PlayableSdk.cfg.getBoolean("stage2_message1",true),
		stage2_pointer:PlayableSdk.cfg.getBoolean("stage2_pointer",true)
	}

	
	var game = new Phaser.Game(window.innerWidth *window.devicePixelRatio,window.innerHeight*window.devicePixelRatio, Phaser.CANVAS, 'game' );

	//Add Game States
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('Game', BasicGame.Game);
	
	//Start boot state
	game.state.start('Boot');
};