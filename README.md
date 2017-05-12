# DBWeb
using node.js express.js and mysql-db


Prerequisites

-	Node.js with Express.js : https://nodejs.org/en/
-	Clone Project จาก Github : https://github.com/5730398821-PC/DBWeb
- ไปยังโฟลเดอร์ที่ Clone Project ลงมา เปิดไฟล์ db.js แล้วทำการแก้ไขส่วนที่เป็น 'user' และ 'password' ดังนี้

```
var pool = mysql.createPool({
	connectionLimit : 100,
	host     : 'localhost',
	user     : '[your-username]',
	password : '[your-password]',
	database : 'CUReg'
});
```


Installation

1. ใน Command Line ไปยัง Directory ที่ Clone โปรเจคลงมา
2. พิมพ์ npm install
3. run server โดยพิมพ์ npm start
4. เข้าใช้งาน Website โดยการใช้ Web Browser เข้าไปที่ localhost:3000

