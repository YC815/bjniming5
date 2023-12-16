export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { inputText } = req.body;
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
