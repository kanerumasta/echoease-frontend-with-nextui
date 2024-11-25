import MainLayout from '@/components/main-layout';
import React from 'react';

const TermsAndConditions = () => {

  return (
    <MainLayout>
    <div className="text-gray-800 min-h-screen">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">Terms and Conditions</h1>
        <p className="mb-8 text-white/70">
          Welcome to Echoease! These Terms and Conditions (“Terms”) govern your access to and use of the Echoease platform (the “Platform”). By accessing or using our services, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree, please refrain from using the Platform.
        </p>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. General Usage</h2>
          <p>
            Echoease is a platform for connecting clients with singers for artistic performances and projects. By using the Platform, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and up-to-date information during registration and throughout your use of the Platform.</li>
            <li>Use the Platform only for its intended purpose and in compliance with applicable laws.</li>
            <li>Refrain from engaging in fraudulent, abusive, or inappropriate behavior.</li>
          </ul>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. User Accounts</h2>
          <p>
            To access Echoease, you must create a user account. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep your login credentials secure and confidential.</li>
            <li>Notify us immediately of unauthorized use of your account.</li>
            <li>Be responsible for all activities conducted under your account.</li>
          </ul>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. Content Policy</h2>
          <p>
            Users may upload profiles, portfolios, performance samples, or other content (“User Content”). By uploading content, you represent that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You own or have the necessary permissions to share the content.</li>
            <li>Your content does not infringe on the rights of others or violate any laws.</li>
          </ul>
          <p className="mt-4">
            Echoease reserves the right to remove content that is deemed inappropriate, offensive, or in violation of these Terms.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Payments and Fees</h2>
          <p>
            Payments for services are processed securely through third-party payment providers. Echoease:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitates payments between clients and singers but does not act as an employer or agent of either party.</li>
            <li>Charges a service fee for using the Platform, disclosed at the time of booking.</li>
            <li>Is not responsible for payment disputes arising outside the Platform.</li>
          </ul>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Refunds and Cancellations</h2>
          <p>
            Refunds and cancellations are subject to the following policies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cancellations by the client must be made at least 48 hours before the agreed-upon service date for a full refund.
            </li>
            <li>
              No refunds will be issued for cancellations made less than 48 hours in advance, except in cases of verified emergencies.
            </li>
            <li>
              Singers who cancel a booking without valid reasons may face penalties, including account suspension.
            </li>
          </ul>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Privacy Policy</h2>
          <p>
            Echoease values your privacy. Our <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a> outlines how we collect, use, and protect your personal information. By using the Platform, you consent to these practices.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">7. Intellectual Property</h2>
          <p>
            All content provided by Echoease, including logos, graphics, and software, is owned by or licensed to Echoease and is protected by intellectual property laws. Users may not copy, modify, or distribute this content without prior written consent.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">8. Dispute Resolution</h2>
          <p>
            In the event of a dispute between users or between a user and Echoease, we encourage resolution through our support team. If unresolved, disputes shall be governed by the laws of [Your Jurisdiction] and resolved through arbitration.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">9. Disclaimer of Warranties</h2>
          <p>
            Echoease is provided "as is" without any warranties, express or implied. We do not guarantee the availability, accuracy, or quality of services provided by users on the Platform.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">10. Limitation of Liability</h2>
          <p>
            Echoease shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform. Our total liability is limited to the amount paid to us for services.
          </p>
        </section>

        <section className="mb-8 text-white/70">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">11. Changes to Terms</h2>
          <p>
            We may update these Terms periodically. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <footer className="text-sm text-gray-600 mt-10">
          <p>
            If you have any questions or concerns about these Terms, please contact us at
            <span className="text-blue-400"> support@echoease.com</span>.
          </p>
        </footer>
      </div>
    </div>
    </MainLayout>
  );
};

export default TermsAndConditions;
