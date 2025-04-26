import React from 'react';

const TermsAndServices = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h1 className="terms-page__title">Terms and Services</h1>
        
        <div className="terms-page__content">
          <section className="terms-section">
            <h2 className="terms-section__title">1. Acceptance of Terms</h2>
            <p>
              By accessing or using BrainBloom, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions and our Privacy Policy. If you do not agree to these terms, please refrain from using the platform.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">2. Changes to Terms</h2>
            <p>
              BrainBloom reserves the right to modify or update these terms at any time. Users will be notified of any significant changes via email or a prominent notification on the platform. Continued use of the platform after such changes constitutes your acceptance of the revised terms.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">3. User Eligibility</h2>
            <p>
              You must be at least 13 years old to use BrainBloom. If you are under 18, you may use the platform only with the involvement of a parent or guardian. By registering, you affirm that you meet these age requirements.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">4. Account Registration</h2>
            <p>
              Users may need to create an account to access certain features of the platform. You agree to provide accurate and complete information during registration and to update it when necessary. You are responsible for maintaining the confidentiality of your login credentials and are liable for any activities conducted under your account.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">5. User Conduct</h2>
            <p>
              You agree to use the platform for lawful purposes only and in a way that does not infringe on the rights of others. Prohibited activities include but are not limited to:
            </p>
            <ul className="terms-list">
              <li>Harassing, abusing, or threatening other users.</li>
              <li>Sharing or distributing unlawful, obscene, or harmful content.</li>
              <li>Engaging in unauthorized commercial activities.</li>
              <li>Attempting to gain unauthorized access to the platform's systems.</li>
            </ul>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">6. Content and Intellectual Property</h2>
            <p>
              All content, including but not limited to courses, videos, articles, graphics, and other educational materials, is owned by BrainBloom or its content creators. You may not reproduce, distribute, modify, or publicly display any content without written permission from the owner.
            </p>
            <p>
              <strong>User-Generated Content:</strong> By posting or uploading content to the platform (such as forum posts, reviews, or assignments), you grant BrainBloom a non-exclusive, royalty-free, worldwide license to use, distribute, and display the content for the purposes of operating and promoting the platform.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">7. Payment and Subscriptions</h2>
            <p>
              Some content on BrainBloom may be offered on a paid basis. Payment terms will be clearly stated at the time of purchase. Subscriptions may automatically renew unless canceled in accordance with the terms presented during sign-up. You are responsible for managing your subscription settings.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">8. Refund Policy</h2>
            <p>
              At BrainBloom, our goal is to provide a reliable and smooth experience on our platform. We currently do not have a general refund policy. However:
            </p>
            <ul className="terms-list">
              <li>If there is a glitch, bug, or technical issue within the app that affects your purchase or access, please contact us with the details, and we will review the situation.</li>
              <li>If eligible, we are happy to process a refund or provide a suitable resolution.</li>
            </ul>
            <p>
              All refund requests must be submitted through our official contact channels within a reasonable time of the issue occurring.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">9. Disclaimer of Warranties</h2>
            <p>
              BrainBloom makes no warranties or representations, express or implied, regarding the platform's availability, quality, or accuracy of content. The platform is provided on an "as-is" and "as-available" basis. We do not guarantee that the platform will be error-free or uninterrupted.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, BrainBloom and its affiliates, officers, directors, employees, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the platform, even if advised of the possibility of such damages.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold BrainBloom harmless from any claims, damages, liabilities, and expenses arising from your use of the platform or violation of these terms.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">12. Third-Party Links and Content</h2>
            <p>
              The platform may contain links to third-party websites or resources. BrainBloom is not responsible for the content or services provided by third-party sites and does not endorse them. Your interaction with such third-party websites is at your own risk.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">13. Termination</h2>
            <p>
              BrainBloom reserves the right to suspend or terminate your access to the platform at any time for any reason, including but not limited to a breach of these terms. Upon termination, you must cease using the platform and all content accessed through it.
            </p>
          </section>
          
          <section className="terms-section">
            <h2 className="terms-section__title">14. Cookie Policy for BrainBloom</h2>
            <p>
              At BrainBloom, we use cookies solely to keep our users logged into their accounts for a smooth and seamless experience. These cookies help us remember your login session so you don't have to sign in every time you visit.
            </p>
            <p>
              We do not use cookies for tracking, advertising, or collecting personal data beyond login purposes.
            </p>
            <p>
              By using BrainBloom, you agree to our use of cookies to maintain your login session. If you clear your cookies, you may be logged out and required to sign in again.
            </p>
          </section>
          
          <div className="terms-contact">
            <p>For any questions, feel free to <a href="#/contact" className="terms-contact__link">contact us</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndServices;