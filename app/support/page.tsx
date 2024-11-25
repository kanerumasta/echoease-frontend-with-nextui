"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@nextui-org/image";

import {
  useChatAdminMutation,
  useFetchAdminChatsQuery,
} from "@/redux/features/chatApiSlice"; // Import your RTK queries and mutations

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(""); // State for the new message input
  const [isFirstMessage, setIsFirstMessage] = useState(true); // Track if it's the first message
  const [messages, setMessagesState] = useState<
    { content: string; author: string }[]
  >([]);

  const {
    data: chatData,
    error,
    isLoading,
    refetch,
  } = useFetchAdminChatsQuery(); // Fetch chat data using the query
  const [chatAdmin] = useChatAdminMutation(); // Mutation for sending messages

  const faqs = [
    {
      question: "How to book an artist?",
      answer:
        "To book an artist, go to the artist's profile, click on Bring me to stage button, and follow the prompts.",
    },
    {
      question: "What payment options are available?",
      answer:
        "We support various payment methods including Paymaya, and GCash.",
    },
    {
      question: "How do I cancel a booking?",
      answer:
        "To cancel a booking, go to your bookings, select the event, and choose the cancel option. Make sure to review the cancellation policy.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (isChatOpen && isFirstMessage) {
      // Simulate the first greeting message from the admin when the chat is opened
      setMessagesState([
        { content: "Hi! How can we assist you today?", author: "Echo Support" },
      ]);
      setIsFirstMessage(false); // Set first message flag to false
    }
  }, [isChatOpen, isFirstMessage]);

  useEffect(() => {
    if (chatData) {
      setMessagesState(chatData.messages); // Set the fetched messages to the state
    }
  }, [chatData]);

  // Send a new message to the backend using RTK Query
  const handleSendMessage = async (messageContent: string) => {
    if (messageContent.trim()) {
      try {
        // Trigger chatAdmin mutation to send the message
        await chatAdmin({ content: messageContent });

        // After sending, fetch updated messages (or you could refetch via RTK query)
        setMessagesState((prevMessages) => [
          ...prevMessages,
          { content: messageContent, author: "User" }, // Assume user sends the message
        ]);
        setNewMessage(""); // Clear the input field
        refetch();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-center text-5xl font-bold my-6">
        How can we help you?
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center my-4">
        <input
          className="w-full max-w-lg p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search for topics or keywords..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="border-b py-3">
            <button
              className="flex items-center justify-between w-full text-left"
              onClick={() => setFaqOpen(faqOpen === index ? null : index)}
            >
              <span className="text-lg text-blue-400 font-medium">
                {faq.question}
              </span>
              <span>{faqOpen === index ? "−" : "+"}</span>
            </button>
            {faqOpen === index && (
              <p className="mt-2 pl-2 text-white/50">{faq.answer}</p>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-gray-500">
            No results found. Try different keywords.
          </p>
        )}
      </div>

      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
          onClick={() => {
            setIsChatOpen(true);
          }}
        >
          Chat with Support
        </button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1 }}
              className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden"
              exit={{ scale: 0.8 }}
              initial={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-1">
                  <Image src="/media/echo-bot.png" width={28} />
                  <h2 className="text-xl text-black/70 font-semibold">
                    Echo Support
                  </h2>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsChatOpen(false)}
                >
                  &#10005;
                </button>
              </div>
              <div className="p-4 space-y-4">
                {/* Simple Chat UI */}
                <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
                  {isLoading && <p>Loading messages...</p>}

                  {chatData &&
                    chatData.messages.map((message, index) => (
                      <p
                        key={index}
                        className={`text-sm ${message.author === "Echo Support" ? "text-gray-500" : "text-blue-500"}`}
                      >
                        <strong>{message.author}:</strong> {message.content}
                      </p>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Type your message..."
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage(newMessage); // Send message on Enter
                      }
                    }}
                  />
                  <button
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    onClick={() => handleSendMessage(newMessage)} // Send message on button click
                  >
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
