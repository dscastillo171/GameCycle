/*
The MIT License (MIT)

Copyright (c) 2013 Chess Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Document fully loaded.
window.onload = function(){
	// Constants.
	var TILE_WIDTH = 100;
	var MAP_SIZE = 2;
	var FPS = 25;

	// Properties.
	var context, canvas;
	var avatarState = 'running';
	var movementCounter = 1;
	var avatarStill = [{x: 5, y: 0}, {x: 7,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}, {x: 0,y: 1}, {x: 6,y: 1}];
	var avatarRunning = [{x: 0, y: 4}, {x: 1,y: 4}, {x: 2,y: 4}, {x: 3,y: 4}, {x: 4,y: 4}, {x: 5,y: 4}, {x: 6,y: 4}, {x: 7,y: 4}, {x: 0,y: 5}, {x: 1,y: 5}, {x: 2,y: 5}, {x: 1,y: 5}, {x: 0,y: 5}, {x: 7,y: 4}, {x: 6,y: 4}];

	// Image sprites.
	var grass = new Image();
	grass.src = 'sprites/grass.png';
	var avatar = new Image();
	avatar.src = 'sprites/megaman.png';

	// Setup the canvas & drawing context.
	var setUp = function(){
		var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
		var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
		canvas = document.getElementById('GameCanvas');
		canvas.width = MAP_SIZE * TILE_WIDTH;
		canvas.height = MAP_SIZE * TILE_WIDTH;
		var left = (windowWidth - canvas.width) / 2;
		left = left < 0? 0: left;
		canvas.style.left = left + 'px';
		var top = (windowHeight - canvas.height) / 2;
		top = top < 0? 0: top;
		canvas.style.top = top + 'px';
		context = canvas.getContext('2d');
	};

	// Setup the controls.
	var controls = function(){
		document.onkeypress = function (e){
		    e = e || window.event;
		    if(e.keyCode === 32){
		    	if(avatarState == 'still'){
		    		avatarState = 'running';
		    		movementCounter = 0;
		    	} else{
		    		avatarState = 'still';
		    		movementCounter = -25;
		    	}
		    }
		};
	};

	// Clear the canvas.
	var clearCanvas = function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	// Draw the map.
	var drawMap = function(){
		var SPRITE_LENGTH = 32;
		for(var i = 0; i < MAP_SIZE; i++){
			for(var j = 0; j < MAP_SIZE; j++){
				context.drawImage(grass, ((j + i) % 3) * SPRITE_LENGTH, 5 * SPRITE_LENGTH, SPRITE_LENGTH, SPRITE_LENGTH,
					i * TILE_WIDTH, j * TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
			}
		}
	};

	// Draw the avatar.
	var drawAvatar = function(){
		var SPRITE_LENGTH = 50;
		var sprite;
		if(avatarState == 'still'){
			sprite = avatarStill[movementCounter > 0? movementCounter: 0];
		} else{
			sprite = avatarRunning[movementCounter > 0? movementCounter: 0];
		}
		context.drawImage(avatar, sprite.x * SPRITE_LENGTH, sprite.y * SPRITE_LENGTH, SPRITE_LENGTH, SPRITE_LENGTH,
			0, 0, TILE_WIDTH * 2, TILE_WIDTH * 2);
	};

	// Update variables.
	var update = function(){
		if(avatarState == 'still'){
			movementCounter = movementCounter >= avatarStill.length - 1? -50: movementCounter + 1;	
		} else{
			movementCounter = movementCounter >= avatarRunning.length - 1? 0: movementCounter + 1;
		}
	};
	
	// Start game loop.
	setUp();
	controls();
	setInterval(function(){
		update();
		clearCanvas();
		drawMap();
		drawAvatar();
	}, 1000 / FPS);
};
