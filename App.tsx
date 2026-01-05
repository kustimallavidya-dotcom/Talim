
import React, { useState, useEffect, useMemo } from 'react';
import Layout from './components/Layout';
import TalimCard from './components/TalimCard';
import AIChat from './components/AIChat';
import { Language, Talim, KushtiEvent } from './types';
import { MOCK_TALIMS, TRANSLATIONS, DISTRICTS, EQUIPMENTS } from './constants';
import { Search, MapPin, SlidersHorizontal, Plus, Camera, Check, Calendar, Dumbbell, Trophy } from 'lucide-react';

const Splash: React.FC = () => (
  <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-stone-900">
    <div className="absolute inset-0 opacity-40">
      <img 
        src="https://images.unsplash.com/photo-1599058917233-358384457e82?q=80&w=2070&auto=format&fit=crop" 
        alt="Wrestling Background" 
        className="w-full h-full object-cover filter blur-sm scale-110"
      />
    </div>
    <div className="relative z-10 text-center space-y-6 px-6">
      <div className="w-36 h-36 mx-auto saffron-gradient rounded-full border-4 border-white shadow-[0_0_50px_rgba(255,153,51,0.5)] flex items-center justify-center animate-pulse">
        <span className="text-7xl font-black text-white italic">T</span>
      </div>
      <div className="space-y-2 animate-in fade-in slide-in-from-bottom duration-1000">
        <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl italic">TALIM</h1>
        <p className="text-orange-400 font-bold text-xl tracking-[0.2em]">KUSHTI NETWORK</p>
      </div>
      <div className="pt-10 space-y-6">
        <div className="flex justify-center gap-6 text-white/90 font-bold uppercase tracking-widest text-xs">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-600"></div>
            <span>माती</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span>मॅट</span>
          </div>
        </div>
        <div className="w-56 h-1.5 bg-white/10 mx-auto rounded-full overflow-hidden border border-white/5">
          <div className="h-full saffron-gradient animate-[loading_5s_linear_forwards]" style={{ width: '0%' }}></div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 animate-pulse">
        <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-black">
          Developed by milindsoftlabs
        </p>
      </div>
    </div>
    <style>{`
      @keyframes loading {
        from { width: 0%; }
        to { width: 100%; }
      }
    `}</style>
  </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<Language>(Language.EN);
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [talims, setTalims] = useState<Talim[]>(MOCK_TALIMS);
  const [selectedTalim, setSelectedTalim] = useState<Talim | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const t = TRANSLATIONS[lang];

  const filteredTalims = useMemo(() => {
    return talims.filter(talim => {
      const matchesSearch = talim.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          talim.ustadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          talim.location.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistrict = !selectedDistrict || talim.location.district === selectedDistrict;
      return matchesSearch && matchesDistrict;
    });
  }, [talims, searchQuery, selectedDistrict]);

  const handleAddTalim = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your Talim has been submitted for approval.");
    setActiveTab('explore');
  };

  if (showSplash) return <Splash />;

  return (
    <Layout lang={lang} setLang={setLang} activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="p-4 pb-20">
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={20} className="text-stone-400" />
              </div>
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-lg"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute inset-y-0 right-3 flex items-center text-stone-500 hover:text-orange-600 ${showFilters ? 'text-orange-600' : ''}`}
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>

            {showFilters && (
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-4 animate-in fade-in slide-in-from-top-2">
                <div>
                  <label className="text-sm font-bold text-stone-700 block mb-2">{t.filters}</label>
                  <div className="flex flex-wrap gap-2">
                    <select 
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                      className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="">All Districts</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalims.map(talim => (
                <TalimCard 
                  key={talim.id} 
                  talim={talim} 
                  lang={lang} 
                  onClick={(t) => setSelectedTalim(t)} 
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="h-[75vh] w-full bg-stone-200 rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center relative">
             <div className="text-center p-8 z-10">
               <MapPin size={48} className="mx-auto text-orange-600 mb-4 animate-bounce" />
               <h2 className="text-2xl font-black mb-2">Live Map Interface</h2>
               <p className="text-stone-600 mb-6 font-medium">Connecting wrestling enthusiasts globally.</p>
               <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-orange-700 transition-colors">Find Local Akhadas</button>
             </div>
             
             <div className="absolute inset-0 opacity-20 pointer-events-none grayscale">
               <img src="https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png" className="w-full h-full object-cover" />
             </div>

             <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-2xl border border-stone-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl saffron-gradient flex items-center justify-center text-white font-black shrink-0 text-xl shadow-lg">12</div>
                <div>
                  <h4 className="font-black text-stone-800">Nearby Talims</h4>
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">Global Reach • Local Strength</p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-6">
            <h2 className="text-2xl font-black text-stone-800 mb-6 flex items-center gap-2 italic">
              <Plus className="text-orange-600" /> {t.addTalim}
            </h2>
            
            <form onSubmit={handleAddTalim} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-1">Talim Name *</label>
                  <input required type="text" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium" placeholder="e.g. Chhatrapati Shahu Talim" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-1">Chief Ustad *</label>
                    <input required type="text" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium" placeholder="Coach Name" />
                  </div>
                  <div>
                    <label className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-1">Contact No. *</label>
                    <input required type="tel" className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium" placeholder="Primary phone" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-2">{t.facilities}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 p-4 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:border-orange-200 transition-colors">
                      <input type="checkbox" className="w-5 h-5 accent-orange-600" />
                      <span className="text-sm font-black text-stone-700">{t.mudAkhada}</span>
                    </label>
                    <label className="flex items-center gap-2 p-4 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer hover:border-orange-200 transition-colors">
                      <input type="checkbox" className="w-5 h-5 accent-orange-600" />
                      <span className="text-sm font-black text-stone-700">{t.mat}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-stone-400 uppercase tracking-widest block mb-2">Visuals</label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="aspect-square bg-stone-100 border-2 border-dashed border-stone-300 rounded-2xl flex flex-col items-center justify-center text-stone-400 gap-1 cursor-pointer hover:bg-stone-200 transition-all">
                      <Camera size={24} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">Capture</span>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full saffron-gradient text-white font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95 text-lg italic tracking-widest uppercase">
                Submit Talim
              </button>
            </form>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-stone-800 italic">Kushti Events</h2>
                <div className="text-orange-600 font-black text-xs uppercase tracking-widest">Browse All</div>
             </div>
             
             {[1, 2].map(i => (
               <div key={i} className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                  <div className="md:w-1/3 h-52 relative">
                    <img src={`https://picsum.photos/seed/event${i}/600/400`} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-widest shadow-lg">Live Soon</div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.2em]">Regional Championship</span>
                      <h3 className="text-2xl font-black text-stone-800 mb-3 italic">Maharashtra Kesari 2025</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-stone-500 text-sm font-medium">
                          <MapPin size={16} className="text-stone-400" /> <span>Balewadi Stadium, Pune</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-stone-900 text-white py-3 rounded-2xl text-sm font-black uppercase tracking-widest mt-4 hover:bg-black transition-colors">Join Arena</button>
                  </div>
               </div>
             ))}
          </div>
        )}

        {activeTab === 'ai' && <AIChat lang={lang} />}
      </div>

      {/* Detail Overlay */}
      {selectedTalim && (
        <div className="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-md flex items-end justify-center md:items-center p-0 md:p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl relative animate-in slide-in-from-bottom duration-500">
            <button 
              onClick={() => setSelectedTalim(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl text-stone-800 z-10 hover:rotate-90 transition-transform duration-300"
            >
              <Plus size={24} className="rotate-45" />
            </button>
            <div className="h-72 md:h-96 relative">
              <img src={selectedTalim.images[0]} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="bg-orange-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest mb-2 inline-block shadow-lg">Verified Akhada</span>
                <h2 className="text-4xl font-black italic mb-2">{selectedTalim.name}</h2>
                <p className="opacity-90 flex items-center gap-2 font-bold text-sm tracking-wide"><MapPin size={18} className="text-orange-500" /> {selectedTalim.location.address}</p>
              </div>
            </div>
            
            <div className="p-8 space-y-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-5 rounded-3xl border border-stone-100 flex flex-col justify-center">
                   <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Chief Ustad</p>
                   <p className="text-xl font-black text-stone-800 italic">{selectedTalim.ustadName}</p>
                </div>
                <div className="bg-stone-50 p-5 rounded-3xl border border-stone-100 flex flex-col justify-center">
                   <p className="text-[10px] text-stone-400 uppercase font-black tracking-widest mb-1">Batch Timings</p>
                   <p className="text-sm font-black text-stone-800 leading-tight">{selectedTalim.timings}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-stone-800 mb-6 flex items-center gap-3 italic">
                  <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div> Core Infrastructure
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedTalim.facilities.mudAkhada && (
                    <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3 border border-stone-100 shadow-sm">
                      <div className="w-10 h-10 mud-texture rounded-xl shadow-inner border border-stone-800/20" />
                      <span className="text-xs font-black uppercase tracking-tighter">{t.mudAkhada}</span>
                    </div>
                  )}
                  {selectedTalim.facilities.wrestlingMat && (
                    <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3 border border-stone-100 shadow-sm">
                      <div className="w-10 h-10 bg-blue-600 rounded-xl shadow-lg border-2 border-blue-400/30" />
                      <span className="text-xs font-black uppercase tracking-tighter">{t.mat}</span>
                    </div>
                  )}
                  {selectedTalim.facilities.equipment.map(eq => (
                    <div key={eq} className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3 border border-stone-100 shadow-sm">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Dumbbell size={18} className="text-orange-600" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-tighter">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 sticky bottom-0 bg-white/95 backdrop-blur-sm pb-4">
                <button className="flex-1 saffron-gradient text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all text-sm uppercase tracking-[0.2em] italic">Contact Ustad</button>
                <button className="flex-1 bg-stone-900 text-white font-black py-5 rounded-2xl shadow-xl active:scale-95 transition-all text-sm uppercase tracking-[0.2em] italic">Directions</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
