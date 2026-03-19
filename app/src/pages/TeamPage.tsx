import BackButton from '../components/BackButton';
import { useSEO } from '../hooks/useSEO';

import { Users, Award, Globe, Heart } from 'lucide-react';

const TeamPage = () => {

  const values = [
    {
      icon: Heart,
      title: 'Patient First',
      description: 'Every decision we make puts patient care and comfort at the center.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We partner only with accredited clinics and verified providers.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting patients from around the world with Albanian healthcare.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together with clinics, hotels, and transport providers.'
    },
  ];

  const teamMembers = [
    {
      name: 'Leadership Team',
      role: 'Strategic Direction',
      description: 'Experienced professionals in healthcare management and international business development.'
    },
    {
      name: 'Patient Coordinators',
      role: 'Care Management',
      description: 'Dedicated specialists who guide patients through every step of their medical journey.'
    },
    {
      name: 'Operations Team',
      role: 'Logistics & Support',
      description: 'Experts in travel planning, accommodation, and on-ground support services.'
    },
    {
      name: 'Partner Relations',
      role: 'Network Management',
      description: 'Building and maintaining relationships with clinics and service providers.'
    },
  ];

  useSEO({
    title: 'Meet the Team',
    description: 'Meet the dedicated professionals at Septentrion Group who coordinate your entire medical tourism experience in Albania.',
    canonicalPath: '/team',
  });

  return (
    <div className="min-h-screen bg-offwhite pt-20 sm:pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-6">
        <BackButton />
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] mb-12 sm:mb-16">
        <img
          src="/team_photo.jpg"
          alt="Our Team"
          className="w-full h-full object-cover"
            loading="lazy" />
        <div className="absolute inset-0 bg-navy/60 flex items-center justify-center">
          <div className="text-center px-4 sm:px-6">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sand mb-4 sm:mb-6">
              <Users size={28} className="text-navy" />
            </div>
            <h1 className="headline-lg text-offwhite mb-4">
              Meet the Team
            </h1>
            <p className="body-text text-offwhite/80 max-w-2xl mx-auto">
              Dedicated professionals committed to making your medical tourism experience 
              seamless, safe, and successful.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 mb-16">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          Our Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-card p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-sand transition-colors">
                  <Icon size={26} className="text-navy" />
                </div>
                <h3 className="font-display font-bold text-lg text-navy mb-2">
                  {value.title}
                </h3>
                <p className="body-text text-slate-custom text-sm">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Structure */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy text-center mb-8 sm:mb-12">
          How We're Organized
        </h2>
        <div className="space-y-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-card p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-offwhite font-display font-bold text-lg">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-sand font-semibold text-sm mb-2">
                  {member.role}
                </p>
                <p className="body-text text-slate-custom">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 mt-16">
        <div className="bg-sand rounded-xl p-6 sm:p-10 text-center">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-navy mb-4">
            Want to Join Our Team?
          </h2>
          <p className="body-text text-navy/80 mb-6">
            We're always looking for talented individuals passionate about healthcare and hospitality.
          </p>
          <a 
            href="mailto:careers@septentrion.group"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
