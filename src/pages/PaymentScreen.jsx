import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { total } = useContext(CartContext);
  const formattedTotal = parseFloat(total).toFixed(2);

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [errors, setErrors] = useState({});

  // Helper functions for validation
  const validateAddress = () => address.trim().length > 5;
  const validatePaymentMethod = () => !!paymentMethod;
  const validatePaymentDetails = () => paymentDetails.trim().length > 5;
  const validateCardNumber = () => /^\d{16}$/.test(cardNumber);
  const validateExpiryDate = () => /^\d{2}\/\d{2}$/.test(expiryDate); // Example: "MM/YY"
  const validateCvv = () => /^\d{3,4}$/.test(cvv);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for errors
    const newErrors = {};
    if (!validateAddress())
      newErrors.address = "Address must be at least 6 characters long";
    if (!validatePaymentMethod())
      newErrors.paymentMethod = "Please select a payment method";
    if (!validatePaymentDetails())
      newErrors.paymentDetails = "Payment details are required";

    if (paymentMethod === "creditCard") {
      if (!validateCardNumber())
        newErrors.cardNumber = "Card number must be 16 digits";
      if (!validateExpiryDate())
        newErrors.expiryDate = "Expiry date must be in MM/YY format";
      if (!validateCvv()) newErrors.cvv = "CVV must be 3 or 4 digits";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/");
    }
  };

  const renderCreditCardForm = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enter Credit Card Details</h2>
      <input
        type="text"
        className={`w-full rounded-lg p-2 mb-4 ${
          errors.cardNumber ? "border-red-500" : ""
        }`}
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      {errors.cardNumber && (
        <p className="text-red-500 text-sm">{errors.cardNumber}</p>
      )}

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className={`w-1/2 rounded-lg p-2 ${
            errors.expiryDate ? "border-red-500" : ""
          }`}
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm">{errors.expiryDate}</p>
        )}

        <input
          type="text"
          className={`w-1/2 rounded-lg p-2 ${
            errors.cvv ? "border-red-500" : ""
          }`}
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-20">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <input
            type="text"
            className={`w-full rounded-lg p-2 mb-4 ${
              errors.address ? "border-red-500" : ""
            }`}
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}

          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Credit Card</span>
            </label>
            {paymentMethod === "creditCard" && renderCreditCardForm()}
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="crypto"
                checked={paymentMethod === "crypto"}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Crypto Payment</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="bankTransfer"
                checked={paymentMethod === "bankTransfer"}
                onChange={handlePaymentMethodChange}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2">Bank Transfer</span>
            </label>
          </div>

          <h2 className="text-xl font-semibold mb-4">Enter Payment Details</h2>
          <textarea
            className={`w-full rounded-lg p-2 mb-4 ${
              errors.paymentDetails ? "border-red-500" : ""
            }`}
            placeholder="Enter payment details"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
          ></textarea>
          {errors.paymentDetails && (
            <p className="text-red-500 text-sm">{errors.paymentDetails}</p>
          )}

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Total Price</h2>
            <p className="text-lg font-semibold">${formattedTotal}</p>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 mt-6"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
