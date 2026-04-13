// frontend/src/pages/HelpPage.jsx
import React from 'react';
import { Phone, Mail, MessageCircle, FileText, BookOpen, HelpCircle } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Help & Support</h1>
        <p className="text-gray-400 text-sm">Get assistance and find answers to your questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Contact */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Phone size={24} className="text-[#FF3B5C]" />
            <h2 className="text-lg font-semibold text-white">Emergency Hotline</h2>
          </div>
          <p className="text-[#00D4FF] text-3xl font-bold">+91-11-12345678</p>
          <p className="text-gray-400 text-sm mt-2">24/7 Emergency Response Center</p>
          <p className="text-gray-500 text-xs mt-4">For immediate assistance during disasters</p>
        </div>

        {/* Email Support */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail size={24} className="text-[#00D4FF]" />
            <h2 className="text-lg font-semibold text-white">Email Support</h2>
          </div>
          <p className="text-white text-lg">support@disasterai.com</p>
          <p className="text-gray-400 text-sm mt-2">Technical Support</p>
          <p className="text-white text-lg mt-2">emergency@disasterai.com</p>
          <p className="text-gray-400 text-sm">Emergency Coordination</p>
        </div>

        {/* Live Chat */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle size={24} className="text-[#7B2FFF]" />
            <h2 className="text-lg font-semibold text-white">Live Chat</h2>
          </div>
          <button className="px-4 py-2 bg-[#00D4FF] text-gray-900 rounded-lg hover:bg-[#00D4FF]/90 transition-colors">
            Start Live Chat
          </button>
          <p className="text-gray-500 text-xs mt-3">Available 24/7 for emergency support</p>
        </div>

        {/* Documentation */}
        <div className="bg-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={24} className="text-[#FFB020]" />
            <h2 className="text-lg font-semibold text-white">Documentation</h2>
          </div>
          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            View User Guide
          </button>
          <p className="text-gray-500 text-xs mt-3">Comprehensive documentation and tutorials</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={20} className="text-[#00D4FF]" />
          <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-medium">How accurate are the predictions?</h3>
            <p className="text-gray-400 text-sm mt-1">Our AI models achieve 94.7% accuracy for earthquake predictions, with real-time updates for rainfall and flood forecasts.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-medium">How often is the data updated?</h3>
            <p className="text-gray-400 text-sm mt-1">Data is updated in real-time from USGS, IRIS, and NOAA sources. Predictions refresh every 5-10 minutes.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-medium">How can I volunteer for disaster response?</h3>
            <p className="text-gray-400 text-sm mt-1">Go to Volunteers section in the sidebar and click "Register Volunteer". Fill in your details and skills to join our network.</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="text-white font-medium">What should I do during a disaster alert?</h3>
            <p className="text-gray-400 text-sm mt-1">Follow the instructions in the alert, stay calm, and move to designated safe zones. Check the map for nearby shelters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}