/**
 * HanoiTower is the class that handles the game initialization and the game flow
 */
class HanoiTower {
    /**
     * Class constructor - triggers game initialization
     *
     * @param {String} level
     * @param {function} callback function to execute on game completion
     * @returns {type} Description
     */
    constructor(level, onGameCompleted) {
        level = level.toString();

		this._level = Object.keys(GAME_LEVELS).indexOf(level) > -1 ? level : "0";
        this._onGameCompleted = onGameCompleted;
        this._numberOfDisks = DISKS_NUM_BY_LEVEL[this._level];
        this._holding = null;
        this._towers = document.getElementsByClassName("tower");

        this._startTime = null;
		this._stopTime = null;
		this._moves = 0;
        this._minMoves = Math.pow(2, this._numberOfDisks) - 1;
		this._mistakeRatingEffect = 100 / this._minMoves;
		this._starRating = 100;

        this._clockId;
    }

    /**
     * _initGame - Allocates disks on the first tower
     *
     * @returns {type} Description
     */
    initGame() {
        [...this._towers].forEach(tower => tower.innerHTML = "");

        for (let i=this._numberOfDisks-1; i>=0; i--) {
            this._addDisk(this._towers[0], i);
        }

        this._towers[0].querySelector(":last-child").classList.add("active");

        document.getElementById("gameContainer").addEventListener(
            "click",
            this._makeMove.bind(this)
        );

        this._startTime = new Date();

        // update UI
        clearInterval(this._clockId);
    	this._clockId = setInterval(() => {
    		document.getElementById("gameTimeElapsed").innerText = this.getElapsedTime();
    	}, 1000);

    	document.getElementById("gameLevelDescription").innerText = `Level ${GAME_LEVELS[this._level]}`;
    }

	/**
	* Method to get the time passed from the start of the game.
	* If the game is completed will always return the total time of the game.
	* NOTE: this method returns a nicely formatted string as "(dd::)hh:mm:ss"
	*
	* @returns {String}
	*/
	getElapsedTime() {
		let endTime = this._stopTime ? this._stopTime : new Date();
		let msElapsed = endTime - this._startTime;
		let formattedElapsedTime = formatTimeToString(msElapsed);

		return formattedElapsedTime;
	}

    /**
    * Method to get the start rating of the game.
    * NOTE: the star rating is a Percentage calculated basing on the number
    * of wrong moves and the maximum number of wrong moves allowed.
    * Whenever the player exceeds the number of available wrong moves,
    * the star rating will start to decrease
    *
    * @returns {Number} Percentage of star rating
    */
    getStarRating() {
        return this._starRating;
    }

    /**
     * _addDisk - Creates a disk DOM element and appends it to a tower
     *
     * @param {type} tower Description
     * @param {type} id    Description
     * @private
     * @returns {type} Description
     */
    _addDisk(tower, id) {
        let disk = document.createElement("li");

        disk.classList.add("disk", `disk-${id}`);
        disk.setAttribute("value", id);

        tower.appendChild(disk);
    }

    /**
     * _makeMove - Select a disk or move it to a different tower
     *
     * @param {type} event Description
     * @private
     * @returns {type} Description
     */
    _makeMove(event) {
        if (event.target.classList.contains("disk")) {
            let topDisk = event.target;
            let tower = topDisk.parentElement;
            let towerTopDisk = tower.querySelector(":last-child");
            let topDiskValue = topDisk.getAttribute("value");
            let holdingDisk = document.querySelector("#gameContainer .hold");

            // prevent more disks to be selected at the same time and
            // prevent lower disks to be selected in a tower
            if (!holdingDisk && topDisk === towerTopDisk) {
                topDisk.classList.add("hold");
                this._disableAllDisks();
                this._holding = topDiskValue;
            }
        } else if (event.target.classList.contains("tower")) {
            let tower = event.target;
            let towerID = parseInt(tower.getAttribute("value"));
            let disks = tower.getElementsByClassName("disk");
            let topDisk = tower.querySelector(":last-child");
            let topDiskValue = topDisk ? topDisk.getAttribute("value") : null;
            let holdingDisk = document.querySelector("#gameContainer .hold");

            if (holdingDisk) {
                if (topDiskValue === this._holding) {
                    holdingDisk.classList.remove("hold");
                    this._restoreDisksDefaultBehavior();
                } else if (topDiskValue === null || topDiskValue > this._holding) {
                    holdingDisk.parentElement.removeChild(holdingDisk);
                    this._addDisk(tower, this._holding);
                    this._restoreDisksDefaultBehavior();
                }

                this._checkGameComplete(tower);
            }
        }
    }

    /**
     * _checkGameComplete - Verifies if all disks have been moved to a different
     * tower from the original one. If not, updates the moves & rating.
     *
     * @param {type} tower Description
     * @private
     * @returns {type} Description
     */
    _checkGameComplete(tower) {
        let towerID = parseInt(tower.getAttribute("value"));
        let towerDisks = tower.getElementsByClassName("disk").length;

        if (towerID && (towerDisks === this._numberOfDisks)) {
            setTimeout(this._completeGame.bind(this), 500);
        } else {
            this._moves++;

            if (this._moves > this._minMoves) {
                this._starRating =	100 - ((this._moves - this._minMoves) * this._mistakeRatingEffect);
            }

            // update UI
            document.getElementById("gameMoves").innerText = `${this._moves} moves`;
        }
    }

    /**
     * _completeGame - Shows a game completed dialog to the player
     *
     * @returns {type} Description
     */
    _completeGame() {
        this._stopTime = new Date();

        setTimeout(this._onGameCompleted.bind(this), 0);
    }

    /**
     * _disableAllDisks - Changes the style to remove the pointer cursor from
     *  all disks
     * @private
     * @returns {type} Description
     */
    _disableAllDisks() {
        [...document.getElementsByClassName("disk")].forEach(
            disk => disk.style.cursor = "default"
        );
    }

    /**
     * _restoreDisksDefaultBehavior - Restores the original style of disks
     * @private
     * @returns {type} Description
     */
    _restoreDisksDefaultBehavior() {
        [...document.getElementsByClassName("disk")].forEach(
            disk => disk.style.cursor = null
        );
    }
}
