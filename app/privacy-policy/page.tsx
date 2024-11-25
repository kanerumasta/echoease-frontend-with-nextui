import MainLayout from '@/components/main-layout';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="text-gray-800 min-h-screen">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">Privacy Policy</h1>
          <p className="mb-8 text-white/70">
            Effective Date: November 2024. At EchoEase, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform, including the EchoEase mobile app, website, and associated services. By using EchoEase, you agree to the practices described in this Privacy Policy.
          </p>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Information We Collect</h2>
            <p>We collect the following types of information to provide and improve our services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Information You Provide to Us:</strong> Account Information, Profile Details, Payment Information, Booking Details.</li>
              <li><strong>Automatically Collected Information:</strong> Device Data, Location Data (with consent), Cookies.</li>
              <li><strong>Third-Party Integrations:</strong> Information from third-party services like Google or social media platforms.</li>
            </ul>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Facilitate bookings and connect clients with artists.</li>
              <li>Process payments securely.</li>
              <li>Personalize your experience and provide tailored recommendations.</li>
              <li>Improve the platform and address technical issues.</li>
              <li>Send transactional notifications and promotional offers (with your consent).</li>
              <li>Ensure safety, compliance, and fraud prevention.</li>
            </ul>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. How We Share Your Information</h2>
            <p>We do not sell your personal data. However, we may share your information in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With clients or artists for booking coordination and service delivery.</li>
              <li>With payment processing partners for secure transactions.</li>
              <li>With service providers (e.g., hosting providers, analytics tools) to improve our services.</li>
              <li>To comply with legal obligations (e.g., regulations, court orders).</li>
            </ul>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Your Data Protection Rights</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access and Portability:</strong> Request a copy of your data in a portable format.</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request the deletion of your account and associated data, subject to legal obligations.</li>
            </ul>
            <p>To exercise these rights, contact us at <a href="mailto:echoease@gmail.com" className="text-blue-400 hover:underline">echoease@gmail.com</a>.</p>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Data Security</h2>
            <p>We take reasonable steps to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Retention of Data</h2>
            <p>We retain your data for as long as necessary to provide our services, fulfill legal obligations, or resolve disputes. You can request data deletion at any time.</p>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">7. Updates to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be effective when posted on our app and website. We encourage you to review this policy periodically.</p>
          </section>

          <section className="mb-8 text-white/70">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">8. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy or how we handle your data, please contact us at:</p>
            <p>Email: <a href="mailto:echoease@gmail.com" className="text-blue-400 hover:underline">echoease@gmail.com</a></p>
            <p>Address: Bonanza Laray, Purok Macupa, San Roque, Talisay City, Cebu, Philippines 6045</p>
          </section>

          <footer className="text-sm text-gray-600 mt-10">
            <p>If you have any questions or concerns about our Privacy Policy, please contact us at <span className="text-blue-400">echoease@gmail.com</span>.</p>
          </footer>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
