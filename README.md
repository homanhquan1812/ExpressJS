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
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

**(Có thể skip bước này)** Tạo thư mục `KeyGeneration`, rồi tạo file `KeyGeneration.js` và copy đoạn code sau:
```
const fs = require('fs');
const crypto = require('crypto');

function generateRandomKey(length) {
    return crypto.randomBytes(length).toString('hex');
}

const apiKey = generateRandomKey(16);  // 32 characters
const secretKey = generateRandomKey(32);  // 64 characters

const envContent = `API_KEY=${apiKey}\nSECRET_KEY=${secretKey}\n`;

fs.writeFile('.env', envContent, (err) => {
    if (err) {
        console.error('Error writing to .env file', err);
    } else {
        console.log('.env file has been saved with random keys');
    }
});
```

Tiếp đến, tạo file `.env` và chép đoạn code sau:
```
MONGODB_URI=mongodb+srv://homanhquan:homanhquan@cluster0.ap9zdrs.mongodb.net/SampleDatabase
PORT=1234
```

Sau đó, tạo thư mục `config`, rồi tạo file `db.js`, đặt file này trong thư mục kia. Mở file đó lên và copy dòng code này:
```
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

async function connect()
{
	try {
		await mongoose.connect(process.env.MONGODB_URI)
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


Các tính năng khác **(Không bắt buộc)**:
* **Dotenv**: Giúp lưu trữ các thông tin nhạy cảm như **API KEY** hoặc **SECRET KEY** bên ngoài mã nguồn, giảm nguy cơ lộ thông tin khi chia sẻ mã nguồn.
```
npm install dotenv
```
* **Fs**: Ghi đè file, dùng để viết ngẫu nhiên các thông tin nhạy cảm như `API_KEY` và `SECRET_KEY`.
```
npm install fs
```

Vào thư mục `KeyGeneration`, chạy:
```
node KeyGeneration.js
```
1 file `.env` sẽ được tạo ra, copy 2 mã đó vào file `.env` ở mục `src`.

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

// Express Body-parser: Handle data types such as JSON, Raw, Text, URL, etc.
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
Mở thư mục `routes`, tạo 1 file `index.js`, 1 file `products.js` và 1 file `home.js`, copy các dòng code sau:
* `index.js`:
```
const homeRouter = require('./home');
const productsRouter = require('./products');

function route(app) {
    app.use('/', homeRouter);
    app.use('/products', productsRouter);
}

module.exports = route;
```
* `products.js`:
```
const express = require('express');
const router = express.Router();
const ProductsController = require('../app/controllers/ProductsController');

router.get('/', ProductsController.showproducts)
router.get('/edit', ProductsController.editproducts)

module.exports = router;
```
* `home.js`:
```
const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');

router.get('/', homeController.homepage)

module.exports = router;
```
Tạo file `Products.js` tại thư mục `models`, rồi copy dòng code sau:
```
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Products = new Schema({
    csw_products: { type: String, maxLength: 255, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, maxLength: 255, required: true },
    description: { type: String },
    price: { type: Number, maxLength: 255, required: true },
    photo: [{type: String, required: true }]
}, { timestamps: true });


module.exports = mongoose.model('products', Products)
```

Sau đó mở thư mục `controllers`, tạo file `HomeController.js` và `ProductsController.js` rồi copy dòng code sau:
* `HomeController.js`:
```
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

* `ProductsController.js`:
```
const Products = require('../models/Products')
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose')

class AboutController
{
    // [GET] /products
    async showproducts(req, res, next)
    {
        await res.render('showproducts')
    }

    // [GET] /products/edit
    async editproducts(req, res, next)
    {
        await res.render('editproducts')
    }
}

module.exports = new AboutController
```

## Bước 8:
Đầu tiên, ta sẽ tạo thư mục `layouts` trong thư mục `views`, rồi tạo file `main.hbs`.

File này sẽ chứa các dòng code chung mà các page sử dụng, như là `<head>`, 1 vài phần trong `<body>` và `<script>`. Nếu muốn trang web không dùng file này, ta chỉ cần thêm dòng `layout: false` ở các file trong `controllers`.

Sau đó, tạo file `home.hbs`, `showproducts.hbs`, `editproduct.hbs` tại mục `views`, copy đoạn code sau:
* `home.hbs`:
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
* `showproducts.hbs`:
* `editproducts.hbs`:

Xin chúc mừng! Đây là các page đầu tiên của bạn.
