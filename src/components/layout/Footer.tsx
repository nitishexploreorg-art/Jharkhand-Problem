import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, Shield, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'contact' | 'privacy' | 'accessibility' | null>(null);
  const { language, t } = useApp();
  const isHi = language === 'hi';

  return (
    <footer className="bg-[#060d0a] text-slate-300 pt-10 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#172c21]">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center font-bold text-xs shadow-inner">
                JH
              </div>
              <h3 className="text-white font-extrabold text-lg tracking-tight">
                Samadhan Jharkhand{' '}
                <span className="text-emerald-400 font-normal text-sm">
                  {isHi ? '| समाधान झारखंड' : '| State Grievance Innovation Exchange'}
                </span>
              </h3>
            </div>
            <p className="text-xs text-[#8ea598] max-w-md leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold">
            <Link to="/about" className="text-[#a5b9ad] hover:text-emerald-300 transition-colors">
              {isHi ? 'हमारे बारे में' : 'About Us'}
            </Link>
            <button
              type="button"
              onClick={() => setActiveModal('contact')}
              className="text-[#a5b9ad] hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {isHi ? 'संपर्क निर्देशिका' : 'Contact Directory'}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="text-[#a5b9ad] hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </button>
            <Link to="/social-audit" className="text-[#a5b9ad] hover:text-emerald-300 transition-colors">
              {isHi ? 'सामाजिक ऑडिट' : 'Social Audit'}
            </Link>
            <button
              type="button"
              onClick={() => setActiveModal('accessibility')}
              className="text-[#a5b9ad] hover:text-emerald-300 transition-colors cursor-pointer"
            >
              {isHi ? 'सुलभता विवरण' : 'Accessibility'}
            </button>
          </nav>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8ea598] gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{t('footer.copyright')}</span>
          </div>

          <div className="text-[11px] text-[#6e8a7c]">
            {t('footer.helpline')}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title={isHi ? 'संपर्क निर्देशिका' : 'Contact Directory'}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3.5 bg-[#0e2017] border border-[#1f3d2f] rounded-xl space-y-1 text-emerald-200">
            <strong className="block text-sm font-bold text-white">
              {isHi ? 'मुख्यमंत्री जनसंवाद केंद्र' : 'Chief Minister Public Grievance Helpline'}
            </strong>
            <p className="text-emerald-300">
              {isHi
                ? 'टोल-फ्री हेल्पलाइन संख्या: 181 (प्रातः 8:00 से रात्रि 8:00 तक)'
                : 'Toll-Free Helpline Number: 181 (8:00 AM - 8:00 PM)'}
            </p>
          </div>

          <div className="space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>
                {isHi ? 'ईमेल:' : 'Email:'} <strong className="text-white">samadhan@jharkhand.gov.in</strong>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-emerald-400 mt-0.5" />
              <span className="leading-relaxed">
                {isHi
                  ? 'पता: योजना एवं विकास विभाग, प्रोजेक्ट भवन, धुर्वा, राँची - 834004, झारखण्ड'
                  : 'Address: Department of Planning & Development, Project Bhawan, Dhurwa, Ranchi - 834004, Jharkhand'}
              </span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title={isHi ? 'गोपनीयता नीति' : 'Privacy Policy'}
        maxWidth="md"
      >
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            1. <strong className="text-white">{isHi ? 'नागरिक पहचान गोपनीयता:' : 'Citizen Privacy:'}</strong>{' '}
            {isHi
              ? 'नागरिक द्वारा दर्ज की गई समस्या पर उनका मोबाइल नंबर केवल अंतिम चार अंकों के साथ प्रदर्शित किया जाता है।'
              : 'Citizen phone numbers are masked displaying only the last four digits.'}
          </p>
          <p>
            2. <strong className="text-white">{isHi ? 'साक्ष्य फोटो एवं जीपीएस:' : 'Photo & GPS Evidence:'}</strong>{' '}
            {isHi
              ? 'अपलोड की गई तस्वीरें केवल समस्या के सत्यापन, एआई विश्लेषण एवं छात्र प्रोटोटाइप विकास हेतु उपयोग की जाती हैं।'
              : 'Uploaded photographic evidence and geolocation data are utilized strictly for problem verification and student solution development.'}
          </p>
          <p>
            3. <strong className="text-white">{isHi ? 'प्रोटोटाइप प्रकटीकरण:' : 'Prototype Compliance:'}</strong>{' '}
            {isHi
              ? 'यह सॉफ्टवेयर एक हैकाथॉन प्रोटोटाइप है। कोई भी वित्तीय या व्यक्तिगत संवेदनशील डेटा तीसरे पक्ष के साथ साझा नहीं किया जाता।'
              : 'This platform is a hackathon innovation prototype. No sensitive personal data is shared with unverified third parties.'}
          </p>
        </div>
      </Modal>

      {/* Accessibility Modal */}
      <Modal
        isOpen={activeModal === 'accessibility'}
        onClose={() => setActiveModal(null)}
        title={isHi ? 'सुलभता विवरण' : 'Accessibility Statement'}
        maxWidth="md"
      >
        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            1. <strong className="text-white">{isHi ? 'सरल हिंदी व अंग्रेजी भाषा:' : 'Bilingual Support:'}</strong>{' '}
            {isHi
              ? 'ग्रामीण और आम नागरिकों के लिए स्पष्ट और सरल भाषा में सभी शीर्षक और विकल्प उपलब्ध हैं।'
              : 'Simple, natural Hindi and clear English accessible for citizens across all literacy levels.'}
          </p>
          <p>
            2. <strong className="text-white">{isHi ? 'उच्च कंट्रास्ट एवं बड़े टच बटन:' : 'High Contrast & Touch Targets:'}</strong>{' '}
            {isHi
              ? 'मोबाइल फोन एवं कम रोशनी में भी स्पष्ट रूप से दिखाई देने वाले रंग और बटन आकार।'
              : 'Designed with minimum 44px touch targets and accessible contrast for outdoor sunlight readability.'}
          </p>
          <p>
            3. <strong className="text-white">{isHi ? 'स्क्रीन रीडर अनुकूल:' : 'Screen Reader Ready:'}</strong>{' '}
            {isHi
              ? 'सभी छवियों में उपयुक्त ऑल्ट टैग और सिमेंटिक एचटीएमएल प्रयुक्त है।'
              : 'Semantic HTML5 structure and descriptive alt tags across all civic evidence media.'}
          </p>
        </div>
      </Modal>
    </footer>
  );
};
