
import React from 'react';
import { Star, MapPin, Trophy, Dumbbell } from 'lucide-react';
import { Talim, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface TalimCardProps {
  talim: Talim;
  lang: Language;
  onClick: (t: Talim) => void;
}

const TalimCard: React.FC<TalimCardProps> = ({ talim, lang, onClick }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-stone-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(talim)}
    >
      <div className="relative h-48 w-full">
        <img 
          src={talim.images[0]} 
          alt={talim.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold">{talim.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-stone-800 leading-tight">{talim.name}</h3>
        <p className="text-stone-500 text-sm mb-2 font-medium">Ustad: {talim.ustadName}</p>
        
        <div className="flex items-start gap-1 text-stone-600 mb-3">
          <MapPin size={16} className="shrink-0 mt-0.5" />
          <span className="text-xs">{talim.location.district}, {talim.location.city}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {talim.facilities.mudAkhada && (
            <span className="bg-orange-50 text-orange-700 text-[10px] px-2 py-0.5 rounded-full border border-orange-100">
              {t.mudAkhada}
            </span>
          )}
          {talim.facilities.wrestlingMat && (
            <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full border border-blue-100">
              {t.mat}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-1 text-stone-500 text-xs">
            <Trophy size={14} className="text-yellow-600" />
            <span>{talim.achievements.length} Medals</span>
          </div>
          <button className="text-orange-600 text-xs font-bold uppercase tracking-wider">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalimCard;
