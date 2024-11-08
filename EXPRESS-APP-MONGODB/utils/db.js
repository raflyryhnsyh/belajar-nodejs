const mongoose = require('mongoose');

// konfigurasi
const url = 'mongodb://127.0.0.1:27017/wpu';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});