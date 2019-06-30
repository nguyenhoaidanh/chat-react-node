# ZJS Framework

ZJS Framework là một Javascript framework tổng quát được tối ưu cho việc xây dựng Web app, Single Page App, JS Library

----------


## Giới thiệu
ZJS Framework là framework Javascript sử dụng kiến trúc React - Redux - Redux Saga được dựng sẵn, và chứa những công cụ phục vụ việc phát triển nhanh một ứng dụng Web Front-end. Đồng thời cũng là kiến trúc cho các project dạng thư viện (React - Redux sẽ được loại bỏ khi ở dạng project này)

**Bên dưới là những công nghệ mà framework đang sử dụng:**


|tech|mô tả|
|---|---|
|React|Thư viện hỗ trợ build UI|
|Redux|Định hướng luồng đi dữ liệu cho UI|
|Redux-saga|Middleware cho Redux, dùng để thực hiện các request API async|
|Babel|Transpile ES6 về ES5, mục đích để developer có thể sử dụng ES6 và các tính năng mới của nó nhưng ứng dụng vẫn chạy tốt trên các trình duyệt cũ|
|Webpack|Dùng để đóng gói các node modules và các file JS về 1 file chạy duy nhất|
|Browsersync|HTTP server nhỏ gọn phục vụ development|
|Prettier|Format code, đảm bảo toàn bộ project luôn đúng convention|
|npm Scripts|Một số npm script phục vụ việc build, test, phân tích kích thước ứng dụng, format code|

Và còn nhiều thư viện cũng như công cụ, các class Utils được tích hợp sẵn phục vụ việc develop tốt hơn

----------

## Kiến trúc


###Mô hình


Dưới đây là kiến trúc chính ZJS Framework cũng như cách dữ liệu đi trong framework

![zjs framework](http://zjs.zdn.vn/core/assets/img/zjs-framework.png)


###Cấu trúc thư mục


|File/Folder|Purpose|
|---|---|
|app/|Đây là toàn bộ code base của ứng dụng mà bạn sắp build|
|app/components/|Chứa những React components|
|app/config/|Chứa những file config theo từng môi trường. Khi npm start sẽ tự động đọc development.js, còn khi npm run build:production sẽ đọc production.js|
|app/redux/actions/|Chứa các Redux actions và file action-types sẽ chứa các kiểu action|
|app/redux/container/|Chứa các container của redux, mỗi container có thể connect với 1 store hoặc nhiều store|
|app/redux/reducers/|Chứa các reducerh|
|app/resources/|Chứa resource của ứng dụng như CSS, Images|
|app/utils/|Chứa những class Utils|
|public/|Chứa file index.ejs làm template HTML môi trường dev|
|tools/|Các file tiện ích cho npm scripts|


----------

##Bắt đầu với ZJS Framework


Để bắt đầu, bạn thực hiện theo những bước sau:

**1 . Clone repo:** 

`https://zalogit2.zing.vn/zalo-web-platform-public/ZJSFramework`

**2. Cài đặt Node LTS**

**3. Sử dụng Project Generator để tạo project**

Project Generator được đặt ở `/ZJSGenerator/`. Tại thư mục này, gõ command:

`node zjs-gen.js [project-name] [project-type]`

project-name: là tên project của bạn
project-type: tùy loại project mà bạn sử dụng type khác nhau. Có 3 loại: lib | web | web-no-route

Ví dụ: `node zjs-gen.js ZaloWeb web`

**4. Cài đặt Dependencies yarn**
Lúc này project của bạn đã được ở ngoài thư mục root repo. Đến thư mục project của bạn rồi dùng command: yarn

**5. Chạy môi trường dev**
`yarn start` command này sẽ chạy môi trường dev và example app. Lúc này bắt đầu code được rồi 


----------

##Utility scripts


Có một số script được dựng sẵn để giúp việc lập trình thuận tiện hơn. Chỉ cần dùng command `yarn run command-name`

|command|mô tả|
|---|---|
|yarn start|Start môi trường dev|
|yarn run build:staging|Build bundle theo config staging|
|yarn run build:production|Build bundle theo config production|
|yarn run analyze-bundle|Tạo report phân tích kích thước của file bundle|
|yarn run fotmat|Format toàn bộ code của projec theo chuẩn|


----------


##Code convention


Một số convention được đặt ra tại ZJS Framework mà mọi người nên sử dụng:

- single-quote trong code JS
- indent sử dụng 2 space
- không cần sử dụng dấu ; cuối mỗi dòng code
- sử dụng ES6
- sử dụng class khi khai báo React Component
- tên file component viết hoa đầu mỗi từ. Ví dụ: `AppSlideBar.js`

