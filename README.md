# NodeJS & ExpressJS
<div align="center">
  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fphm9w85asky1ja15jg4y.png" alt="NodeJS + ExpressJS Logo" width="600">
</div>

## Bước 1
Mở Terminal lên, tạo dự án bằng cách chạy:
```
npm init
```
rồi hoàn thành quy trình cài đặt.

## Bước 2
Tạo thư mục <b>src</b> và tạo file <b>index.js</b>, đặt file đó trong thư mục `src`. Mở `index.js` lên và copy dòng code này:
```
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Sau đó, tạo thư mục `config`, rồi tạo file `db.js`, đặt file này trong thư mục kia. Mở file đó lên và copy dòng code này:
```
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function connect()
{
	try {
		await mongoose.connect('mongodb+srv://homanhquan:homanhquan@cluster0.ap9zdrs.mongodb.net/<your_database_name>')
		console.log('Database connected successfully.')
	} catch (error) {
		console.log('Failed to connect to database.')
	}
}

module.exports = { connect }
```

## Bước 3
Cài đặt những gói thư viện cần thiết này:

* <b>Express</b>: Chứa các tập tin cần thiết của NodeJS và ExpressJS để xây dựng Backend.
```
npm install express
```
* <b>Nodemon</b>: Giúp khởi động lại ứng dụng Node khi phát hiện có sự thay đổi file hoặc code trong file của dự án.
```
npm install -g nodemon
```
* <b>Morgan</b>: Cho phép ta dễ dàng ghi lại các yêu cầu, lỗi và hơn thế nữa vào **Console/Terminal**. Thường được sử dụng để coi web hỗ trợ Real-time Data (cập nhật thông tin ngay lập tức) hay không.
```
npm install morgan
```
* <b>Mongosse</b>: Là một thư viện mô hình hóa đối tượng (Object Data Model - ODM) cho MongoDB và Node.js, được dùng để quản lý các kiểu dữ liệu từ database để website có thể sử dụng.
```
npm install mongoose
```
* <b>Handlebars</b>: Chứa các tập tin cần thiết của Handlebars để thay thế cho HTML thông thường.
```
npm install express-handlebars
```
* **Dotenv**: 

## Bước 4
Vào file <b>package.json</b>, thêm dòng này tại <b>scripts</b>:
```
"start": "nodemon src/index.js",
```
và chỉnh sửa dòng này ở trên:
```
"main": "src/index.js",
```
Gõ lệnh này để host backend:
```
npm start
```

Mở web `localhost:3000`. Chúc mừng, đây là web backend của bạn.
Muốn ngưng host thì t nhấn `Ctrl + C`.

## Bước 5
Tạo các thư mục sau ở trong `src`:
* `app`: Tạo thêm 2 thư mục `models` và `controllers` lần lượt xử lý dữ liệu từ Database và vận hành các chức năng trên website.
* `public`: Chứa các thư mục `css`, `js`, `img`,...
* `resource`: Tạo thêm 1 folder `views` để chứa các tập tin Handlebars.
* `routes`: Chứa file tạo đường link cho website.
* `util`: Chứa các tiện ích cho website, ta sẽ tạo file `mongoose.js` và copy dòng code sau:
```
module.exports = {
	multipleMongooseToObject: function(mongooses) {
		return mongooses.map(mongoose => mongoose.toObject())
	},
	mongooseToObject: function(mongoose) {
		return mongoose ? mongoose.toObject() : mongoose;
	}
}
```

## Bước 6
Thêm các dòng này vào file `index.js`:
```
const morgan = require('morgan')
const Handlebars = require('express-handlebars')
const path = require('path')
const route = require('./routes')
const db = require('../config/db')

// Database
db.connect()

// Morgan
app.use(morgan('combined'))

// Express Body-parser: Xử lý dữ liệu biểu mẫu được mã hóa JSON, Raw, Text và URL.
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())

// Handlebars
app.engine('handlebars', Handlebars.engine())
app.set('view engine', 'handlebars')

// Path
app.set('views', path.join(__dirname, 'resources/views'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Change Front-end's files' type to hbs
app.engine('hbs', Handlebars.engine({
	extname: '.hbs'
}));

app.set('view engine', 'hbs')

// Route
route(app)
```

## Bước 7
Mở thư mục `routes`, tạo 1 file `index.js` và 1 file `home.js`, copy các dòng code sau:
* `index.js`:
```
const homeRouter = require('./dashboard');

function route(app) {
    app.use('/', homeRouter);
}

module.exports = route;
```
* `home.js`
```
const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.homepage)

module.exports = router;
```
Tạo file `Home.js` tại thư mục `models`.
Sau đó mở thư mục `app`, tạo file `HomeController.js` và copy dòng code sau:
```
const HomeDatabase = require('../models/Home')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class AboutController
{
    // [GET] /
    async homepage(req, res, next)
    {
        await res.render('home', {
            layout: false
        })
    }
}

module.exports = new AboutController
```

## Bước 8:
Tạo file `home.hbs` tại mục `views`, copy đoạn code sau:
```
<!DOCTYPE html>
<html>
    <head>
        <title>Website by Handlebars</title>
        <meta charset="UTF-8">
    </head>
    <body>
        <h1>HELLO WORLD!!!</h1>
    </body>
</html>
```

Xin chúc mừng! Đây là page đầu tiên của bạn.
