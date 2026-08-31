# GIÁO ÁN MASTER EDITOR 2026

Version 0.1 — safe-edit foundation.

## Mục tiêu
- Tiếp nhận `.docx` hoặc `.zip` cả tuần.
- Không xóa/viết lại giáo án gốc.
- Cấu hình các nhóm kiểm tra: địa giới hành chính, năng lực số, công dân số, biển đảo, môi trường/BĐKH, CTGDPT 2018 + TT27.
- Làm nền cho parser DOCX, diff, nhật ký thay đổi, validator và AI.

## Cấu trúc
`app/page.js` — giao diện và luật tương tác.
`app/globals.css` — giao diện responsive.
`next.config.mjs` — cấu hình Next.js.

## Phát triển
```bash
cd giao-an-master-editor
npm install
npm run dev
```

> Bản 0.1 là nền giao diện an toàn. Chưa thực hiện sửa nội dung Word thật cho đến khi hoàn thiện Document Engine và Validator.
