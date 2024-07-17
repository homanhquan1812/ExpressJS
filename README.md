<div align="center">
  <img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fphm9w85asky1ja15jg4y.png" alt="NodeJS + ExpressJS Logo" width="600">
</div>

# Project này gồm tính năng nổi bật gì của NodeJS & ExpressJS?
1. `Bcrypt`.
2. `Middleware`: Là đoạn mã trung gian nằm giữa **req** và **res**, thường được sử dụng để xác thực, ghi log, xử lý lỗi,...
3. `Rate Limit`.
4. `Session & Cookie`.
5. `JWT (JSON Web Token)`.

# Handlebars
<div align="center">
  <img src="https://github.com/user-attachments/assets/a91e185f-1b6a-48f6-bdc8-baa638873cb7" alt="NodeJS + ExpressJS Logo" width="600">
</div>

## Bước 1
Mở Terminal lên, tạo dự án bằng cách chạy:
```
npm init
```
rồi hoàn thành quy trình cài đặt đầu tiên.

Sau đó, cài đặt những gói thư viện cần thiết này:
```
npm install express nodemon morgan mongoose express-handlebars method-override dotenv bcrypt express-session express-rate-limit fs jsonwebtoken
```

Cụ thể hơn:
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
* **Method Override**: Được dùng để cập nhật hoặc xóa dữ liệu trong database.
```
npm install method-override
```
* **Dotenv**: Giúp lưu trữ các thông tin nhạy cảm như **API KEY** hoặc **SECRET KEY** bên ngoài mã nguồn, giảm nguy cơ lộ thông tin khi chia sẻ mã nguồn.
```
npm install dotenv
```
* **Bcrypt**: Tăng bảo mật cho Login/Register.
```
npm install bcrypt
```
* **Session & Cookie**:
  - **Session**: Là phiên làm việc giữa client và server, thông tin phiên làm việc được lưu trữ trên server và được liên kết với 1 session ID duy nhất.
  - **Cookie**: Là đoạn dữ liệu được lưu trữ trong trình duyệt, thường được sử dụng để lưu trữ session ID, sở thích của người dùng trên Internet,...
```
npm install express-session
```
* **Rate limit**: Giới hạn số lần đăng nhập sai.
```
npm install express-rate-limit
```
* **Fs**: Ghi đè file, ở project này thì dùng để viết ngẫu nhiên các thông tin nhạy cảm như `API_KEY` và `SECRET_KEY` trong file `keygeneration.js` ở dưới.
```
npm install fs
```
* **JWT (JSON Web Token)**: Là một tiêu chuẩn mở cho việc tạo ra các token truy cập an toàn dựa trên JSON, thường được sử dụng để xác thực và ủy quyền người dùng trong ứng dụng web và di động.
```
npm install jsonwebtoken
```
* **Mongoose Delete** (Tùy chọn): Thay vì xóa hẳn dữ liệu khỏi database, ta dùng thư viện để **xóa mềm** bằng cách đặt `deleted: true` hoặc `deleted: false`.
```
npm install mongoose-delete
```

Ở đây, ta dùng định dạng `.hbs` cho các file Handlebars.

## Bước 2
Ta cần hiểu cơ cấu project như sau:
```
Project
  |
  |__ config
	|__ db.js
  |__ node_modules
  |__ src
	|__ app
	      |__ controllers
		    |__ (Các file controller liên quan)
	      |__ models
		    |__ (Các file models liên quan)
	|__ public
	      |__ css
	      |__ img
	      |__ js
	|__ resources
	      |__ views
		    |__ layouts
			  |__ main.hbs
		    |__ partials
		    	  |__ footer.hbs
			  |__ header.hbs
		    |__ (Các page Handlebars)
	|__ routes
	      |__ index.js
	      |__ (Các file route liên quan)
	|__ util
	      |__ (Các file util liên quan)
	|__ index.js
  |__ .env
  |__ package-lock.json
  |__ package.json
```

Giải thích các thư mục, file:
* `config`: Chứa file kết nối database.
* `app`: 2 thư mục `models` và `controllers` lần lượt xử lý dữ liệu từ Database và vận hành các chức năng trên website.
* `public`: Chứa các thư mục `css`, `js`, `img`,...
* `resource/views`: Chứa các tập tin Handlebars.
* `routes`: Chứa file tạo đường link cho website.
* `util`: Chứa các tiện ích cho website.
* `.env`: Lưu String kết nối database, cổng PORT và các key API khác như SECRET_API, KEY_API,... 

## Bước 3
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

Mở web `localhost:3000`. Đây là website mà ta sẽ xây dựng. Muốn ngưng host thì t nhấn `Ctrl + C`.

# EJS
<div align="center">
  <img src="https://github.com/user-attachments/assets/9c4765d7-c528-4069-9b31-493c23006cd1" alt="NodeJS + ExpressJS Logo" width="600">
</div>

> Về cơ bản, phần Backend của **EJS** và **Handlebars** là như nhau.

## Bước 1
Tương tự ở trên, nhưng cài tổng bằng:
```
npm install express nodemon morgan mongoose ejs express-ejs-layouts method-override dotenv bcrypt express-session express-rate-limit fs jsonwebtoken
```

Cụ thể hơn:
* **EJS**: Chứa các tập tin cần thiết của EJS để thay thế cho HTML thông thường.
```
npm install ejs
```
* **EJS Layouts**: Không giống như **Handlebars**, ta phải cài thêm **layouts** để chứa các file page.
```
npm install express-ejs-layouts
```

## Bước 2
Ta cần hiểu cơ cấu project như sau:
```
Project
  |
  |__ config
	|__ db.js
  |__ node_modules
  |__ src
	|__ app
	      |__ controllers
		    |__ (Các file controller liên quan)
	      |__ models
		    |__ (Các file models liên quan)
	|__ public
	      |__ css
	      |__ img
	      |__ js
	|__ views
	      |__ layouts
		    |__ main.ejs
	      |__ partials
		    |__ footer.ejs
		    |__ header.ejs
	      |__ (Các page EJS)
	|__ routes
	      |__ index.js
	      |__ (Các file route liên quan)
	|__ util
	      |__ (Các file util liên quan)
	|__ index.js
  |__ .env
  |__ package-lock.json
  |__ package.json
```

## Bước 3
Tương tự như ở trên, ta sẽ có 1 website y chang **Handlebars**.

# ReactJS

<div align="center">
  <img src="https://github.com/user-attachments/assets/f8e7f629-912e-4917-92e0-2536e2434014" alt="NodeJS + ExpressJS Logo" width="600">
</div>

## Bước 1
Mở Terminal của thư mục `backend` lên, tạo tài nguyên backend bằng cách chạy:
```
npm init
```
rồi hoàn thành quy trình cài đặt đầu tiên.

Sau đó, cài đặt những gói thư viện cần thiết này:
```
npm install express nodemon morgan mongoose cors method-override dotenv bcrypt express-session express-rate-limit fs jsonwebtoken
```

Cụ thể hơn:
* `CORS (Cross-origin resource sharing)`: à một cơ chế cho phép nhiều tài nguyên khác nhau của một trang web có thể được truy vấn từ domain khác với domain của trang đó.
```
npm install cors
```

## Bước 2
Mở Terminal của thư mục dự án lên, tạo tài nguyên frontend bằng cách chạy:
```
npm create vite@latest
```
Đặt tên là `frontend`, rồi hoàn thành quy trình cài đặt đầu tiên (Chọn `React` + `Javascript`).

Sau đó, cài đặt những gói thư viện cần thiết này:
```
npm install react-router-dom react-helmet axios
```

và cài thêm <b>ES7+ React/Redux/React-Native snippets</b>.

Cụ thể hơn:
* `react-router-dom`: Dùng để quản lý điều hướng trong website.
* `react-helmet`: Dùng để quản lý các tài nguyên trong `<head>` hoặc **script** trong `<body>`,...
Chú ý: Đừng nhét các file `css` vào **Helmet**, sẽ gây lỗi load file CSS chậm.

## Bước 3
Ta cần hiểu cơ cấu project như sau:
```
Project
  |
  |__ backend
  |__ frontend
        |__ public
	      |__ css
	      |__ img
	      |__ js
	|__ src
	      |__ components
	      |__ pages
	      |__ App.jsx
	      |__ main.jsx
	|__ (Các file liên quan khác)
```

Chỉnh sửa 2 mục `App.jsx` và `main.jsx` theo mẫu. Tiếp theo, tạo 2 thư mục `pages` và `components` lần lượt chứa page ReactJS và các thành phần khác như `head`,...; sau đó page bằng cách gõ `rafce` rồi nhét vào thư mục `pages`.

ReactJS sẽ mặc định dùng `http`, nếu muốn dùng `https` thì chỉnh file `vite.config.js`:
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ mkcert(), react() ]
})
```

Trước đó hãy cài thêm:
```
npm install vite-plugin-mkcert
```

Gõ lệnh `npm run dev` để chạy website ReactJS.

1 vài status từ các lệnh thực thi CRUD trên dữ liệu JSON:
* `200`: Lấy, cập nhật, xóa dữ liệu thành công.
* `201`: Tạo dữ liệu thành công.
* `401`: Lỗi xác thực (Login, Register,...).
* `404`: Không tìm thấy dữ liệu.
* `500`: Lỗi server (Thường xảy ra ở Backend như code không phù hợp,...).
