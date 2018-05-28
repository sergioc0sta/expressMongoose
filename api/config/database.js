const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://user:pwd@ds119110.mlab.com:19110/database') 

