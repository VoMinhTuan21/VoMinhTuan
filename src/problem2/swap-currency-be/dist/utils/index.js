"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
exports.Utils = {
    findTheLatest: (array) => {
        array.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });
        return array[0];
    },
};
//# sourceMappingURL=index.js.map