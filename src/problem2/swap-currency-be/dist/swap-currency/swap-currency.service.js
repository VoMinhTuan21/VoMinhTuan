"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapCurrencyService = void 0;
const common_1 = require("@nestjs/common");
const prices_1 = require("./model/prices");
const utils_1 = require("../utils");
let SwapCurrencyService = class SwapCurrencyService {
    getAll() {
        return prices_1.prices.map(coin => coin.currency);
    }
    exchange(data) {
        const from = utils_1.Utils.findTheLatest(prices_1.prices.filter(item => item.currency === data.from));
        const to = utils_1.Utils.findTheLatest(prices_1.prices.filter(item => item.currency === data.to));
        if (!from) {
            return;
        }
        if (!to) {
            return;
        }
        return (data.amount * to.price / from.price).toFixed(4);
    }
};
exports.SwapCurrencyService = SwapCurrencyService;
exports.SwapCurrencyService = SwapCurrencyService = __decorate([
    (0, common_1.Injectable)()
], SwapCurrencyService);
//# sourceMappingURL=swap-currency.service.js.map