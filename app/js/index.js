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
	
	var monsterKnight = new Knight(false);
	var humanKnight = new Knight(true);
	board.addMonster(monsterKnight, {x:1, y:2});
	board.addMonster(humanKnight, {x:6, y:5});
	
	var monsterRogue = new Rogue(false);
	var humanRogue = new Rogue(true);
	board.addMonster(monsterRogue, {x:3, y:0});
	board.addMonster(humanRogue, {x:4, y:7});
	
	var monsterArcher = new Archer(false);
	var humanArcher = new Archer(true);
	board.addMonster(monsterArcher, {x:2, y:1});
	board.addMonster(humanArcher, {x:5, y:6});
	
	var monsterMage = new Mage(false);
	var humanMage = new Mage(true);
	board.addMonster(monsterMage, {x:0, y:3});
	board.addMonster(humanMage, {x:7, y:4});
	
	board.start();
};