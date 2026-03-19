
import { useSEO } from '../hooks/useSEO';
import { Lock, Database, Share2, Eye, Trash2, Mail } from 'lucide-react';

const PrivacyPage = () => {

  const sections = [
    {
      icon: Database,
      title: '1. Data We Collect',
      content: `We collect the following categories of personal data:

• Identity & Contact Data: Name, email, phone number, and passport details (strictly for booking flights and hotels).

• Sensitive Health Data: Panoramic X-rays, medical history forms, and photographs provided voluntarily by you for the purpose of obtaining a medical quotation.

We only collect data that is necessary for the specific purpose of facilitating your medical tourism journey.`
    },
    {
      icon: Share2,
      title: '2. How We Use Your Data',
      content: `We act as a data processor. Your sensitive health data is collected solely to securely transmit it to our partnered, licensed medical clinics in Albania so they can evaluate your case and provide a "Net Treatment Plan" quote.

We do not use your health data for marketing purposes, nor do we share it with any third parties beyond what is necessary to facilitate your medical journey.`
    },
    {
      icon: Lock,
      title: '3. Data Sharing & Security',
      content: `We do not sell your data to marketers. Your data is only shared with:

• The specific medical clinic evaluating your case.
• Accommodation and transport providers (only your name/passport for booking purposes).

All health data is transmitted via secure, encrypted channels. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.`
    },
    {
      icon: Eye,
      title: '4. Your Rights Under GDPR',
      content: `Under the General Data Protection Regulation (GDPR), you have the following rights:

• Right to Access: Request access to the personal data we hold about you.
• Right to Rectification: Request correction of inaccurate personal data.
• Right to Erasure ("Right to be Forgotten"): Request immediate deletion of your medical files and X-rays.
• Right to Restrict Processing: Request limitation of how we use your data.
• Right to Data Portability: Receive your data in a structured, machine-readable format.
• Right to Object: Object to the processing of your personal data.

You can exercise these rights at any time by contacting us.`
    },
    {
      icon: Trash2,
      title: '5. Data Retention',
      content: `We retain your medical data only as long as necessary to facilitate your quote and journey. Specifically:

• Active cases: Data is retained for the duration of your treatment and any follow-up period.
• Completed cases: Health data is deleted within 12 months after your treatment is completed, unless you request earlier deletion.
• Marketing data: Contact details for marketing purposes are retained until you unsubscribe or request deletion.`
    },
  ];

  useSEO({
    title: 'Privacy Policy',
    description: 'How Septentrion Group collects, uses, and protects your personal data in accordance with GDPR.',
    canonicalPath: '/privacy',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
            <Lock size={28} className="text-navy sm:w-8 sm:h-8" />
          </div>
          <h1 className="headline-lg text-navy mb-4">
            Privacy Policy
          </h1>
          <p className="body-text text-slate-custom max-w-2xl mx-auto">
            Septentrion Group SHPK is committed to protecting your personal data in accordance with 
            the European General Data Protection Regulation (GDPR) and Albanian Data Protection laws.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-xl shadow-card p-6 sm:p-8 lg:p-12">
          {/* GDPR Badge */}
          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-navy/10">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-navy text-offwhite text-xs sm:text-sm font-semibold rounded-full">
                <Lock size={14} />
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 bg-sand text-navy text-xs sm:text-sm font-semibold rounded-full">
                <Database size={14} />
                Data Processor
              </span>
            </div>
          </div>

          {/* Privacy Sections */}
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

          {/* Contact for Data Requests */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-navy/10">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 bg-navy rounded-lg">
              <Mail size={24} className="text-sand flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-semibold text-offwhite mb-2">
                  Exercise Your Data Rights
                </h4>
                <p className="body-text text-offwhite/80 mb-3 text-sm sm:text-base">
                  To exercise any of your GDPR rights, including requesting access to your data, 
                  correcting inaccurate information, or requesting deletion of your medical files, 
                  please contact our Data Protection Officer.
                </p>
                <a 
                  href="mailto:privacy@septentriondent.com" 
                  className="inline-flex items-center gap-2 text-sand font-semibold hover:text-sand-light transition-colors"
                >
                  privacy@septentriondent.com
                </a>
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

export default PrivacyPage;
