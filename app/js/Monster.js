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
 * Abstract class.
 */
var Monster = function(){
	// Subclasses must implement the following methods.
	
	/**
	 * Return the sprite image used by the monster.
	 */
	this.getImage = function(){
		// Overwrite
	};
	
	this.getActions = function(){
		// Overwrite
	};
};

Monster.prototype = {
	constructor: Monster,
	highlighted: false,
	
	/**
	 * Monster's position, given in cartesian coordinates (x,y).
	 */
	position: {x:0, y:0},
	
	/**
	 * Move to the given cell.
	 */
	move: function(board, cell){
		if(!cell.content){
			var currentPosition = this.position;
			var currentCell = board.getCells()[currentPosition.x][currentPosition.y];
			currentCell.content = null;
			
			var targetPosition = cell.tile.getPosition();
			this.position = {x:targetPosition.x, y:targetPosition.y};
			cell.content = this;
			
			// Inform the server.
			sendAction(currentPosition, targetPosition, 'move');
		}
	},
	
	/**
	 * Draw the monster.
	 */
	draw: function(context){
		var position = this.position;
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