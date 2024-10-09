// Do not add comma when converting arrays to strings
Array.prototype.toString = function () { return this.join(''); }