export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { inputText } = req.body;

      // 在这里调用你的Python脚本，处理 inputText 数据
      // 例如，你可以使用 child_process 或者其他方法运行 Python 脚本
      // ...

      // 假设你的 Python 脚本返回一个结果
      const result = "Python script processed the data";

      res.status(200).json({ message: result });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
