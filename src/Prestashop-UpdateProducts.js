"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var xml2js = require("xml2js");
// Define la base URL para tu instancia de PrestaShop
var baseURL = 'https://vivescortada.pre-testing.com/api';
// Define la WS key para la autenticación
var wsKey = 'VPN4QJCW4C9MBP45SLPH8BF7UJTSA3F8';
// Define el ID del producto que se va a actualizar
var customerId = 23449;
// Define la configuración de la solicitud para la petición GET
var getConfig = {
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Basic ".concat(Buffer.from("".concat(wsKey, ":")).toString('base64'))
    }
};
// Realiza la solicitud GET para obtener los datos del producto existente
axios_1.default.get("/customers/".concat(customerId), getConfig)
    .then(function (response) {
    xml2js.parseString(response.data, function (err, result) {
        if (err) {
            console.error('Error al analizar la respuesta XML:', err);
            return;
        }
        var json = JSON.stringify(result);
        // console.log(json);
        // Obtiene los datos del producto existente
        var newcustomer = {
            firstname: 'HAVETTE',
            lastname: 'LUDIVINE'
        };
        var existingCustomerData = JSON.parse(json);
        existingCustomerData.prestashop.customer[0] = __assign(__assign({}, existingCustomerData.prestashop.customer[0]), newcustomer);
        // Actualiza los datos del Cliente
        var updatedPCustomerData = __assign({}, existingCustomerData);
        var opciones = {
            cdata: true,
            headless: true,
        };
        var builder = new xml2js.Builder({ cdata: true });
        var xml = builder.buildObject(updatedPCustomerData);
        console.log(xml);
        // Define la configuración de la solicitud para la petición PUT
        var putConfig = {
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/xml',
                'Authorization': "Basic ".concat(Buffer.from("".concat(wsKey, ":")).toString('base64'))
            }
        };
        // Realiza la solicitud PUT para actualizar los datos del producto
        axios_1.default.put("/customers/".concat(customerId), xml, putConfig)
            .then(function (response) {
            console.log('Producto actualizado exitosamente:');
        })
            .catch(function (error) {
            console.error('Error al actualizar el producto:', error);
        });
    });
})
    .catch(function (error) {
    console.error('Error al obtener los datos del producto existente:', error);
});
