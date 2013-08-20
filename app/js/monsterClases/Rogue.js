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

/**
 * Return a new rogue monster.
 * PARAM:
 * isHuman: If set to true, then a human sprite will be used.
 */
var Rogue = function(isHuman){
	
	// Load the sprite.
	var image = new Image();
	if(isHuman){
		image.src = 'img/sprites/thief.png';
	} else{
		image.src = 'img/sprites/beast.png';
	}
	
	
	// Private stuff.
	var hitPoints = 4;
	
	/**
	 * Monster's actions array.
	 * Each action has a name, a target represented by a matrix of
	 * possible target tiles surrounding the monster, and the function
	 * unleashed by the action (this function recieves the game board and the targeted cell).
	 */
	var thisMonster = this;
	var actions = {
		move: {target: [[0,0,1,0,0],
						[0,1,1,1,0],
						[1,1,0,1,1],
						[0,1,1,1,0],
						[0,0,1,0,0]], 
		action: function(board, cell){
			thisMonster.move(board, cell);
		}}
	};
	
	// Public stuff.
	this.getImage = function(){
		return image;
	};
	
	this.getActions = function(){
		return actions;
	};
};

Rogue.prototype = new Monster();