
import { useSEO } from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { FileText, AlertCircle, CreditCard, CalendarX, Shield, Scale } from 'lucide-react';

const TermsPage = () => {

  const sections = [
    {
      icon: FileText,
      title: '1. Our Role as a Facilitator',
      content: `Septentrion Group operates exclusively as a medical tourism travel and logistics facilitator. We provide travel arrangements, accommodation booking, translation, and clinic appointment scheduling. We are not a healthcare provider. We do not provide medical advice, diagnoses, or treatments.`
    },
    {
      icon: CreditCard,
      title: '2. Financial Structure & Split Payments',
      content: `The total estimated cost of your medical journey consists of two distinct payments:

• The Facilitation Deposit: Paid directly to Septentrion Group prior to travel. This non-refundable fee secures your travel logistics, accommodation, and clinic appointment.

• The Medical Balance: Paid directly to the independent, licensed medical clinic upon arrival in Tirana, prior to the commencement of any medical procedure. Septentrion Group does not collect or hold funds intended for your medical treatments.`
    },
    {
      icon: CalendarX,
      title: '3. Cancellation and Refund Policy',
      content: `Because we incur immediate administrative costs and pay third-party vendors (hotels, transfers) upon your booking, the Facilitation Deposit is subject to the following rules:

• Cancellations made 30+ days before arrival: 50% refund of the deposit.
• Cancellations made 14 to 29 days before arrival: 25% refund of the deposit.
• Cancellations made less than 14 days before arrival (or no-shows): 100% non-refundable.`
    },
    {
      icon: Shield,
      title: '4. Exclusion of Medical Liability',
      content: `All medical risks, warranties, and liabilities are exclusively assumed by the licensed medical facilities and healthcare professionals who perform your treatment. Septentrion Group holds no legal, financial, or moral responsibility for medical outcomes, malpractice, or necessary revisions. Any disputes regarding medical services must be directed to the treating clinic.`
    },
    {
      icon: Scale,
      title: '5. Governing Law',
      content: `These terms are governed by the laws of the Republic of Albania. Any disputes shall be subject to the exclusive jurisdiction of the courts of Tirana.`
    },
  ];

  useSEO({
    title: 'Terms & Conditions',
    description: 'Read the Terms and Conditions governing the use of Septentrion Group services and this website.',
    canonicalPath: '/terms',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
            <FileText size={28} className="text-navy" />
          </div>
          <h1 className="headline-lg text-navy mb-4">
            Terms & Conditions of Service
          </h1>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            These Terms and Conditions govern your use of our website and the travel facilitation 
            services provided by Septentrion Group SHPK (the "Agency"), registered in Tirana, Albania. 
            By using our site or booking our services, you agree to these terms.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 lg:p-12">
          {/* Welcome Message */}
          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-navy/10">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-4">
              Welcome to Septentrion Group
            </h2>
            <p className="body-text text-slate-custom">
              These Terms and Conditions dictate the rules of using our website and booking our services. 
              It includes the financial terms, cancellation policies, and liability limitations that govern 
              our relationship with you as our valued client.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div key={index} className="group">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sand/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sand transition-colors">
                      <Icon size={18} className="text-navy sm:w-5 sm:h-5" />
                    </div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-navy pt-1 sm:pt-2">
                      {section.title}
                    </h3>
                  </div>
                  <div className="pl-13 sm:pl-16">
                    <p className="body-text text-slate-custom whitespace-pre-line text-sm sm:text-base">
                      {section.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Medical Disclaimer Section */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-navy/10">
            <div className="p-4 sm:p-6 bg-navy/5 rounded-lg">
              <h3 className="font-display font-bold text-lg sm:text-xl text-navy mb-3 sm:mb-4">
                Medical Disclaimer
              </h3>
              <p className="body-text text-slate-custom text-sm sm:text-base">
                Septentrion Group operates exclusively as a travel and facilitation agency. 
                We do not provide, practice, or assume any legal, financial, or moral responsibility 
                for medical treatments, procedures, diagnoses, or any potential complications. 
                All medical risks, warranties, and liabilities are exclusively assumed by the 
                licensed medical facilities and healthcare professionals with whom patients establish 
                direct medical contracts.
              </p>
            </div>
          </div>

          {/* Contact Notice */}
          <div className="mt-8 sm:mt-10">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 bg-sand/10 rounded-lg">
              <AlertCircle size={24} className="text-sand flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-semibold text-navy mb-2">
                  Questions about these terms?
                </h4>
                <p className="body-text text-slate-custom mb-3 text-sm sm:text-base">
                  If you have any questions or concerns about these Terms and Conditions, 
                  please contact us before booking our services.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 text-sand font-semibold hover:text-sand-dark transition-colors"
                  >
                    Contact our team
                  </Link>
                  <span className="text-slate-custom/40 text-sm">or</span>
                  <a
                    href="mailto:info@septentriondent.com"
                    className="inline-flex items-center gap-2 text-sand font-semibold hover:text-sand-dark transition-colors text-sm"
                  >
                    info@septentriondent.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-slate-custom">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
