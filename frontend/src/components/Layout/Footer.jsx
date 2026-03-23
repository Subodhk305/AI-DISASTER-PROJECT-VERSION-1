export default function Footer() {
  return (
    <footer className="border-t border-[#1A2540] py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>© 2024 AI Unified Disaster System</span>
          <span>•</span>
          <span>Powered by AI/ML</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#00D4FF] transition-colors">About</a>
          <a href="#" className="hover:text-[#00D4FF] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#00D4FF] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#00D4FF] transition-colors">Contact</a>
        </div>
        <div className="text-gray-600">
          Real-time predictions • 24/7 Monitoring • AI-Driven Alerts
        </div>
      </div>
    </footer>
  );
}