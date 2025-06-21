// App.tsx
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Kiểu dữ liệu cho message
interface ChatMessage {
  sender: string;
  message: string;
  time: string;
}

// Khai báo kiểu socket
const socket: Socket = io("http://localhost:3000");

const MeetingRoom = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("receive-message", (data: { sender: string; message: string }) => {
      const time = new Date().toLocaleTimeString();
      setChatLog((prev) => [
        ...prev,
        { sender: data.sender, message: data.message, time }
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit("join-room", roomId);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const time = new Date().toLocaleTimeString();
      socket.emit("send-message", { roomId, message });
      setChatLog((prev) => [
        ...prev,
        { sender: "You", message, time }
      ]);
      setMessage("");
    }
  };

  return (
    <div className="max-[1125px]:min-h-[calc(82vh)] min-[1125px]:min-h-[calc(77vh)] flex items-center justify-center">
      
        {!joined ? (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-center">Join Chat Room</h2>
              <input
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={joinRoom}
                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
              >
                Join Room
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 w-300 h-150">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Room: {roomId}</h3>
              <div className="border border-gray-300 rounded-md h-110 overflow-y-auto p-3 bg-gray-50 space-y-3 ">
                {chatLog.map((msg, i) => {
                  const isOwn = msg.sender === "You";
                  return (
                    <div key={i} className="space-y-1">
                      {/* Thời gian nằm ở giữa */}
                      <div className="text-center text-gray-400 text-[15px]">{msg.time}</div>
                      
                      <div className={`flex items-start gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
                        {/* Avatar với chữ cái đầu */}
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full font-bold text-white ${
                            isOwn ? "bg-blue-500" : "bg-gray-400"
                          }`}
                        >
                          {msg.sender[0]}
                        </div>

                        {/* Tin nhắn */}
                        <div
                          className={`max-w-[75%] p-2 rounded-sm text-xl ${
                            isOwn ? "bg-blue-100 text-right" : "bg-gray-200 text-left"
                          }`}
                        >
                          {/* <div className="font-semibold mb-1">{msg.sender}</div> */}
                          <div>{msg.message}</div>
                        </div>
                      </div>

                      
                    </div>
                  );
                })}

              </div>

              <div className="flex space-x-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}

export default MeetingRoom;