"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const photoSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    imagePath: String,
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Photo'
    }
});
exports.default = mongoose_1.model('Photo', photoSchema);
//# sourceMappingURL=photo.js.map