'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from '@nextui-org/image';

export default function HelpPage() {
    const [query, setQuery] = useState('');
    const [faqOpen, setFaqOpen] = useState<number|null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const faqs = [
        { question: "How to book an artist?", answer: "To book an artist, go to the artist's profile, click on Bring me to stage button, and follow the prompts." },
        { question: "What payment options are available?", answer: "We support various payment methods including Paymaya, and GCash." },
        { question: "How do I cancel a booking?", answer: "To cancel a booking, go to your bookings, select the event, and choose the cancel option. Make sure to review the cancellation policy." },
    ];

    const filteredFaqs = faqs.filter(faq => faq.question.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-center text-5xl font-bold my-6">How can we help you?</h1>

            {/* Search Bar */}
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    placeholder="Search for topics or keywords..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full max-w-lg p-3 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* FAQ Section */}
            <div className="space-y-4">
                <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
                {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border-b py-3">
                        <button
                            onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <span className="text-lg text-blue-400 font-medium">{faq.question}</span>
                            <span>{faqOpen === index ? "−" : "+"}</span>
                        </button>
                        {faqOpen === index && (
                            <p className="mt-2 pl-2 text-white/50">{faq.answer}</p>
                        )}
                    </div>
                ))}
                {filteredFaqs.length === 0 && (
                    <p className="text-gray-500">No results found. Try different keywords.</p>
                )}
            </div>

              {/* Chat Support Button */}
              <div className="fixed bottom-6 right-6">
                <button
                    className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => setIsChatOpen(true)}
                >
                    Chat with Support
                </button>
            </div>

            {/* Chat Modal */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className='flex items-center gap-1'>
                                <Image width={28} src='/media/echo-bot.png'/>
                                <h2 className="text-xl text-black/70 font-semibold">Echo Support</h2>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    &#10005;
                                </button>
                            </div>
                            <div className="p-4 space-y-4">
                                {/* Simple Chat UI */}
                                <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
                                    <p className="text-sm text-gray-500">Support: Hi! How can we assist you today?</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                    <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
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
