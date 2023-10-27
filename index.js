const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Bật CORS cho máy chủ proxy của bạn
app.use(cors());

// Định nghĩa một đường dẫn cho máy chủ proxy
app.get("/proxy", async (req, res) => {
  const url = req.query.url; // Lấy URL cần proxy từ tham số truy vấn

  if (!url) {
    return res.status(400).send('Thiếu tham số "url"');
  }

  try {
    console.log("Đang tải URL: ", url);
    // Sử dụng axios để thực hiện yêu cầu đến máy chủ ngoại vi và giới hạn số lần chuyển hướng tối đa là 5
    const response = await axios.get(url, { maxRedirects: 5 });
    console.log("Dữ liệu phản hồi: ", response.data);
    // Truyền phản hồi từ máy chủ ngoại vi đến máy khách
    res.send(response.data);
  } catch (error) {
    console.error("Lỗi: ", error);
    res.status(error.response?.status || 500).send(error.message);
  }
});

const port = 4000; // Bạn có thể chọn bất kỳ cổng nào bạn muốn
app.listen(port, () => {
  console.log(
    `Máy chủ proxy CORS đang chạy trên cổng: http://localhost:${port}`
  );
});
