import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      console.log("🔹 按鈕被點擊，開始執行 handleButtonClick");

      console.log("🔹 導航到 /done 頁面");
      router.push("/done");

      console.log("🔹 發送請求到後端 API...");
      const res = await fetch(
        "https://bjniming-e8df7673545f.herokuapp.com/process-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: inputText }),
        }
      );

      console.log("🔹 API 回應收到，狀態碼:", res.status);

      if (res.ok) {
        console.log("✅ 使用者文字處理成功");
      } else {
        console.error("❌ 使用者文字處理失敗，狀態碼:", res.status);
        const errorData = await res.json();
        console.error("❌ 錯誤訊息:", errorData);
      }
    } catch (error) {
      console.error("❌ 發生錯誤:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="rounded-full overflow-hidden mb-5 w-50 h-50">
        <Image
          src="/my-img.png"
          alt="My Image"
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="輸入你的匿名訊息...(70字內)"
        maxLength={70}
        className="mb-4 w-3/4 md:w-1/3 h-48 p-4 text-black rounded-md"
      />
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded text-lg"
      >
        SEND!
      </button>
    </div>
  );
}
