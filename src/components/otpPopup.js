import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

const OtpPopup = ({ openOtpPopup, setOpenOtpPopup, handleOtpSubmit }) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const otp = otpValues.join('');
    handleOtpSubmit(otp);
  };

  const closeModal = () => {
    setOpenOtpPopup(false);
  };

  if (!openOtpPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <OutsideClickHandler onOutsideClick={closeModal}>
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &#10005;
          </button>
          <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>

          <div className="flex justify-center gap-2 mb-6">
            {otpValues.map((value, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={value}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Verify OTP
          </button>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default OtpPopup;
