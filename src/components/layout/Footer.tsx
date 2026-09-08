import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Globe, Shield, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Modal } from '../common/Modal';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'contact' | 'privacy' | 'accessibility' | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-8 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center font-bold text-xs">
                JH
              </div>
              <h3 className="text-white font-extrabold text-lg tracking-tight">
                Samadhan Jharkhand <span className="text-emerald-400 font-normal text-sm">| समाधान झारखंड</span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              झारखंड के आम नागरिकों की वास्तविक समस्याओं को विश्वविद्यालयी नवाचार और सीएसआर सहयोग से हल करने का राज्य मंच।
            </p>
          </div>

          {/* Requested Links: About, Contact, Privacy, Social Audit, Accessibility */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold">
            <Link to="/about" className="text-slate-300 hover:text-emerald-400 transition-colors">
              About (हमारे बारे में)
            </Link>
            <button
              type="button"
              onClick={() => setActiveModal('contact')}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Contact (संपर्क)
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Privacy (गोपनीयता नीति)
            </button>
            <Link to="/social-audit" className="text-slate-300 hover:text-emerald-400 transition-colors">
              Social Audit (सामाजिक ऑडिट)
            </Link>
            <button
              type="button"
              onClick={() => setActiveModal('accessibility')}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Accessibility (सुलभता)
            </button>
          </nav>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>© 2026 Government of Jharkhand • Prototype for Hackathon Demonstration</span>
          </div>

          <div className="text-[11px] text-slate-400">
            सीएम हेल्पलाइन: <strong className="text-emerald-400">181</strong> (टोल-फ्री) | आपातकालीन: <strong className="text-emerald-400">112</strong>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="Contact Us / संपर्क निर्देशिका"
        titleHi="सहायता डेस्क"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-emerald-950">
            <strong className="block text-sm font-bold">मुख्यमंत्री जनसंवाद केंद्र (CM Helpline)</strong>
            <p>टोल-फ्री हेल्पलाइन संख्या: <strong>181</strong> (प्रातः 8:00 से रात्रि 8:00 तक)</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>ईमेल: <strong>samadhan@jharkhand.gov.in</strong></span>
            </div>
            <div className="flex items-start gap-2">
              <Globe className="w-4 h-4 text-emerald-600 mt-0.5" />
              <span>पता: योजना एवं विकास विभाग, प्रोजेक्ट भवन, धुर्वा, राँची - 834004, झारखण्ड</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy / गोपनीयता नीति"
        titleHi="डेटा सुरक्षा"
        maxWidth="md"
      >
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            1. <strong>नागरिक पहचान गोपनीयता:</strong> नागरिक द्वारा दर्ज की गई समस्या पर उनका मोबाइल नंबर केवल अंतिम चार अंकों के साथ प्रदर्शित किया जाता है।
          </p>
          <p>
            2. <strong>साक्ष्य फोटो एवं जीपीएस:</strong> अपलोड की गई तस्वीरें केवल समस्या के सत्यापन, एआई विश्लेषण एवं छात्र प्रोटोटाइप विकास हेतु उपयोग की जाती हैं।
          </p>
          <p>
            3. <strong>प्रोटोटाइप प्रकटीकरण:</strong> यह सॉफ्टवेयर एक हैकाथॉन प्रोटोटाइप है। कोई भी वित्तीय या व्यक्तिगत संवेदनशील डेटा तीसरे पक्ष के साथ साझा नहीं किया जाता।
          </p>
        </div>
      </Modal>

      {/* Accessibility Modal */}
      <Modal
        isOpen={activeModal === 'accessibility'}
        onClose={() => setActiveModal(null)}
        title="Accessibility / सुलभता विकल्प"
        titleHi="दिव्यांगजन सुलभता"
        maxWidth="md"
      >
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            1. <strong>सरल हिंदी व अंग्रेजी भाषा:</strong> ग्रामीण और आम नागरिकों के लिए स्पष्ट और सरल भाषा में सभी शीर्षक और विकल्प उपलब्ध हैं।
          </p>
          <p>
            2. <strong>उच्च कंट्रास्ट एवं बड़े टच बटन:</strong> मोबाइल फोन एवं कम रोशनी में भी स्पष्ट रूप से दिखाई देने वाले रंग और बटन आकार।
          </p>
          <p>
            3. <strong>स्क्रीन रीडर अनुकूल:</strong> सभी छवियों में उपयुक्त ऑल्ट टैग और सिमेंटिक एचटीएमएल प्रयुक्त है।
          </p>
        </div>
      </Modal>
    </footer>
  );
};
