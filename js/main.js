/**
 * HanoiTower is the class that handles the game initialization and the game flow
 */
class HanoiTower {
    /**
     * Class constructor - triggers game initialization
     *
     * @param {type} numberOfDisks Description
     * @returns {type} Description
     */
    constructor(numberOfDisks) {
        this._numberOfDisks = numberOfDisks || 3;
        this._holding = null;
        this._towers = document.getElementsByClassName("tower");
    }

    /**
     * _initGame - Allocates disks on the first tower
     *
     * @returns {type} Description
     */
    initGame() {
        [...this._towers].forEach(tower => tower.html = "");

        for (let i=this._numberOfDisks-1; i>=0; i--) {
            this._addDisk(this._towers[0], i);
        }

        this._towers[0].querySelector(":last-child").classList.add("active");

        document.getElementById("gameContainer").addEventListener(
            "click",
            this._makeMove.bind(this)
        );
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

            if (holdingDisk && towerID) {
                if (topDiskValue === this._holding) {
                    holdingDisk.classList.remove("hold");
                    this._restoreDisksDefaultBehavior();
                } else if (topDiskValue === null || topDiskValue > this._holding) {
                    holdingDisk.parentElement.removeChild(holdingDisk);
                    this._addDisk(tower, this._holding);
                    this._restoreDisksDefaultBehavior();
                }
            }

            this._checkGameComplete(tower);
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
        let gameCompleted = false;

        if (towerID && (towerDisks === this._numberOfDisks)) {
            gameCompleted = true;
            setTimeout(this._completeGame.bind(this), 500);
        } else {
            // TODO: updates the moves & rating
        }

        return gameCompleted;
    }

    /**
     * _completeGame - Shows a game completed dialog to the player
     *
     * @returns {type} Description
     */
    _completeGame() {
        alert("game completed");
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

document.addEventListener('DOMContentLoaded', (event) => {
    const game = new HanoiTower(3);

    game.initGame();
});
