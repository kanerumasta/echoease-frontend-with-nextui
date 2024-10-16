import React from 'react';

// Define the available statuses and their corresponding step order
const STATUS_STEPS = ['pending', 'awaiting_downpayment', 'approved', 'completed'];

interface BookingProgressProps {
  status: string; // Current booking status
}

const BookingProgress: React.FC<BookingProgressProps> = ({ status }) => {
  // Get the index of the current status to determine progress
  const currentStepIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex justify-between items-center w-full my-4">
      {STATUS_STEPS.map((step, index) => (
        <div key={step} className="flex-1 flex items-center">
          {/* Step Number with dynamic styling based on progress */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-full text-white
            ${index <= currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'}`}>
            {index + 1}
          </div>

          {/* Step Label */}
          <div className="ml-2 text-center">
            <p className={`capitalize ${index <= currentStepIndex ? 'text-blue-500' : 'text-gray-500'}`}>
              {step.replace('_', ' ')}
            </p>
          </div>

          {/* Progress Line (shown only between steps) */}
          {index < STATUS_STEPS.length - 1 && (
            <div className={`flex-1 h-1 mx-4
              ${index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingProgress;
