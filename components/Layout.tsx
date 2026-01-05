
import React from 'react';
import { Menu, Search, PlusCircle, User, Map, LayoutGrid, BrainCircuit, Calendar, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, activeTab, setActiveTab }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={() => setActiveTab('explore')}>
          <div className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer">
            T
          </div>
          <h1 className="text-2xl font-bold text-orange-700 tracking-tight cursor-pointer">{t.appName}</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as Language)}
            className="text-sm border rounded p-1 bg-stone-50 outline-none font-bold text-stone-700"
          >
            <option value={Language.EN}>English</option>
            <option value={Language.MR}>मराठी</option>
            <option value={Language.HI}>हिंदी</option>
          </select>
          <button className="p-2 rounded-full hover:bg-stone-100">
            <User size={24} className="text-stone-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-10 max-w-5xl mx-auto w-full relative">
        {children}
        
        {/* Persistent Developer Credit at the bottom */}
        <div className="py-12 text-center border-t border-stone-100 mt-10">
          <p className="text-stone-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
            Technology Partner
          </p>
          <p className="text-stone-600 text-sm font-medium">
            Developed by <span className="text-orange-600 font-black">milindsoftlabs</span>
          </p>
        </div>
      </main>

      {/* Floating Feedback Button */}
      <a 
        href="mailto:milindsoftlabs@gmail.com?subject=Talim App Feedback & Suggestion"
        className="fixed bottom-24 right-4 z-40 bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all active:scale-95 group"
        title="Send Suggestion / Feedback"
      >
        <MessageSquare size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-sm whitespace-nowrap">
          फीडबॅक द्या
        </span>
      </a>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 flex items-center justify-around py-3 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <NavItem 
          icon={<LayoutGrid size={24} />} 
          label={t.explore} 
          active={activeTab === 'explore'} 
          onClick={() => setActiveTab('explore')} 
        />
        <NavItem 
          icon={<Map size={24} />} 
          label="Maps" 
          active={activeTab === 'map'} 
          onClick={() => setActiveTab('map')} 
        />
        <NavItem 
          icon={<PlusCircle size={28} className="text-orange-600" />} 
          label={t.addTalim} 
          active={activeTab === 'add'} 
          onClick={() => setActiveTab('add')} 
        />
        <NavItem 
          icon={<Calendar size={24} />} 
          label={t.events} 
          active={activeTab === 'events'} 
          onClick={() => setActiveTab('events')} 
        />
        <NavItem 
          icon={<BrainCircuit size={24} />} 
          label="AI" 
          active={activeTab === 'ai'} 
          onClick={() => setActiveTab('ai')} 
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-orange-600' : 'text-stone-500 hover:text-stone-700'}`}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default Layout;
