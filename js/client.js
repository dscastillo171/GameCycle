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

// Carga total del documento.
window.onload = function(){
	// Constantes.
	var TILE_WIDTH = 100;
	var MAP_SIZE = 2;
	var FPS = 25;

	// Propiedades.
	var context, canvas;
	var avatarState = 'running';
	var movementCounter = 1;
	var avatarStill = [{x: 6, y: 0}, {x: 7,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}, {x: 0,y: 1}, {x: 6,y: 1}];
	var avatarRunning = [{x: 0, y: 4}, {x: 1,y: 4}, {x: 2,y: 4}, {x: 3,y: 4}, {x: 4,y: 4}, {x: 5,y: 4}, {x: 6,y: 4}, {x: 7,y: 4}, {x: 0,y: 5}, {x: 1,y: 5}, {x: 2,y: 5}, {x: 1,y: 5}, {x: 0,y: 5}, {x: 7,y: 4}, {x: 6,y: 4}];

	// Imagenes sprites.
	var grass = new Image();
	var avatar = new Image();

	// Configurar el canvas y el contexto de diujo.
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

		// Generar el contexto de dibujo.
		context = canvas.getContext('2d');
	};

	// Configurar los controles.
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

	// Borrar el canvas.
	var clearCanvas = function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	// Dibujar el mapa.
	var drawMap = function(){
		var SPRITE_LENGTH = 32;
		for(var i = 0; i < MAP_SIZE; i++){
			for(var j = 0; j < MAP_SIZE; j++){
				context.drawImage(grass, ((j + i) % 3) * SPRITE_LENGTH, 5 * SPRITE_LENGTH, SPRITE_LENGTH, SPRITE_LENGTH,
					i * TILE_WIDTH, j * TILE_WIDTH, TILE_WIDTH, TILE_WIDTH);
			}
		}
	};

	// Dibujar el avatar.
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

	// Actualizar las variables.
	var update = function(){
		if(avatarState == 'still'){
			movementCounter = movementCounter >= avatarStill.length - 1? -50: movementCounter + 1;	
		} else{
			movementCounter = movementCounter >= avatarRunning.length - 1? 0: movementCounter + 1;
		}
	};
	
	// Iniciar el loop del juego.
	var startGame = function(){
		setUp();
		drawAvatar();
	};

	// Cargar los sprites.
	grass.src = 'sprites/grass.png';
	avatar.onload = startGame;
	avatar.src = 'sprites/megaman.png';
};