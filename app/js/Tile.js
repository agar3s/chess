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
 * Reurn a board tile object.
 */
var Tile = function(x, y){
	// Make sure the given position is valid.
	if(x < 0 || x >= CELLS_PER_LINE || y < 0 || y >= CELLS_PER_LINE){
		return null;
	}

	// Private stuff.
	var position = {x: x, y: y};
	var contents = 0;
	
	// Public stuff.
	this.highlighted = false;
	
	this.getPosition = function(){
		return position;
	};
};

Tile.prototype = {
	constructor: Tile,
	
	/**
	 * Draw the tile.
	 * PARAM: The 2D context in which to draw the tile.
	 */
	draw: function(context){
		var position = this.getPosition();
		
		if(this.highlighted){
			context.fillStyle = CELL_HIGHLIGHTED_COLOR;
		} else if((position.x + position.y) % 2 === 0){
			context.fillStyle = CELL_BLACK_COLOR;
		}else{
			context.fillStyle = CELL_WHITE_COLOR;
		}
		context.fillRect(position.x * CELL_WIDTH, position.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
	}
};