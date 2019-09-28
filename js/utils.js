/**
 * getRandomNumber - Returns a random float number within min and max-1
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @returns {Number}
 */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * getRandomInt - Returns a random int number within min and max-1
 *
 * @param {Number} min
 * @param {Number} max
 *
 * @returns {Number}
 */
function getRandomInt(min, max) {
    return Math.floor(getRandomNumber(min, max));
}

/**
 * formatTimeToString - Returns a nicely formatted string to represent the time
 * passed in ms
 *
 * @param {Number} ms
 *
 * @returns {String} - "<n0>d <n1>m <n2>s"
 */
function formatTimeToString(ms) {
    let formattedTimeParts = [];
    let dayToMs = 24 * 60 * 60 * 1000;
    let hourToMs = 60 * 60 * 1000;
    let minuteToMs = 60 * 1000;
    let secondToMs = 1000;

    let days = Math.floor(ms / dayToMs);
    let hours = Math.floor((ms - (days * dayToMs)) / hourToMs);
    let minutes = Math.floor((ms - (hours * hourToMs)) / minuteToMs);
    let seconds = Math.floor((ms - (minutes * minuteToMs)) / secondToMs);

    if (days) { formattedTimeParts.push(`${days}d`); }
    if (hours || formattedTimeParts.length) { formattedTimeParts.push(`${hours}h`); }
    if (minutes || formattedTimeParts.length) { formattedTimeParts.push(`${minutes}m`); }
    if (seconds || formattedTimeParts.length) { formattedTimeParts.push(`${seconds}s`); }

    return formattedTimeParts.join(" ");
}
