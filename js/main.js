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

        this._initGame();
    }

    /**
     * _initGame - Allocates disks on the first tower
     * @private
     * @returns {type} Description
     */
    _initGame() {
        [...this._towers].forEach(tower => tower.html = "");

        for (let i=this._numberOfDisks-1; i>=0; i--) {
            this._addDisk(this._towers[0], i);
        }

        document.getElementById("gameContainer").addEventListener("click", this._makeMove.bind(this));
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
        if (event.target.classList.contains("tower")) {
            let tower = event.target;
            let disks = tower.getElementsByClassName("disk");
            let topDisk = tower.querySelector(":last-child");
            let topDiskValue = topDisk ? topDisk.getAttribute("value") : null;
            let holdingDisk = document.querySelector("#gameContainer .hold");

            if (holdingDisk) {
                if (topDiskValue === this._holding) {
                    holdingDisk.classList.remove("hold");
                } else if (topDiskValue === null || topDiskValue > this._holding) {
                    holdingDisk.parentElement.removeChild(holdingDisk);
                    this._addDisk(tower, this._holding);
                }
            } else if (topDisk) {
                topDisk.classList.add("hold");
                this._holding = topDiskValue;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const game = new HanoiTower(3);
});
