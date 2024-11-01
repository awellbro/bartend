const Drinks = require('..models/drinks');

const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Drink list');
});

exports.drinks_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: Drink Detail: ${req.params.id}`);
});

exports.drinks_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: drink create GET');
});

exports.drinks_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drink create POST');
});

exports.drinks_delete_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks delete GET');
});

exports.drinks_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks delete POST');
});

exports.drinks_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update GET');
});

exports.drink_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Here: Drinks update POST')
})