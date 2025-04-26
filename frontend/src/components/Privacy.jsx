import React from "react";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "50px",
        color: "#fff",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "50px",
        }}
      >
        Privacy Policy
      </h1>

      <div
        style={{
          backgroundColor: "#111",
          borderRadius: "10px",
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* 1. Introduction */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            1. Introduction
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            Welcome to BrainBloom.sbs. This Privacy Policy explains how we
            collect, use, and protect your information when you use our
            platform. By accessing BrainBloom.sbs, you agree to this Privacy
            Policy.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 2. Information We Collect */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            2. Information We Collect
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            We may collect personal information such as your name, email
            address, payment details, and any other information you provide when
            you register, make purchases, or interact with our platform.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 3. How We Use Your Information */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            3. How We Use Your Information
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            We use your information to provide and improve our services, process
            transactions, send updates, and respond to customer service
            requests.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 4. Sharing Your Information */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            4. Sharing Your Information
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            We do not sell or rent your personal information to third parties.
            We may share information with trusted service providers who assist
            us in operating our platform, conducting business, or servicing you.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 5. Security */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            5. Security
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no method of transmission
            over the Internet is completely secure.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 6. Changes to This Policy */}
        <section style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            6. Changes to This Policy
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            We may update our Privacy Policy from time to time. Any changes will
            be posted on this page with a revised effective date. Your continued
            use of BrainBloom.sbs after any changes means you accept the new
            Privacy Policy.
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 7. Contact Us */}
        <section>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            7. Contact Us
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            If you have any questions about this Privacy Policy, please contact
            us at info.brainbloom@gmail.com or{" "}
            <a
              style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}
              href="#/contact"
            >
              Contact Page
            </a>
            .
          </p>
          <hr style={{ marginTop: "20px", borderColor: "#1a1a1a" }} />
        </section>

        {/* 8.  Cookie Policy for BrainBloom */}
        <section>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            8. Cookie Policy for BrainBloom
          </h2>
          <p style={{ fontSize: "1rem", color: "#999", lineHeight: "1.8" }}>
            At BrainBloom, we use cookies solely to keep our users logged into
            their accounts for a smooth and seamless experience. These cookies
            help us remember your login session so you don't have to sign in
            every time you visit. We do not use cookies for tracking,
            advertising, or collecting personal data beyond login purposes. By
            using BrainBloom, you agree to our use of cookies to maintain your
            login session. If you clear your cookies, you may be logged out and
            required to sign in again.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
