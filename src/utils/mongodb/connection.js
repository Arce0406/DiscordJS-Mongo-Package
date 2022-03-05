// 引用 mongoose
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
    // 連線資料庫
    await mongoose.connect(process.env.MONGO_ATLAS_STR, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true })

    // 設定連線狀態
    const db = mongoose.connection;

    db.on('error', () => {
        console.log('mongodb error!')
    });

    db.once('open', () => {
        console.log('mongodb connected!')
    });

    // 匯出連線狀態設定
    module.exports = db
})();


