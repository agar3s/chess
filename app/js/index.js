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

// Constants.
var CELL_WIDTH = 80;
var CELLS_PER_LINE = 8;

var CELL_BLACK_COLOR = '#594E3F';
var CELL_WHITE_COLOR = '#E7DAAA'
var CELL_HIGHLIGHTED_COLOR = '#EF8222';

var SPRITE_MAX_DIMENSION = 100;
var SPRITE_HIGHLIGHTED_DIMENSION = 112;

/** Frames per second **/
var FPS = 24;

var start = function(){
	var board = new Board(document.getElementById('board'));
	
	// Add the monsters/
	var monster = new Monster('img/sprites/zombi.png', 5, [[0,1,0], [1,0,1],[0,1,0]]);
	var monster2 = new Monster('img/sprites/warrior.png', 5, [[0,0,0,1,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],
		[1,1,1,1,1,1,1],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0],[0,0,0,1,0,0,0]]);
	board.addMonster(monster, {x:1, y:1});
	board.addMonster(monster2, {x:5, y:4});
	
	board.start();
};