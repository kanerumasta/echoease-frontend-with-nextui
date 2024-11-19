import React from "react";

export const CancellationPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 dark:text-white">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Cancellation Policy</h1>

      <p className="text-white/50 dark:text-white/50 mb-4">
        At <span className="font-semibold text-blue-400">Echoease</span>, we understand that plans can change. Below are the guidelines for canceling bookings:
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">For Clients (Hirers):</h2>
        <ul className="list-disc list-inside text-white/50 dark:text-gray-300 space-y-2">
          <li>
            <span className="font-semibold">More than 6 days before the event date:</span> Most of the downpayment will be refunded, minus a
            <span className="font-semibold"> P50 processing fee</span>.
          </li>
          <li>
            <span className="font-semibold">2-6 days before the event date:</span> 50% of the downpayment will be refunded.
          </li>
          <li>
            <span className="font-semibold">Less than 2 days before the event date:</span> No refund will be issued. The remaining amount will be transferred as compensation to the artist.
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">For Artists:</h2>
        <p className="text-white/50 dark:text-gray-300">
          If the artist cancels the booking for any reason, the <span className="font-semibold">entire downpayment</span> will be refunded to the client.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Important Notes:</h2>
        <ul className="list-disc list-inside text-white/50 dark:text-gray-300 space-y-2">
          <li>Bookings marked as "completed" cannot be canceled.</li>
          <li>Refunds are subject to successful payment processing and may take up to <span className="font-semibold">7 business days</span> to reflect in your account.</li>
          <li>In case of disputes, please reach out to our support team.</li>
        </ul>
      </div>
    </div>
  );
};
