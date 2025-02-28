// // import express from 'express';

// const express = require('express');
// const app = express();

// app.use(express.static('public'));

// // res.redirect('/data');

// app.get('*', (req, res) => {
//     res.send('<h1>Hello World</h1>');
// });

// app.put('/store/:id', (req, res) => {
//     res.send(200, {id: req.params.id});
// });

// // special if case middleware
// function noBobs(req, res, next) {
//     /bob/.test(req.path) ? res.send(403, 'No Bobs allowed') : next();
    
// }
// app.get("*", noBobs, (req, res) => {
//     res.send('<h1>Hello World</h1>');
// });

// app.get('/data', (req, res) => {
//     res.send({data: 'data'});
// });

// app.put('*', (req, res) => {
//     res.send(200, '<h1>Hello World PUT</h1>');
// });

// app.use('*', (req, res) => {
//     res.status(404).send({error: 'Not found'});
// });

// app.listen(3000)