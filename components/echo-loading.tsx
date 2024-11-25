"use client";

export default function EchoLoading() {
  return (
    <div className="flex center h-screen  items-center justify-center">
      <div className="h-[100px] w-[100px] ">
        <img
          alt="Echo Bot"
          className="w-full h-full animate-rotate-x"
          height={100}
          src={"/media/echo-bot.png"}
          width={100}
        />
      </div>
    </div>
  );
}
