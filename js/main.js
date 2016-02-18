window.onload = function () {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    

    
    function preload() {
        game.load.spritesheet('dude', 'assets/customSprite.png', 30, 61);
        game.load.image('ground', 'assets/platform.png');
        game.load.audio('cheer', 'assets/cheering.wav');
    }

//global variables
var player;
var platforms;
var cursors;
var sound;
    
    function create(){
        //enable physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //platforms
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height-32, 'ground');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;
        var ground2 = platforms.create(600, game.world.height-150, 'ground');
        ground2.scale.setTo(0.5, 5);
        ground2.body.immovable = true;
        var ground3 = platforms.create(300, game.world.height-64, 'ground');
        ground3.scale.setTo(.25, 1);
        
        //player
        player = game.add.sprite(32, game.world.height-150, 'dude');
        game.physics.arcade.enable(player);
        player.body.gravity.y = 150;
        player.body.collideWorldBounds = true;
        //walk left
        player.animations.add('left', [3, 2, 1, 0], 10, true);
        //walk right
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //sound
        sound = game.add.audio('cheer');
        
        //add controls
        cursors = game.input.keyboard.createCursorKeys();
    } 
    
    function update() {
        //collide player with platform
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(platforms, platforms);
        
        player.body.velocity.x = 0;
        
        if(cursors.left.isDown){
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if(cursors.right.isDown){
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else {
            player.animations.stop();
            player.frame = 4;
        }
        
        if (cursors.up.isDown && player.body.touching.down){
            player.body.velocity.y = -175;
            sound.play();
        }
    }
};
