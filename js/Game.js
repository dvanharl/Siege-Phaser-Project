
BasicGame.Game = function (game) {
	this.map = null;
	
	this.palace = null;
	
	this.wall1 = null;
	this.wall2 = null;
	this.wall3 = null;
	this.wallRed = null;
	this.wallGreen = null;
	this.wallUI = null;
	this.wallHP = 0;
	
	this.goldUI = 0;
	this.gold = 0;
	this.menu = null;
	
	this.structures = null;
	this.plots = null;
	this.spaces = null;
	
	this.enemies = null;
	this.enemySpeed = null;
	this.enemiesSpawned = 0;
	
	this.inTutorial= true;
	this.played = false;
	
	this.blackScreen = null;
	
	this.defeat = null;
	this.gameOverBox = null;
	this.tooltipBox = null;
	this.introText = null;
	this.watchtowerText = null;
	this.goldText = null;
	this.goldTText = null;
	this.barracksText = null;
	this.wallText = null;
	this.gameOverText = null;
	this.timeUpText = null;
	this.getApp = null;
	this.tryAgain = null;
	this.closeGame = null;
	this.installNow = null;
	this.lost = false;
	
	this.numStructures = -1;
	this.looper = null;
	this.gameEnded = false;
	
	this.enemyTimer = null;
	this.landscape = null;
	this.gameTimer = null;
};

BasicGame.Game.prototype = {
    create: function () {
		this.world.setBounds(0,0,2000,2000);
		if((window.innerWidth/window.innerHeight) <= (3/4)){
			this.landscape = true;
		}else{
			this.landscape = false;
		}
		
		//Background
		this.map = this.add.sprite(0,0,'map');
		////Roads
		this.road1 = this.add.sprite(65,250,'road');
		this.road1.scale.setTo(.17);
		this.road3 = this.add.sprite(225,160,'road');
		this.road3.scale.setTo(.17);
		
		
		//Initial Structures - Palace and Wall
		this.palace = this.add.sprite(25,75,'palaceRed');
		this.palace.scale.setTo(.17);
		this.palace.anchor.setTo(.5,.5);
		this.wall3 = this.add.sprite(450,26,'wall-a');
		this.wall3.anchor.setTo(.5,.5);
		this.wall3.scale.setTo(.6);
		this.wall1 = this.add.sprite(200,150,'wall-a');
		this.wall1.anchor.setTo(.5,.5);
		this.wall1.scale.setTo(.6);
		this.wall2 = this.add.sprite(-50,274,'wall-a');
		this.wall2.anchor.setTo(.5,.5);
		this.wall2.scale.setTo(.6);
		
		////Plots
		this.plots = this.add.group();
		this.plotTween = [];
		for(var i=0;i<11;i++){
			this.plots.create(600,0,'plot');
			this.plots.children[i].scale.set(.23);
			this.plotTween.push(this.add.tween(this.plots.children[i].scale).to({x:.21,y:.21},500,Phaser.Easing.Linear.None,false,0,-1,true));
			this.plotTween[i].start();
			this.plotTween[i].pause();
			this.plots.children[i].scale.set(.23);
			this.plots.children[i].anchor.set(.5,.5);
			this.plots.children[i].inputEnabled = true;
			//this.plots.children[i].input.pixelPerfectOver = true;
			if(i<6){
				this.plots.children[i].health = 1;
			}else if(i<9){
				this.plots.children[i].health = 2;
			}else{
				this.plots.children[i].health = 3;
			}
		}
		//Left Section
		this.plots.children[0].x = 235;
		this.plots.children[0].y = 420;
		this.plots.children[0].z = 4;
		this.plots.children[1].x = 325;
		this.plots.children[1].y = 470;
		this.plots.children[1].z = 6;
		this.plots.children[2].x = 415;
		this.plots.children[2].y = 520;
		this.plots.children[2].z = 7;
		this.plots.children[3].x = 505;
		this.plots.children[3].y = 570;
		this.plots.children[3].z = 10;
		this.plots.children[4].x = 235;
		this.plots.children[4].y = 520;
		this.plots.children[4].z = 8;
		this.plots.children[5].x = 325;
		this.plots.children[5].y = 570;
		this.plots.children[5].z = 9;
		for(i=0;i<6;i++){
			this.plots.children[i].x -= 10;
			this.plots.children[i].y += 10;
		}
		//Middle Section
		this.plots.children[6].x = 370;
		this.plots.children[6].y = 330;
		this.plots.children[6].z = 2;
		this.plots.children[7].x = 460;
		this.plots.children[7].y = 380;
		this.plots.children[7].z = 3;
		this.plots.children[8].x = 550;
		this.plots.children[8].y = 430;
		this.plots.children[8].z = 5;
		//Right Section
		this.plots.children[9].x = 490;
		this.plots.children[9].y = 230;
		this.plots.children[9].z = 0;
		this.plots.children[10].x = 580;
		this.plots.children[10].y = 280;
		this.plots.children[10].z = 1;
		for(i=9;i<11;i++){
			this.plots.children[i].x += 25;
		}

		
		//Unit Groups
		this.structures = this.add.group();
		this.units = []
		this.enemies = this.add.group();
		this.enemiesSpawned = 0;
		
		//UI
		////Basic
		this.wallRed = this.add.sprite(550,50,'wallBarRed');
		this.wallRed.scale.setTo(.15);
		this.wallGreen = this.add.sprite(550,50,'wallBarGreen');
		this.wallGreen.scale.setTo(.15);
		this.wallUI = this.add.sprite(550,50,'wallHP');
		this.wallUI.scale.setTo(.15);
		this.wallUI.alpha = .75;
		this.goldUI = this.add.sprite(150,100,'gold');
		this.goldUI.anchor.setTo(.5,.5);
		this.goldUI.scale.setTo(.25);
		this.goldText = this.add.text(120,0,""+(this.gold/100));
		this.goldText.anchor.setTo(.5,.5);
		this.goldText.scale.setTo(4);
		this.goldUI.addChild(this.goldText);
		this.spawnX = 0;
		this.spawnY = 0;
		
		
		//Menu
		this.menu = this.add.group();
		////Boxes
		//////Goldmine
		this.menu.create(75,220,'purchaseFrame',0);
		this.menu.children[0].health = 20;
		this.menu.children[0].inputEnabled = true;
		this.menu.children[0].events.onInputDown.add(function(){
			if(this.menu.children[0].frame == 1){
				this.holding = this.add.sprite(this.input.mousePointer.x,this.input.mousePointer.y,'goldmineRed');
				this.holding.health = 20;
				this.holding.anchor.setTo(.5,.5);
				this.holding.scale.setTo(.15);
				for(var i=0;i<6;i++){
					if(this.plots.children[i].health != -1){
						this.plotTween[i].resume();
						
					}
				}
				for(var i=6;i<11;i++){
					if(this.plots.children[i].health != -1){
						this.plots.children[i].alpha = .4;
					}
				}
			}
		},this);
		this.menu.children[0].events.onInputUp.add(function(){
			if(this.holding != null){
				for(var i=0;i<6;i++){
					if(this.plots.children[i].health != -1){
						this.plotTween[i].pause();
						this.plots.children[i].scale.setTo(.23);
					}
				}
				this.placeStructure();
				this.holding.destroy();
				this.holding = null;
				for(var i=6;i<11;i++){
					if(this.plots.children[i].health != -1){
						this.plots.children[i].alpha = 1;
					}
				}
			}
		},this);
		//////Barracks
		this.menu.create(75,325,'purchaseFrame',0);
		this.menu.children[1].health = 30;
		this.menu.children[1].inputEnabled = true;
		this.menu.children[1].events.onInputDown.add(function(){
			if(this.menu.children[1].frame == 1){
				this.holding = this.add.sprite(this.input.mousePointer.x,this.input.mousePointer.y,'barracksRed');
				this.holding.health = 30;
				this.holding.anchor.setTo(.5,.5);
				this.holding.scale.setTo(.3);
				for(var i=6;i<11;i++){
					if(this.plots.children[i].health != -1){
						this.plotTween[i].resume();
					}
				}
				for(var i=0;i<6;i++){
					if(this.plots.children[i].health != -1){
						this.plots.children[i].alpha = .4;
					}
				}
			}
		},this);
		this.menu.children[1].events.onInputUp.add(function(){
			if(this.holding != null){
				this.placeStructure();
				this.holding.destroy();
				this.holding = null;
				for(var i=6;i<11;i++){
					this.plotTween[i].pause();
					this.plots.children[i].scale.setTo(.23);
				}
				for(var i=0;i<6;i++){
					if(this.plots.children[i].health != -1){
						this.plots.children[i].alpha = 1;
					}
				}
			}
		},this);
		//////Watchtower
		this.menu.create(75,430,'purchaseFrame',0);
		this.menu.children[2].health = 40;
		this.menu.children[2].inputEnabled = true;
		this.menu.children[2].events.onInputDown.add(function(){
			if(this.menu.children[2].frame == 1){
				this.holding = this.add.sprite(this.input.mousePointer.x,this.input.mousePointer.y,'watchtowerRed');
				this.holding.health = 40;
				this.holding.anchor.setTo(.4,.6);
				this.holding.scale.setTo(.4);
				for(var i=0;i<11;i++){
					if(this.plots.children[i].health != -1){
						this.plotTween[i].resume();
					}
				}
			}
		},this);
		this.menu.children[2].events.onInputUp.add(function(){
			if(this.holding != null){
				this.placeStructure();
				this.holding.destroy();
				this.holding = null;
			}
			for(var i=0;i<11;i++){
				this.plotTween[i].pause();
				this.plots.children[i].scale.setTo(.23);
			}
		},this);
		//////Wall
		this.menu.create(75,535,'purchaseFrame',0);
		this.menu.children[3].health = 50;
		this.menu.children[3].inputEnabled = true;
		this.menu.children[3].events.onInputDown.add(function(){
			if(this.menu.children[3].frame == 1){
				//Upgrade Wall
				this.gold -= (this.menu.children[3].health*100);
				this.wall1.frame += 1;
				this.wall2.frame += 1;
				this.wall3.frame += 1;
				this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
				if(this.wall1.frame == 1){
					this.menu.children[3].health = 100;
					this.wallHP = 100;
				}else{
					this.menu.children[3].health = 999999999;
					this.menu.children[7].alpha = 0;
					this.wallHP = 200;
				}
			}
		},this);
		
		
		////Icons
		//////Goldmine
		this.menu.create(this.menu.children[0].x,this.menu.children[0].y,'goldmineRed');
		this.menu.children[4].scale.setTo(.1);
		this.iconMine = this.add.tween(this.menu.children[4].scale).to({x:.09,y:.09},500,Phaser.Easing.Linear.None,false,0,-1,true);
		//////Barracks
		this.menu.create(this.menu.children[1].x,this.menu.children[1].y,'barracksRed');
		this.menu.children[5].scale.setTo(.15);
		this.iconBarracks = this.add.tween(this.menu.children[5].scale).to({x:.14,y:.14},500,Phaser.Easing.Linear.None,false,0,-1,true);
		//////Watchtower
		this.menu.create(this.menu.children[2].x+5,this.menu.children[2].y-25,'watchtowerRed');
		
		this.menu.children[6].scale.setTo(.2);
		this.iconWatchtower = this.add.tween(this.menu.children[6].scale).to({x:.19,y:.19},500,Phaser.Easing.Linear.None,false,0,-1,true);
		//////Wall
		this.menu.create(this.menu.children[3].x,this.menu.children[3].y,'wall-a');
		this.menu.children[7].scale.setTo(.2);
		
		this.menu.children[7].frame = 2
		this.iconWall = this.add.tween(this.menu.children[7].scale).to({x:.19,y:.19},500,Phaser.Easing.Linear.None,false,0,-1,true);
		
		for(var i=0;i<4;i++){
			this.menu.children[i].anchor.setTo(.5,.5);
			this.menu.children[i+4].anchor.setTo(.5,.5);
			this.menu.children[i].scale.setTo(.16);
			this.menu.children[i].tint = 0xbfbfbf;
		}
		this.menu.children[6].anchor.setTo(.45,.62);
		this.menu.children[7].anchor.setTo(.52,.5);
		
		this.iconMine.start();
		this.iconMine.pause();
		this.menu.children[4].scale.setTo(.1);
		this.iconBarracks.start();
		this.iconBarracks.pause();
		this.menu.children[5].scale.setTo(.15);
		this.iconWatchtower.start();
		this.iconWatchtower.pause();
		this.menu.children[6].scale.setTo(.2);
		this.iconWall.start();
		this.iconWall.pause();
		this.menu.children[7].scale.setTo(.2);
		
		//Game Over
		this.defeat = this.add.sprite(400,300,'defeat');
		this.defeat.anchor.setTo(.5,.5);
		this.defeat.scale.setTo(0);
		
		this.blackScreen = this.add.sprite(0,0,'blackScreen');
		this.blackScreen.alpha = 0;
		this.blackScreen.scale.setTo(2);
		
		this.gameOverBox = this.add.sprite(400,300,'gameover');
		this.gameOverBox.anchor.setTo(.5,.5);
		this.gameOverBox.scale.setTo(.5);
		this.gameOverBox.kill();
		
		this.getApp = this.add.sprite(450,450,'buttonGetApp');
		this.getApp.scale.setTo(.2);
		this.getApp.anchor.setTo(.5,.5);
		this.getApp.inputEnabled = true;
		this.getApp.input.useHandCursor = true;
		this.getApp.events.onInputDown.add(function(){
			window.location.href = "http://www.google.com";
		},this);
		this.getApp.kill();
		
		this.tryAgain = this.add.sprite(450,350,'buttonTryAgain');
		this.tryAgain.scale.setTo(.2);
		this.tryAgain.anchor.setTo(.5,.5);
		this.tryAgain.inputEnabled = true;
		this.tryAgain.input.useHandCursor = true;
		this.tryAgain.events.onInputUp.add(function(){
			this.played = true;
			this.restart();
		},this);
		this.tryAgain.kill();
		
		//Close Button
		this.closeButton = this.add.sprite(25,25,'buttonClose');
		this.closeButton.scale.setTo(.05);
		this.closeButton.anchor.setTo(.5,.5);
		this.closeButton.inputEnabled = true;
		this.closeButton.input.useHandCursor = true;
		this.closeButton.events.onInputUp.add(function(){
			this.game.destroy();
		},this);
		
		//Install Now Button
		this.installNow = this.add.sprite(400,50,'buttonInstallNow');
		this.installNow.anchor.setTo(.5,.5);
		this.installNow.scale.setTo(.2);
		this.installNow.inputEnabled = true;
		this.installNow.input.useHandCursor = true;
		this.installNow.events.onInputUp.add(function(){
			window.location.href = "http://www.google.com";
		},this);
		
		////Text lines
		this.tooltipBox = this.add.sprite(400,900,'tooltip');
		//this.tooltipBox.inputEnabled = true;
		//this.tooltipBox.onInputUp.add(this.closeTipBox(),this);
		this.tooltipActive = false;
		
		style = {font:"24px Arial",fill:"#4f3f2d",wordWrap:true,wordWrapWidth:this.tooltipBox.width/2};
		
		this.introText = this.add.text(400,900,'We\'re under attack! Build a tower to defend against the enemy troops.', style);
		this.tutorialText2 = this.add.text(400,900,'We\'re under attack! Build a tower to defend against the enemy troops.', style);
		this.watchtowerText = this.add.text(400,900,'Watchtowers can attack enemy troops from any angle.', style);
		this.goldTText = this.add.text(400,900,'Gold mine will increase your gold income.', style);
		this.wallText = this.add.text(400,900,'Hurry! Upgrade your wall to repair it!', style);
		this.barracksText = this.add.text(400,900,'The barracks train guards that stop approaching enemies in their tracks.', style);
		this.upgradeText = this.add.text(400,900,'Tap on structures marked with the arrow to upgrade their abilities.', style);
		this.gameOverText = this.add.text(400,180, 'YOU LOST! INSTALL GAME OF WAR* AND BUILD YOUR EMPIRE IN THIS REAL TIME GAME OF GLOBAL CONQUEST.', style);
		this.gameOverText.anchor.setTo(.5,.5);
		this.gameOverText.kill();
		this.timeUpText = this.add.text(400,180,'TIME\'S UP! INSTALL GAME OF WAR* AND BUILD YOUR EMPIRE IN THIS REAL TIME GAME OF GLOBAL CONQUEST', style);
		this.timeUpText.anchor.setTo(.5,.5);
		this.timeUpText.kill();
		
		
		
		////Set initial stats
		this.gold = 10000;
		this.wallHP = 50;
		this.inTutorial = false;
		this.played = false;
		this.lost = false;
		this.numStructures = -1;
		this.gameEnded = false;
		
		//Set timer to spawn enemies
		this.enemyTimer = this.time.events.loop(5000, function() {
			this.enemySpawn();
		},this);
		this.time.events.start();
		
		//Set timer to game over
		this.gameTimer = this.time.events.add(60000,function(){
			this.gameOver();
		},this);
    },

    update: function () {
		//Orientation update
		this.orientationUpdate();
		//Gold Text Render
		this.goldText.setText(parseInt((this.gold/100),10));
		
		//Tutorial Check
		if(this.inTutorial){
			//Check if first text box has played
		}else if(!this.gameEnded){
			//Menu Update
			this.menuUpdate();
			
			//Wall HP Update
			this.wallUpdate();
			
			//Enemy update
			this.enemyUpdate();
			
			//Structure update
			this.structureUpdate();
			
			//Gold update
			this.gold += 1;
		}
    },
	
	openTipBox: function(){
		//Have box move into the screen
		if(!this.tooltipActive){
			if(this.landScape){
				
			}else{
				
			}
			//Hide all text
			for(i=0;i<tooltipBox.children.length;i++){
				this.tooltipBox.children[textIndex].revive();
			}
		}
	},
	
	closeTipBox: function(textIndex){
		//Move out of the screen based on orientation
		this.tooltipBox.children[textIndex].revive();
		
		//Move out of the screen based on orientation
		if(this.landScape){
		}else{
		}
	},
	
	menuUpdate: function() {
		//Check to determine if items can be purchased
		for(var i=0;i<4;i++){
			//Make active if available, animate icon. Make inactive otherwise
			if(this.gold/100 >= this.menu.children[i].health){
				this.menu.children[i].tint = 0xffffff;
				this.menu.children[i].frame = 1;
				this.menu.children[i].scale.setTo(.155);
				if(i==0){
					this.iconMine.resume();
				}else if(i==1){
					this.iconBarracks.resume();
				}else if(i==2){
					this.iconWatchtower.resume();
				}else{
					this.iconWall.resume();
				}
			}else{
				this.menu.children[i].tint = 0xbfbfbf;
				this.menu.children[i].frame = 0;
				this.menu.children[i].scale.setTo(.165);
				if(i==0){
					this.iconMine.pause();
					//this.menu.children[4].scale.setTo(.1);
				}else if(i==1){
					this.iconBarracks.pause();
					//this.menu.children[5].scale.setTo(.15);
				}else if(i==2){
					this.iconWatchtower.pause();
					//this.menu.children[6].scale.setTo(.2);
				}else{
					this.iconWall.pause();
					//this.menu.children[7].scale.setTo(.2);
				}
			}
		}
		
		//Picking up structures from menu
		for(var i = this.menu.children.length-1;i>=0;i--){
			//Make active if available, animate icon. Make inactive otherwise
			////if(this.menu.children[i]
		}
		//Dropping structure into plot
		if(this.holding){
			this.holding.x = this.input.mousePointer.x;
			if(!this.landscape){
				this.holding.x += 100;
			}
			this.holding.y = this.input.mousePointer.y;
		}
				
	},
	
	placeStructure: function() {
		if(this.holding.key == 'goldmineRed'){
			for(var i=0;i<6;i++){
				if(this.plots.children[i].input.pointerOver() && this.plots.children[i].health != -1){
					//Placing structure on selected plot
					this.numStructures += 1;
					this.gold -= this.holding.health*100;
					this.plots.children[i].health = -1;
					this.plots.children[i].alpha = .4;
					temp = this.structures.create(this.plots.children[i].x,this.plots.children[i].y,this.holding.key);
					temp.z = this.plots.children[i].z;
					temp.anchor.setTo(.5,.55);
					temp.scale.setTo(.15);
					temp.health = 10;
					this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
					//Upgrade Arrow
					temp.addChild(this.add.sprite(-300,-300,'upgrade'));
					temp.children[0].anchor.setTo(.5,.5);
					temp.children[0].scale.setTo(1.5);
					temp.children[0].addChild(this.add.text(0,0,temp.health));
					temp.children[0].children[0].scale.setTo(3);
					temp.children[0].children[0].anchor.setTo(.5,.5);
					temp.children[0].kill();
					//Check if structures are upgradable
					temp.inputEnabled = true;
					temp.input.pixelPerfectClick = true;
					temp.input.pixelPerfectOver = true;
					temp.events.onInputUp.add(function(thing){
						if(this.gold/100 >= thing.health && thing.frame < 2 && thing.input.pointerOver()){
							temp = this.add.sprite(thing.x,thing.y,'upgradeAnim');
							temp.anchor.setTo(.49,.6);
							temp.scale.setTo(2.2);
							temp.animations.add('upgrade');
							temp.play('upgrade',30,false, true);
							this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
							this.gold -= thing.health*100;
							thing.health *= 2;
							thing.frame += 1;
						}
					},this,this.self);
					this.structures.sort('y', Phaser.Group.SORT_ASCENDING);
					break;
				}
			}
		}else if(this.holding.key == 'barracksRed'){
			for(var i=6;i<11;i++){
				if(this.plots.children[i].input.pointerOver() && this.plots.children[i].health != -1){
					this.numStructures += 1;
					this.gold -= this.holding.health*100;
					this.plots.children[i].health = -1;
					this.plots.children[i].alpha = .4;
					temp = this.structures.create(this.plots.children[i].x,this.plots.children[i].y,this.holding.key);
					temp.z = this.plots.children[i].z;
					temp.inputEnabled = true;
					//temp.input.pixelPerfectClick = true;
					temp.input.pixelPerfectOver = true;
					temp.anchor.setTo(.5,.65);
					temp.scale.setTo(.3);
					this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
					this.structures.sort('y', Phaser.Group.SORT_ASCENDING);
					//Barracks Guard
					temp.addChild(this.add.sprite(-250,100,'barracksSoldier'));
					temp.children[0].health = 100;
					temp.children[0].scale.setTo(1.5);
					temp.children[0].anchor.setTo(.5,.5);
					temp.children[0].animations.add('idle',[0,1,2,3,4,5,6,5,4,3,2,1],15,true);
					temp.children[0].animations.add('attack',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],24,true);
					temp.children[0].addChild(this.add.sprite(-107,-100,'healthRed'));
					temp.children[0].children[0].scale.setTo(1);
					temp.children[0].children[0].anchor.setTo(.07,.5);
					temp.children[0].addChild(this.add.sprite(-107,-100,'healthGreen'));
					temp.children[0].children[1].scale.setTo(1);
					temp.children[0].children[1].anchor.setTo(.07,.5);
					temp.children[0].kill();
					break;
				}
			}
		}else if(this.holding.key == 'watchtowerRed'){
			for(var i=0;i<11;i++){
				if(this.plots.children[i].input.pointerOver() && this.plots.children[i].health != -1){
					this.numStructures += 1;
					this.gold -= this.holding.health*100;
					this.plots.children[i].health = -1;
					this.plots.children[i].alpha = .4;
					temp = this.structures.create(this.plots.children[i].x,this.plots.children[i].y,this.holding.key);
					temp.z = this.plots.children[i].z;
					temp.anchor.setTo(.5,.7);
					temp.scale.setTo(.35);
					temp.health = 25;
					this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
					//Cannonball
					temp.addChild(this.add.sprite(temp.x,temp.y,'cannonball'));
					temp.children[0].health = -1;
					temp.children[0].anchor.setTo(.5,.5);
					temp.children[0].scale.setTo(.2);
					temp.children[0].kill();
					//Upgrade Arrow
					temp.addChild(this.add.sprite(-175,-150,'upgrade'));
					temp.children[1].addChild(this.add.text(0,0,temp.health));
					
					temp.children[1].scale.setTo(.65);
					temp.children[1].anchor.setTo(.5,.5);
					temp.children[1].children[0].scale.setTo(3);
					temp.children[1].children[0].anchor.setTo(.5,.5);
					temp.children[1].kill();
					//Check if structures are upgradable
					temp.inputEnabled = true;
					temp.input.pixelPerfectClick = true;
					temp.input.pixelPerfectOver = true;
					temp.events.onInputUp.add(function(thing){
						if(this.gold/100 >= thing.health && thing.frame < 2 && thing.input.pointerOver()){
							temp = this.add.sprite(thing.x,thing.y,'upgradeAnim');
							temp.anchor.setTo(.49,.6);
							temp.scale.setTo(2.2);
							temp.animations.add('upgrade');
							temp.play('upgrade',15,false, true);
							this.camera.shake(0.005,125,true,Phaser.Camera.SHAKE_BOTH,true);
							this.gold -= thing.health*100;
							thing.health *= 2;
							thing.frame += 1;
						}
					},this,this.self);
					this.structures.sort('y', Phaser.Group.SORT_ASCENDING);
					break;
				}
			}
		}
	},
	
	enemySpawn: function() {
		//Don't spawn if still in the tutorial
		if(!this.inTutorial){
			//Determine randomly which of the two paths to take
			if(this.rnd.integerInRange(1,2) == 1){
				//Left path
				this.spawnX = 1450;
				this.spawnY = 1000;
			}else{
				//Right path
				this.spawnX = 1420;
				this.spawnY = 800;
			}
			
			//Spawn an enemy hero every 3 soldiers
			enemy = null;
			if(this.enemiesSpawned != 3){
				this.enemiesSpawned += 1;
				enemy = this.enemies.create(this.spawnX,this.spawnY, 'enemySoldiers');
				enemy.anchor.setTo(.5,.5);
				enemy.animations.add('march',[0,1,2,3,4,5,6,7,8,9,10,11],15,true,true);
				enemy.animations.add('attack',[12,13,14,15,16,17,18,19,20],15,true,true);
				enemy.animations.play('march');
				enemy.health = 100;
			}else{
				this.enemiesSpawned = 0;
				enemy = this.enemies.create(this.spawnX,this.spawnY, 'enemyHero');
				enemy.anchor.setTo(.5,.5);
				enemy.animations.add('march',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],15,true,true);
				enemy.animations.add('attack',[24,25,26,27,28,29,30,31,32,33,34,35],15,true,true);
				enemy.animations.play('march');
				enemy.health = 400;
			}
			//Create life bar for enemy
			enemy.addChild(this.add.sprite(-37,-50,'healthRed'));
			enemy.children[0].scale.setTo(.5);
			enemy.children[0].anchor.setTo(.07,.5);
			enemy.addChild(this.add.sprite(-37,-50,'healthGreen'));
			enemy.children[1].scale.setTo(.5);
			enemy.children[1].anchor.setTo(.07,.5);
		}
	},
	
	enemyUpdate: function() {
		for(var i = this.enemies.children.length-1;i>=0;i--){
			//Adjust enemy health bars
			if(this.enemies.children[i].health <= 0){
				this.enemies.children[i].children[1].scale.x = 0;
			}else{
				if(this.enemies.children[i].key == 'enemySoldiers'){
					this.enemies.children[i].children[1].scale.x = .5 * (this.enemies.children[i].health/100);
				}else{
					this.enemies.children[i].children[1].scale.x = .5 * (this.enemies.children[i].health/400);
				}
			}
			//Check for any "dead" enemies. If existent, remove them from the list of enemies
			if(this.enemies.children[i].health <= 0){
				this.enemies.remove(this.enemies.children[i], true);
			}
		}
		
		for(var i = this.enemies.children.length-1;i>=0;i--){
			enemy = this.enemies.children[i];
			//If at barracks guard, stop and attack the guard
			temp = true;
			for(var j = this.structures.children.length-1;j>=0;j--){
				if(this.structures.children[j].key == 'barracksRed' && this.structures.children[j].children[0].alive){
					barracks = this.structures.children[j];
					soldier = barracks.children[0];
					soldierX = barracks.x;
					soldierY = barracks.y;
					if(enemy.x <= (soldierX+50) && enemy.x >= (soldierX-50) && enemy.y <= (soldierY+50) && enemy.y >= (soldierY-50)){
						temp = false;
						enemy.animations.play('attack');
						if(enemy.key == 'enemySoldiers' && enemy.frame == 15){
							soldier.damage(6.25);
						}else if(enemy.frame == 28){
							soldier.damage(12.5);
						}
						
						soldier.animations.play('attack');
						if(soldier.frame == 17){
							enemy.damage(12.5);
						}
						break;
					}
				}
			}
			
			
			//If at wall, attack and subtract amount from wall HP based on unit type
			if(enemy.overlap(this.palace) && temp){
				enemy.animations.play('attack');
				if(enemy.key == 'enemySoldiers'){
				
					if(enemy.frame == 15){
						this.wallHP -= .25;
					}
				}else{
					if(enemy.frame == 28){
						this.wallHP -= .5;
					}
				}
			}else if (temp){
				enemy.animations.play('march');
				enemy.x -= 1;
				enemy.y -= .55;
			}
		}
	},
	
	structureUpdate: function() {
		//Structure effects
		for(var i = 0;i<this.structures.children.length;i++){
			if(this.structures.children[i].children[0] == null){
				//Goldmine
				this.gold += (1 + this.structures.children[i].frame);
			}else if(this.structures.children[i].key == 'barracksRed'){
				//Barracks
				//If respective soldier is dead, revive him
				if(!this.structures.children[i].children[0].alive && this.structures.children[i].children[0].health != -1000){
					this.structures.children[i].children[0].health = -1000;
					this.time.events.add(5000,function(barracks){
						barracks.children[0].health = 100;
						barracks.children[0].revive();
						barracks.children[0].animations.play('idle');
					},this,this.structures.children[i]);
				}else{
					temp = true;
					if(this.structures.children[i].health <= 0){
						this.structures.children[i].children[0].children[1].scale.x = 0;
					}else{
						this.structures.children[i].children[0].children[1].scale.x = this.structures.children[i].children[0].health/100;
					}
					for(j=0;j<this.enemies.children.length;j++){
						if(this.structures.children[i].children[0].overlap(this.enemies.children[j])){
							temp = false;
							break;
						}
					}
					if(this.structures.children[i].children[0].frame > 7 && temp){
						this.structures.children[i].children[0].animations.play('idle');
					}
				}
			}else if(this.structures.children[i].key == 'watchtowerRed'){
				//Watchtower
				//Check if respective cannonball is dead, if so, set timer for cooldown and fire again
				closestEnemy = this.getClosestEnemyInRange(this.structures.children[i]);
				if((closestEnemy != null) && (!this.structures.children[i].children[0].alive) && (this.structures.children[i].children[0].health == -1)){
					this.shootCannonball(this.structures.children[i],closestEnemy);
				}	
			}
		}
		
		//Check if upgradable
		for(var i = this.structures.children.length-1;i>=0;i--){
			upgradeIndex = null;
			if(this.structures.children[i].key == 'goldmineRed'){
				upgradeIndex = 0;
			}else if(this.structures.children[i].key == 'watchtowerRed'){
				upgradeIndex = 1;
			}else{
				continue;
			}
			if(this.gold/100 >= this.structures.children[i].health && this.structures.children[i].frame<2){
				//Upgrade arrow appear with price
				if(!this.structures.children[i].children[upgradeIndex].alive){
					this.structures.children[i].children[upgradeIndex].revive();
					//this.structures.children[i].children[upgradeIndex].children[0].setText(his.structures.children[i].health);
					this.structures.children[i].children[upgradeIndex].health = 1;
				}else if(this.structures.children[i].children[upgradeIndex].y >= -200 &&this.structures.children[i].children[upgradeIndex].health != -1){
					this.structures.children[i].children[upgradeIndex].health = 1;
					this.structures.children[i].children[upgradeIndex].y -= 2;
				}else if(this.structures.children[i].children[upgradeIndex].y <= -100 && this.structures.children[i].children[upgradeIndex].health != 1){
					this.structures.children[i].children[upgradeIndex].health = -1;
					this.structures.children[i].children[upgradeIndex].y += 2;
				}else{
					this.structures.children[i].children[upgradeIndex].health = 0;
				}
			}else{
				this.structures.children[i].children[upgradeIndex].kill();
				this.structures.children[i].children[upgradeIndex].y = this.structures.children[i].y-150;
			}
		}
	},
	
	shootCannonball: function(tower,enemy){
		//Revive
		tower.children[0].revive();
		tower.children[0].x = 0;
		tower.children[0].y = 0;
		
		//Adjust health to simulate cooldown
		tower.children[0].health = 0;
		
		//Follow closest enemy
		tempTween = this.add.tween(tower.children[0]).to({x:(enemy.x-tower.x),y:(enemy.y-tower.y)},200,Phaser.Easing.Linear.None,true,100,0,false);
		tempTween.onComplete.addOnce(function(cannonball){
			cannonball.kill();
			enemy.damage(25);
		},this,tower.children[0]);
		this.time.events.add(2200/(tower.frame+1), function(){
			//Reset health to refire
			tower.children[0].health = -1;
		},this);
	},
	
	getClosestEnemyInRange: function(tower){
		closest = null;
		smallestDistance = 999999999;
		for(var i = 0;i<this.enemies.children.length;i++){
			dx = tower.x - this.enemies.children[i].x;
			dy = tower.y - this.enemies.children[i].y;
			dist = Math.sqrt((dx*dx)+(dy*dy));
			if(dist < smallestDistance && dist < 200){
				smallestDistance = dist;
				closest = this.enemies.children[i];
			}
		}
		return closest;
	},
	
	wallUpdate: function() {
		if(this.wallHP <= 0){
			this.wallGreen.scale.x = 0;
		}else{
			this.wallGreen.scale.x = .15 * (this.wallHP/(50 * (this.wall1.frame+1)));
		}
		if(this.wallHP <= 0){
			this.gameDefeat();
		}
	},
		
	orientationUpdate: function() {
		//If window scale hits a certain ratio to switch from portrait to landscape or vice versa, change orientation and adjust sprites accordingly
		if((window.innerWidth/window.innerHeight) <= (3/4) && this.landscape){
			this.landscape = false;
			this.camera.setPosition(100,0);
			this.scale.setGameSize(600,900);
			//Rearrange sprites
			for(i=0;i<4;i++){
				this.menu.children[i].x = 220 + (120 * i);
				this.menu.children[i].y = 835;
				this.menu.children[i+4].x = 220 + (120 * i);
				this.menu.children[i+4].y = 835;
			}
			this.goldUI.x = 250;
			this.goldUI.y = 760;
			this.wallUI.x = 450;
			this.wallUI.y = 100;
			this.wallGreen.x = 450;
			this.wallGreen.y = 100;
			this.wallRed.x = 450;
			this.wallRed.y = 100;
			this.gameOverBox.y = 450;
			this.gameOverText.y = 330;
			this.timeUpText.y = 330;
			this.closeButton.x += 100;
			this.tryAgain.y = 500;
			this.getApp.y = 600;
		}else if((window.innerWidth/window.innerHeight) > (3/4) && !this.landscape){
			this.camera.setPosition(0,0);
			this.landscape = true;
			this.scale.setGameSize(800,600);
			//Rearrange sprites
			for(i=0;i<4;i++){
				this.menu.children[i].x = 75;
				this.menu.children[i].y = 220 + (105 * i);
				this.menu.children[i+4].x = 75;
				this.menu.children[i+4].y = 220 + (105 * i);
			}
			this.goldUI.x = 100;
			this.goldUI.y = 100;
			this.installNow.x = 400;
			this.wallUI.x = 550;
			this.wallUI.y = 50;
			this.wallGreen.x = 550;
			this.wallGreen.y = 50;
			this.wallRed.x = 550;
			this.wallRed.y = 50;
			this.gameOverBox.y = 300;
			this.gameOverText.y = 180;
			this.timeUpText.y = 180;
			this.closeButton.x = 150;
			this.tryAgain.y = 350;
			this.getApp.y = 450;
		}
	},
	
	gameDefeat: function() {
		this.lost = true;
		this.add.tween(this.defeat.scale).to({x:1,y:1},500,Phaser.Easing.Linear.None,true,0,0,false);
		this.time.events.add(1000, function(){	
			this.gameOver();
		},this);
		
	},
	
	gameOver: function() {
		//Halt all movement and animations
		this.gameEnded = true;
		for(var i = this.enemies.children.length-1;i>=0;i--){
			this.enemies.children[i].animations.stop();
		}
		for(var i = this.structures.children.length-1;i>=0;i--){
			if(this.structures.children[i].children[0] != null){
				this.structures.children[i].children[0].animations.stop();
			}
		}
		
		
		//Dim screen
		this.add.tween(this.blackScreen).to({alpha:.6}, 500, Phaser.Easing.Linear.None, true, 0,0,false);
		
		this.time.events.add(1500, function(lost,gameOver,got,tut,getApp,tryAgain) {
			this.time.events.destroy();
			//Game Over screen pop up
			gameOver.revive();
			
			//Spawn text depending on loss or time up
			if(lost){
				got.revive();
			}else{
				tut.revive();
			}
			//Spawn buttons (do not include replay button if already replayed)
			getApp.revive();
		
		
			if(!this.played){
				tryAgain.revive();
			}
		},this,this.lost,this.gameOverBox,this.gameOverText,this.timeUpText,this.getApp,this.tryAgain);
	},
	
	restart: function() {
		//Remove existing enemies
		this.enemies.destroy(true,true);
		this.enemiesSpawned = 0;
		//this.enemyLife.destroy(true,true);
		
		//Remove existing placed structures, replace plots
		this.structures.destroy(true,true);
		for(var i=0;i<11;i++){
			this.plots.children[i].health = 2;
			this.plots.children[i].alpha = 1;
		}
		
		//Remove Game over UI
		this.getApp.kill();
		this.tryAgain.kill();
		this.gameOverBox.kill();
		this.defeat.scale.setTo(0);
		this.gameOverText.kill();
		this.timeUpText.kill();
		
		//Reset UI Properties
		this.gold = 10000;
		this.wallHP = 50;
		this.wall1.frame = 0;
		this.wall2.frame = 0;
		this.wall3.frame = 0;
		this.menu.children.health = 50;
		this.blackScreen.alpha = 0;
		this.gameEnded = false;
		this.lost = false;
		
		
		this.enemyTimer = this.time.events.loop(3000, function() {
			this.enemySpawn();
		},this);
		this.time.events.start();
	},
	
	render: function() {
	}
};
