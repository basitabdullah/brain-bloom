import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useMailerStore } from "../stores/useMailerStore";
import { useUserStore } from "../stores/useUserStore";
import { errorToast } from "../lib/toast";
import { PulseLoader } from "react-spinners";

const ContactPage = () => {
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const { loading, sendMail } = useMailerStore();
  const { user } = useUserStore();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      return;
    }

    if (!user) {
      return errorToast("You to Login first before sending a message!");
    }

    sendMail(message, user.name, user.email, user.phone);

    setIsSent(true);
    setMessage("");

    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1 className="contact-page__title">Contact Us</h1>

        <div className="contact-page__content">
          <div className="contact-page__info">
            <p>
              Have a question or feedback? Send us a message and we'll get back
              to you as soon as possible.
            </p>
            <p>
              No need to provide your contact information - we'll respond to
              your message through our platform.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className={isError ? "error" : ""}
              ></textarea>
              {isError && (
                <div className="contact-form__error">
                  Please enter a message
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary contact-form__submit"
              disabled={loading}
            >
              <FaPaperPlane className="icon" />
              {loading ? <PulseLoader size={8} color="#000"/> : "Send Message"}
            </button>

            {isSent && (
              <div className="contact-form__success">
                Your message has been sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
