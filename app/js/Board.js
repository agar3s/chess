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
 * Return a board object.
 * PARAM: Canvas obj, the canvas used to draw the game.
 */
var Board = function(obj){
	// Make sure obj is a canvas element.
	if(typeof(obj) === 'undefined' || !(obj.nodeName && obj.nodeName.toLowerCase() === 'canvas')){
		return null;
	}

	/**
	 * Canvas
	 */
	var canvas = obj;
	canvas.width = CELL_WIDTH * CELLS_PER_LINE;
	canvas.height = CELL_WIDTH * CELLS_PER_LINE;
	
	/**
	 * Initialize the board cells.
	 */
	var cells = [];
	for(var i = 0; i < CELLS_PER_LINE; i++){
		cells.push([]);
		for(var j = 0; j < CELLS_PER_LINE; j++){
			cells[i].push({tile: new Tile(i, j), content: null});
		}
	}
	
	// Public stuff.
	
	/**
	 * Return the game's context.
	 */
	this.getContext = function(){
		return canvas.getContext('2d');
	};
	
	/** 
	 * Return the array of cells.
	 */
	this.getCells = function(){
		return cells;
	};
	
	// Actions
	var thisBoard = this;
	var setCanvasActions = function(){
		var highlightedContent = null;
		var targetCells = null;
		var pendingAction = null;
		var selectedContent = null;
		
		// Return the tile associated with the given event. 
		var getCellForMouseEvent = function(event){
			var xCoord, yCoord;
			if (event.pageX || event.pageY){
				xCoord = event.pageX - canvas.offsetLeft;
				yCoord = event.pageY - canvas.offsetTop;
			}
			else{ 
				xCoord = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - canvas.offsetLeft; 
				yCoord = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop; 
			}
			
			var x = parseInt(xCoord / CELL_WIDTH);
			var y = parseInt(yCoord / CELL_WIDTH);
			
			return thisBoard.getCells()[x][y];
		};
		
		/**
		 * Return the list of cells associated with the given matrix.
		 * PARAM:
		 * matrix example:
		 * [[0,1,0],
         *  [1,x,1],
         *  [0,1,0]]
		 * 1: A posible cell.
		 * 0: Not a cell here.
		 * x: The center cell.
		 * If the highlighted flag is set, then the posible cells will be highlighted.
		 */
		var getCellsForMatrix = function(matrix, centerCell, highlight){
			var cells = thisBoard.getCells();
			var selectedCells = [];
			var radius = Math.floor(matrix.length/2);
			var centerPosistion = centerCell.tile.getPosition();
			
			for(var i = 0; i < matrix.length; i++){
				for(var j = 0; j < matrix[i].length; j++){
					if(matrix[i][j]){
						var x = centerPosistion.x + j - radius;
						var y = centerPosistion.y + i - radius;
						if(cells[x] && cells[x][y]){
							var blocked = false;
							// Check line of sight.
							for(var k = 1; k < Math.abs(x - centerPosistion.x); k++){
								if(x > centerPosistion.x){
									if(cells[x - k] && cells[x - k][y] && cells[x - k][y].content){
										blocked = true;
										break;
									}
								} else if(x < centerPosistion.x){
									if(cells[x + k] && cells[x + k][y] && cells[x + k][y].content){
										blocked = true;
										break;
									}
								}
							}
							for(k = 1; k < Math.abs(y - centerPosistion.y); k++){
								if(y > centerPosistion.y){
									if(cells[x] && cells[x][y - k] && cells[x][y - k].content){
										blocked = true;
										break;
									}
								} else if(y < centerPosistion.y){
									if(cells[x] && cells[x][y + k] && cells[x][y + k].content){
										blocked = true;
										break;
									}
								}
							}
							
							var cell = cells[x][y];
							if(!blocked && !cell.content){
								cell.tile.highlighted = true;
								selectedCells.push(cell);
							}
						}
					}
				}
			}
			
			return selectedCells;
		};
		
		/**
		 * Mouse movement event.
		 */
		canvas.addEventListener('mousemove', function(event){
			var cell = getCellForMouseEvent(event);
			if(highlightedContent && highlightedContent !== selectedContent){
				highlightedContent.highlighted = false;
				highlightedContent = null;
			}
			if(cell.content){
				highlightedContent = cell.content;
				highlightedContent.highlighted = true;
			}
		});
		
		/**
		 * Mouse click
		 */
		canvas.addEventListener('click', function(e){
			var cell = getCellForMouseEvent(e);
			var cellIsHighlighted = cell.tile.highlighted;
			
			if(targetCells){
				for(var i = 0; i < targetCells.length; i++){
					targetCells[i].tile.highlighted = false;
				}
				targetCells = null;
			}
			
			if(selectedContent && !cellIsHighlighted){
				selectedContent.highlighted = false;
				selectedContent = null;
			}
			
			if(cellIsHighlighted && pendingAction){
				pendingAction.action(thisBoard, cell);
				selectedContent = null;
				pendingAction = null;
			} else if(cell.content){
				// For now a click will trigger the 'move' action.
				selectedContent = cell.content;
				selectedContent.highlighted = true;
				pendingAction = cell.content.getActions().move;
				targetCells = getCellsForMatrix(pendingAction.target, cell, true);
			}
		});
	}();
};

Board.prototype = {
	constructor: Board,
	
	/**
	 * Add a monster to the board.
	 */
	addMonster: function(monster, position){
		var cells = this.getCells();
		monster.position = {x:position.x, y:position.y};
		cells[position.x][position.y].content = monster;
	},
	
	/**
	 * Clear the canvas.
	 */
	clear: function(){
		this.getContext().clearRect(0, 0, CELL_WIDTH * CELLS_PER_LINE, CELL_WIDTH * CELLS_PER_LINE);
	},
	
	/**
	 * Draw the board's cells.
	 */
	drawCells: function(){
		var cells = this.getCells();
		var context = this.getContext();
		for(var i = 0; i < CELLS_PER_LINE; i++){
			for(var j = 0; j < CELLS_PER_LINE; j++){
				cells[i][j].tile.draw(context);
			}
		}
	},
	
	/**
	 * Draw the monsters.
	 */
	drawMonsters: function(){
		var cells = this.getCells();
		var context = this.getContext();
		for(var i = 0; i < CELLS_PER_LINE; i++){
			for(var j = 0; j < CELLS_PER_LINE; j++){
				if(cells[i][j].content){
					cells[i][j].content.draw(context);
				}
			}
		}
	},
	
	/**
	 * Draw the canvas at each passing frame.
	 */
	start: function(){
		var thisBoard = this;
		setInterval(function(){
			thisBoard.clear();
			thisBoard.drawCells();
			thisBoard.drawMonsters();
		}, 1000 / FPS);
	} 
};