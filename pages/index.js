import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const router = useRouter();

  const handleButtonClick = async () => {
    try {
      router.push("/done");
      const res = await fetch(
        " https://one-elf-proven.ngrok-free.app/process-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: inputText }),
        }
      );

      if (res.ok) {
        console.log("User text processed successfully");

        // 在这里执行路由导航
      } else {
        console.error("Failed to process user text");
      }
    } catch (error) {
      console.error("Error:", error);
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
