"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCurrency = IsCurrency;
const class_validator_1 = require("class-validator");
const prices_1 = require("../swap-currency/model/prices");
function IsCurrency(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isCurrency',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return typeof value === 'string' && Boolean(prices_1.prices.find(item => item.currency === value));
                },
            },
        });
    };
}
//# sourceMappingURL=is-currency.js.map