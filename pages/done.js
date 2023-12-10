import Image from "next/image";
import { useState } from "react";

export default function Home() {
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
      <p className="text-xl font-bold">已傳送匿名訊息！</p>
    </div>
  );
}
