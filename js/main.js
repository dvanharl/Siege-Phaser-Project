adInfo.gameOptions = {
	/*
	"overrideJSON": "",
	"overrideKey": "",
	"GameID": "",
	"SizeID": "",
	"osID": "",
	"FileID": "",
	"TrafficID": "",
	"TestID": "",
	"Property1": "off",
	"Property2": ["off","on"],
	"Property3": 2,
	"Property4": ["off","on"],
	"Property5": ["off","on"],
	"Property6": ["off","on"],
	"Property7": ["off","on"],
	"Property8": ["off","on"],
	"country": "",
	"milestone": "30",
	"hideCloseButtonTime": 5,
	"countDownCloseButton": ["on","off"],
	"preloaderStartCountdown": ["on","off"],
	"didInteractTimeLimit": 15,
	"didInteractTimeLimitEnabled": ["on","off"],
	"gamePlayLogo": ["off","on"],
	"endCardLogo": ["off","on"],
	"closeButtonBackground_portrait": "rgba(0,0,0,1)",
	"closeButtonBackground_landscape": "rgba(0,0,0,1)",
	"closeButtonTimer": 10,
	"preloader": ["on","off"],
	"telemetryWebSocketDisabled": ["FALSE","TRUE"],
	"preloader_logo": ["on","off"],
	"preloader_option": [0,1,2,3,4],
	"preloader_text_option": [0,1,2],
	"replay": ["on","off"],
	"replay_count": 1,
	"disclaimerToggle": ["on","off"],
	"disclaimerMessageID": [1,0],
	"disclaimerFontFamily": "arial",
	"disclaimerFontColor": "rgba(128,128,128,1)",
	"disclaimerFontSize": 10,
	"banner_clickable_on_show": ["on","off"],
	"bannerToggle_portrait": ["off","on"],
	"bannerToggle_landscape": ["off","on"],
	"INSTALL_BANNER_FONT_FAMILY": "Arial",
	"INSTALL_BANNER_FONT_SIZE": 40,
	"INSTALL_BANNER_TEXT_FILL_COLOR": "rgba(255,255,255,1)",
	"INSTALL_BANNER_BOX_FILL_COLOR": "rgba(0,0,0,1)",
	"INSTALL_BANNER_TEXT_ID": [1, 2],
	"tutorial": ["on","off"],
	"tutorial1": ["on","off"],
	"tutorial1_pointer": ["on","off"],
	"tutorial_first_action_message": ["on","off"],
	"purchase_tower_message": ["on","off"],
	"purchase_farm_message": ["on","off"],
	"upgrade_wall_message": ["on","off"],
	"upgrade_building_message": ["on","off"],
	"purchase_barrack_message": ["on","off"],
	"tutorial2": ["on","off"],
	"tutorial2_pointer": ["on","off"],
	"MAX_PLAY_TIME": 120,
	"WALL_ATTACK_DISTANCE": 0.9,
	"TROOP_HEALTH": 2,
	"TROOP_DAMAGE": 1,
	"TROOP_ATTACK_INTERVAL": 1,
	"STARTING_GOLD": 100,
	"BASE_GOLD_INCOME": 1,
	"ENEMY_HEALTH": 2,
	"ENEMY_DAMAGE": 1,
	"ENEMY_SPAWN_INTERVAL": 8,
	"ENEMY_SPAWN_RATE_INCREASE": 0.5,
	"ENEMY_MIN_SPAWN_RATE": 2,
	"BOSS_HEALTH": 10,
	"BOSS_DAMAGE": 2,
	"BOSS_INTERVAL": 4,
	"wall1BaseStrength": 50,
	"wall2BaseStrength": 100,
	"wall3BaseStrength": 200,
	"tower1Damage": 0.5,
	"tower1RateOfFire": 1,
	"tower1UpgradeCost": 25,
	"tower1UpgradeTime": 20,
	"tower2Damage": 0.5,
	"tower2RateOfFire": 0.75,
	"tower2UpgradeCost": 50,
	"tower2UpgradeTime": 20,
	"tower3Damage": 0.5,
	"tower3RateOfFire": 0.5,
	"farm1GoldIncomeBoost": 1,
	"farm1UpGradeCost": 10,
	"farm1UpGradeTime": 10,
	"farm2GoldIncomeBoost": 1.5,
	"farm2UpGradeCost": 20,
	"farm2UpGradeTime": 15,
	"farm3GoldIncomeBoost": 2,
	"farmPrice": 20,
	"barrackPrice": 30,
	"towerPrice": 40,
	"wall2Price": 50,
	"wall3Price": 100,
	"ENDCARD_HEADERTEXT_VICTORY_TOGGLE": ["on","off"],
	"ENDCARD_HEADERTEXT_VICTORY_ID": [1,2,3],
	"ENDCARD_HEADERTEXT_DEFEATED_TOGGLE": ["on","off"],
	"ENDCARD_HEADERTEXT_DEFEATED_ID": [1,2,3],
	"ENDCARD_HEADERTEXT_TIMELIMIT_TOGGLE": ["on","off"],
	"ENDCARD_HEADERTEXT_TIMELIMIT_ID": [1,2,3],
	"ENDCARD_MESSAGE_VICTORY_TOGGLE": ["on","off"],
	"ENDCARD_MESSAGE_VICTORY_ID": [1,2,3,4],
	"ENDCARD_MESSAGE_DEFEATED_TOGGLE": ["on","off"],
	"ENDCARD_MESSAGE_DEFEATED_ID": [1,2,3,4],
	"ENDCARD_MESSAGE_TIMELIMIT_TOGGLE": ["on","off"],
	"ENDCARD_MESSAGE_TIMELIMIT_ID": [1,2,3,4]
	*/
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

	
	//var game = new Phaser.Game(window.innerWidth *window.devicePixelRatio,window.innerHeight*window.devicePixelRatio, Phaser.AUTO, 'game' );
	var game = new Phaser.Game(800*window.devicePixelRatio,600*window.devicePixelRatio, Phaser.AUTO, 'game' );

	//Add Game States
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('Game', BasicGame.Game);
	
	//Start boot state
	game.state.start('Boot');
};