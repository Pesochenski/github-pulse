"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getData = require("./api/dataQuery");
const processingData = require("./data/dataProcessing");
/**
 * Async function
 * @param {string} userName Github username
 */
// module.exports = 
module.exports = function getPinned(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const pinned = [];
        const res = yield getData.getHTML(userName);
        if (res.status === 200) {
            const repoNames = processingData.createRepoNames(res.data);
            for (let i = 0; i < repoNames.length; i++) {
                yield getData.getRepo(userName, repoNames[i]).then((item) => pinned.push(item.data));
            }
        }
        else {
            return new Error("Connection error");
        }
        return pinned;
    });
};
// getPinned("Pesochenski").then((pinned) => console.log(pinned));
