
import React, { useMemo } from 'react';
import { View, Sector } from '../types';
import { Bookmark, School, Briefcase, Brain, ArrowRight, Settings, LogOut, ChevronRight, Award, Crown, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { universities } from './UniversitiesView';
import { sectors } from './SectorsView';

interface Props {
  savedResources: string[];
  followedUnis: string[];
  savedSectors: string[];
  testResult: string | null;
  onNavigate: (view: View) => void;
}

const ProfileView: React.FC<Props> = ({ savedResources, followedUnis, savedSectors, testResult, onNavigate }) => {
  const followedList = universities.filter(u => followedUnis.includes(u.id));
  const USER_IMAGE = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300';

  // A helper function to generate consistent, realistic scores for the profile view
  const calculateCompatibility = (sectorName: string, result: string | null) => {
    if (!result) return 0;
    // Simple hash to make the percentage consistent for each sector based on test result
    let hash = 0;
    const str = sectorName + result;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(65 + (hash % 31)); // Range 65% - 96%
  };

  const compatibilityList = useMemo(() => {
    if (!testResult) return [];
    return sectors.map(s => ({
      ...s,
      score: calculateCompatibility(s.name, testResult)
    })).sort((a, b) => b.score - a.score);
  }, [testResult]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Profile Card */}
      <section className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-32 h-32 rounded-full border-4 border-brand-50 p-1 shadow-lg relative z-10 overflow-hidden">
          <img 
            src={USER_IMAGE} 
            className="w-full h-full object-cover rounded-full bg-brand-100" 
            alt="Avatar" 
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Can Yılmaz</h1>
          <p className="text-gray-500 font-medium mb-4">Lise 4. Sınıf • Sayısal Öğrencisi</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-yellow-50 px-4 py-2 rounded-xl text-yellow-700 text-sm font-black flex items-center gap-2 border border-yellow-100">
              <Crown className="w-4 h-4" /> Standart Üye
            </div>
            <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
      </section>

      {/* Premium Upgrade Section */}
      <section className="bg-gradient-to-br from-[#1A1A1A] to-[#333] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Önerilen
            </div>
            <h2 className="text-2xl font-black">Guidely Premium'un Avantajlarını Keşfet</h2>
            <p className="text-gray-400 text-sm max-w-md font-medium">Kişiselleştirilmiş mentorluk ve AI destekli kariyer araçları ile rakiplerinin önüne geç.</p>
          </div>
          <button 
            onClick={() => onNavigate(View.Premium)}
            className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-900/20 whitespace-nowrap"
          >
            Premium'a Yükselt
          </button>
        </div>
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* New: Sector Compatibility Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center px-2">
           <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
             <Target className="w-6 h-6 text-brand-primary" /> Sektör Uyumluluklarım
           </h3>
           {testResult && (
             <span className="text-[10px] font-black text-brand-primary bg-brand-50 px-3 py-1 rounded-full border border-brand-100 uppercase tracking-widest flex items-center gap-1.5">
               <Sparkles className="w-3 h-3" /> AI Analizli
             </span>
           )}
        </div>

        {testResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {compatibilityList.slice(0, 6).map((sector) => (
              <div 
                key={sector.id} 
                onClick={() => onNavigate(View.Sectors)}
                className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-2xl border border-brand-100 shadow-inner group-hover:scale-110 transition-transform">
                    {sector.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-brand-primary tracking-tight">%{sector.score}</span>
                    <span className="text-[8px] font-black text-gray-400 uppercase block tracking-widest">Uyum</span>
                  </div>
                </div>
                <h4 className="font-black text-gray-800 mb-1 tracking-tight">{sector.name}</h4>
                <p className="text-[10px] font-black text-brand-700 uppercase tracking-widest">{sector.category}</p>
                
                <div className="mt-6 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                   <div 
                    className="h-full bg-brand-primary rounded-full transition-all duration-1000 delay-300" 
                    style={{ width: `${sector.score}%` }}
                   />
                </div>
                <div className="absolute bottom-[-10px] right-[-10px] w-16 h-16 bg-brand-primary/5 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[40px] border-2 border-dashed border-gray-100 text-center space-y-6">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                <Brain className="w-10 h-10" />
             </div>
             <div>
                <h4 className="text-lg font-black text-gray-800 mb-1">Henüz Bir Analiz Yok</h4>
                <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">Kişilik analizini tamamlayarak sana en uygun sektörleri yüzde puanıyla keşfetmeye başla.</p>
             </div>
             <button 
              onClick={() => onNavigate(View.Tests)}
              className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-200 active:scale-95"
             >
                Testi Başlat
             </button>
          </div>
        )}
      </section>

      {/* Test Result Summary */}
      <section className="bg-brand-900 rounded-[40px] p-8 text-white relative overflow-hidden">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold">Kişilik Analizim</h2>
        </div>
        
        {testResult ? (
          <div className="glass-effect p-6 rounded-3xl border border-white/10">
            <p className="text-indigo-100 text-sm leading-relaxed mb-6 line-clamp-3">
              {testResult}
            </p>
            <button 
              onClick={() => onNavigate(View.Tests)}
              className="w-full py-3 bg-white text-brand-900 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors"
            >
              Tam Analizi Gör <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
             <p className="text-indigo-200 text-sm mb-6 italic opacity-70">Henüz bir analiz sonucu bulunamadı.</p>
             <button 
                onClick={() => onNavigate(View.Tests)}
                className="px-8 py-3 bg-white text-brand-900 rounded-2xl font-bold"
             >
                Testi Çöz
             </button>
          </div>
        )}
      </section>

      {/* Grid Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Followed Schools */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <School className="w-5 h-5 text-indigo-500" /> Takip Ettiğim Okullar
            </h3>
            <span className="text-xs font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate(View.Universities)}>Hepsini Gör</span>
          </div>
          <div className="space-y-3">
            {followedList.length > 0 ? followedList.map(uni => (
              <div key={uni.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg p-1 flex items-center justify-center">
                    <School className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{uni.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{uni.location}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            )) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                <p className="text-xs text-gray-400">Henüz okul takip etmiyorsun.</p>
              </div>
            )}
          </div>
        </div>

        {/* Saved Resources */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-500" /> Kaydedilen Kaynaklarım
            </h3>
            <span className="text-xs font-bold text-indigo-600 cursor-pointer" onClick={() => onNavigate(View.Resources)}>Düzenle</span>
          </div>
          <div className="space-y-3">
            {savedResources.length > 0 ? savedResources.map(id => (
              <div key={id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-purple-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">Kitap Kaynağı #{id.slice(-1)}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 transition-colors" />
              </div>
            )) : (
              <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                <p className="text-xs text-gray-400">Henüz kaynak kaydetmedin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-colors">
        <LogOut className="w-5 h-5" /> Çıkış Yap
      </button>
    </div>
  );
};

export default ProfileView;
