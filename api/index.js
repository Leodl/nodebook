/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:00:48
 * @version $Id$
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express();

app.use(express.static(path.join(__dirname,'../', 'static','book')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)



app.listen(8012,function(){
	console.log('running...')
})
