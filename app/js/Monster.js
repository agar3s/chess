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
 * Return a new monster.
 * PARAM:
 * sprite: Monster's image source.
 * hp: Monster's hitpoints.
 * movement: Monster's movement matrix, the matrix must be a squared matrix
 * 	and its dimesion must be an odd number greater than 3.
 */
var Monster = function(sprite, hp, movement){
	// Make sure that positive hitpoints where given.
	if(hp <= 0 || !movement){
		return null;
	}
	
	// Load the sprite.
	var image = new Image();
	image.src = sprite;
	
	// Private stuff.
	var position = {x: 0, y: 0};
	var hitPoints = hp;
	
	/**
	 * Monster's actions array.
	 * Each action has a name, a target represented by a matrix of
	 * possible target tiles surrounding the monster, and the function
	 * unleashed by the action (this function recieves the game board and the targeted cell).
	 */
	var thisMonster = this;
	var actions = {move: {target: movement, action: function(board, cell){
		thisMonster.move(board, cell);
	}}};
	
	// Public stuff.
	this.highlighted = false;
	
	this.getImage = function(){
		return image;
	};
	
	this.getPosition = function(){
		return position;
	};
	
	this.setPosition = function(x, y){
		position = {x: x, y: y};
	};
	
	this.getActions = function(){
		return actions;
	};
};

Monster.prototype = {
	constructor: Monster,
	
	/**
	 * Move to the given cell.
	 */
	move: function(board, cell){
		if(!cell.content){
			var currentPosition = this.getPosition();
			var currentCell = board.getCells()[currentPosition.x][currentPosition.y];
			currentCell.content = null;
			
			var targetPosition = cell.tile.getPosition();
			this.setPosition(targetPosition.x, targetPosition.y);
			cell.content = this;
			
			// Inform the server.
			sendAction(currentPosition, targetPosition, 'move');
		}
	},
	
	/**
	 * Draw the monster.
	 */
	draw: function(context){
		var position = this.getPosition();
		var image = this.getImage()
		var imgHeight = image.height;
		var imgWidth = image.width;
		
		var maxDimension = SPRITE_MAX_DIMENSION;
		if(this.highlighted){
			maxDimension = SPRITE_HIGHLIGHTED_DIMENSION;
		}
		
		if(imgHeight > imgWidth){
			imgHeight = maxDimension;
			imgWidth = (maxDimension / imgHeight) * imgWidth;
		} else{
			imgHeight = (maxDimension / imgWidth) * imgHeight;
			imgWidth = maxDimension;
		}
		
		var spriteOffset = (maxDimension - CELL_WIDTH) / 2;
		context.drawImage(image, (position.x * CELL_WIDTH) - spriteOffset, (position.y * CELL_WIDTH) - spriteOffset, imgWidth, imgHeight);
	}
};