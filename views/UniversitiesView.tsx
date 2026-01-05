
import React, { useState } from 'react';
import { University } from '../types';
import { 
  Search, MapPin, Award, Users, PlusCircle, Check, Filter, Globe, School, Smile, 
  ArrowLeft, Building2, Map, LayoutGrid, Heart, Music, Coffee, Bed, CheckCircle2,
  Trophy, Sparkles
} from 'lucide-react';

export const universities: University[] = [
  { 
    id: 'itu', 
    name: 'İstanbul Teknik Üniversitesi', 
    logo: 'itu_logo', 
    location: 'İstanbul', 
    researchScore: 92, 
    description: 'Türkiye\'nin en köklü mühendislik okulu, teknik eğitimin öncüsü.', 
    followers: 15400,
    studentCount: 35000,
    faculties: ['Bilgisayar ve Bilişim', 'İnşaat', 'Mimarlık', 'Maden', 'Uçak ve Uzay Bilimleri'],
    campusSize: '2.5 Milyon m²',
    clubCount: 200,
    activityLevel: 'Çok Aktif',
    dorms: [
      { type: 'Üniversite', capacity: '2-4 Kişilik', amenities: ['7/24 Sıcak Su', 'Ücretsiz Wi-Fi', 'Çamaşırhane', 'Çalışma Odası'] },
      { type: 'KYK', capacity: '4-6 Kişilik', amenities: ['Yemekhane', 'Spor Alanı', 'Güvenlik'] }
    ]
  },
  { 
    id: 'odtu', 
    name: 'Ortadoğu Teknik Üniversitesi', 
    logo: 'odtu_logo', 
    location: 'Ankara', 
    researchScore: 95, 
    description: 'Uluslararası standartlarda eğitim veren, Türkiye\'nin en prestijli devlet üniversitelerinden biri.', 
    followers: 18200,
    studentCount: 28000,
    faculties: ['Mühendislik', 'Fen Edebiyat', 'İktisadi ve İdari Bilimler', 'Eğitim', 'Mimarlık'],
    campusSize: '4.5 Milyon m²',
    clubCount: 100,
    activityLevel: 'Yüksek',
    dorms: [
      { type: 'Üniversite', capacity: '1-4 Kişilik', amenities: ['Mutfak', 'Spor Salonu', 'Kütüphane', 'Kafeterya'] }
    ]
  },
  { 
    id: 'bogazici', 
    name: 'Boğaziçi Üniversitesi', 
    logo: 'bogazici_logo', 
    location: 'İstanbul', 
    researchScore: 96, 
    description: 'Eğitim kalitesi ve kampüs kültürü ile öne çıkan, Türkiye\'nin en seçkin kurumlarından.', 
    followers: 14900,
    studentCount: 16000,
    faculties: ['Eğitim', 'Fen-Edebiyat', 'İktisadi ve İdari Bilimler', 'Mühendislik', 'Yönetim Bilimleri'],
    campusSize: '1.2 Milyon m²',
    clubCount: 45,
    activityLevel: 'Kültürel Odaklı',
    dorms: [
      { type: 'Üniversite', capacity: '2-8 Kişilik', amenities: ['Boğaz Manzarası (Bazı odalar)', 'Sosyalleşme Alanları', 'Etüd Odaları'] }
    ]
  },
  { 
    id: 'koc', 
    name: 'Koç Üniversitesi', 
    logo: 'koc_logo', 
    location: 'İstanbul', 
    researchScore: 89, 
    description: 'Dünya standartlarında araştırma imkanları ve mükemmeliyetçi eğitim anlayışı.', 
    followers: 9200,
    studentCount: 10000,
    faculties: ['Tıp', 'Hukuk', 'Mühendislik', 'İnsani Bilimler ve Edebiyat', 'Fen'],
    campusSize: '230 Bin m²',
    clubCount: 85,
    activityLevel: 'Çok Yoğun',
    dorms: [
      { type: 'Vakıf', capacity: '1-3 Kişilik', amenities: ['Banyo (Oda içinde)', 'Haftalık Temizlik', 'Yüksek Hızlı Fiber', 'Sinema Odası'] }
    ]
  }
];

interface Props {
  followedIds: string[];
  onToggleFollow: (id: string) => void;
}

const UniversitiesView: React.FC<Props> = ({ followedIds, onToggleFollow }) => {
  const [minSatisfaction, setMinSatisfaction] = useState(0);
  const [selectedUniId, setSelectedUniId] = useState<string | null>(null);

  const selectedUni = universities.find(u => u.id === selectedUniId);
  const filtered = universities.filter(u => u.researchScore >= minSatisfaction);

  const UniversityLogo: React.FC<{ name: string; size?: string }> = ({ name, size = "w-24 h-24" }) => {
    return (
      <div className={`${size} bg-brand-50 rounded-3xl flex-shrink-0 flex items-center justify-center p-3 border border-brand-100 shadow-inner group-hover:border-brand-200 transition-all duration-300 relative`}>
        <School className="w-12 h-12 text-brand-primary group-hover:scale-110 transition-transform" />
        <div className="absolute -bottom-1 -right-1 bg-brand-primary text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <Globe className="w-2.5 h-2.5" />
        </div>
      </div>
    );
  };

  if (selectedUni) {
    return (
      <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
        <button 
          onClick={() => setSelectedUniId(null)}
          className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all group"
        >
          <ArrowLeft className="w-5 h-5" /> Üniversite Listesine Dön
        </button>

        {/* Profile Hero */}
        <section className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
            <UniversityLogo name={selectedUni.name} />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">{selectedUni.name}</h1>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-black rounded-full flex items-center gap-1 uppercase tracking-wider">
                  <Smile className="w-3 h-3" /> %{selectedUni.researchScore} Memnuniyet
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed text-lg font-medium max-w-2xl">{selectedUni.description}</p>
            </div>
            <button 
              onClick={() => onToggleFollow(selectedUni.id)}
              className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                followedIds.includes(selectedUni.id) 
                  ? 'bg-brand-50 text-brand-primary border border-brand-100' 
                  : 'bg-brand-primary text-white shadow-xl shadow-brand-200 hover:bg-brand-600'
              }`}
            >
              {followedIds.includes(selectedUni.id) ? 'Takibi Bırak' : 'Takip Et'}
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/50 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Öğrenci Sayısı</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.studentCount?.toLocaleString()}+</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Map className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kampüs Alanı</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.campusSize}</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Öğrenci Kulübü</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.clubCount}+ Kulüp</p>
          </div>
          <div className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Etkinlik Seviyesi</p>
            <p className="text-xl font-black text-gray-800">{selectedUni.activityLevel}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Faculties */}
          <section className="lg:col-span-2 bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-brand-primary" /> Fakülteler ve Bölümler
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedUni.faculties?.map((faculty, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-brand-200 transition-all flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm">
                    {idx + 1}
                  </div>
                  <span className="font-bold text-gray-700">{faculty} Fakültesi</span>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 bg-brand-50 rounded-[30px] border border-brand-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-brand-700 uppercase tracking-[0.2em] mb-1">Sosyal Yaşam</p>
                <h4 className="font-black text-gray-800">Kampüs İçi Kültürel & Sportif Faaliyetler</h4>
              </div>
              <div className="flex gap-2">
                <div className="p-3 bg-white rounded-xl shadow-sm"><Music className="w-4 h-4 text-brand-primary" /></div>
                <div className="p-3 bg-white rounded-xl shadow-sm"><Trophy className="w-4 h-4 text-brand-primary" /></div>
                <div className="p-3 bg-white rounded-xl shadow-sm"><Coffee className="w-4 h-4 text-brand-primary" /></div>
              </div>
            </div>
          </section>

          {/* Dormitories */}
          <section className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
              <Bed className="w-6 h-6 text-brand-primary" /> Konaklama (Yurtlar)
            </h3>
            <div className="space-y-6">
              {selectedUni.dorms?.map((dorm, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-black uppercase rounded-lg">
                      {dorm.type} YURDU
                    </span>
                    <span className="text-xs font-bold text-gray-400">{dorm.capacity}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {dorm.amenities.map((amenity, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> {amenity}
                      </div>
                    ))}
                  </div>
                  {idx < selectedUni.dorms!.length - 1 && <div className="border-b border-gray-100 pt-2"></div>}
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 border border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-brand-50 hover:text-brand-primary hover:border-brand-200 transition-all">
              Yurt Başvuru Kılavuzu
            </button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Üniversite Rehberi</h1>
          <p className="text-gray-500 font-medium">Hedeflediğin kampüsü ve öğrenci memnuniyetini detaylı incele.</p>
        </div>
        <div className="flex gap-2">
           <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-200 text-sm font-bold shadow-sm">
             <Smile className="w-4 h-4 text-brand-primary" /> 
             <span className="text-gray-400 font-black">Memnuniyet:</span>
             <span className="text-brand-primary w-8">%{minSatisfaction}+</span>
             <input 
              type="range" 
              min="0" max="100" 
              value={minSatisfaction} 
              onChange={(e) => setMinSatisfaction(Number(e.target.value))}
              className="accent-brand-primary ml-2 cursor-pointer w-24 h-1.5 bg-gray-100 rounded-lg appearance-none"
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filtered.map((uni) => (
          <div key={uni.id} className="bg-white rounded-[40px] p-7 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500">
            <UniversityLogo name={uni.name} />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-gray-800 leading-tight group-hover:text-brand-primary transition-colors">{uni.name}</h3>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-wider mb-6">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors border border-gray-100"><MapPin className="w-3.5 h-3.5" /> {uni.location}</span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-xl text-yellow-600 border border-yellow-100"><Smile className="w-3.5 h-3.5" /> %{uni.researchScore} Memnuniyet</span>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 rounded-xl text-brand-600 border border-brand-100"><Users className="w-3.5 h-3.5" /> {uni.followers.toLocaleString()} Takipçi</span>
              </div>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed line-clamp-2 font-medium">
                {uni.description}
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => onToggleFollow(uni.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    followedIds.includes(uni.id) 
                      ? 'bg-brand-50 text-brand-primary border border-brand-100' 
                      : 'bg-brand-primary text-white shadow-xl shadow-brand-200 hover:bg-brand-600 active:scale-[0.98]'
                  }`}
                >
                  {followedIds.includes(uni.id) ? <><Check className="w-4 h-4" /> Takip Ediliyor</> : <><PlusCircle className="w-4 h-4" /> Takip Et</>}
                </button>
                <button 
                  onClick={() => setSelectedUniId(uni.id)}
                  className="px-8 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-white hover:text-brand-primary hover:border-brand-200 transition-all active:scale-[0.98]"
                >
                  Profil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[50px] border-4 border-dashed border-gray-100">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <School className="w-10 h-10" />
           </div>
           <h3 className="text-xl font-black text-gray-800 mb-2">Eşleşen Okul Bulunamadı</h3>
           <p className="text-gray-400 font-bold">Filtreleri değiştirerek aramaya devam edebilirsin.</p>
        </div>
      )}
    </div>
  );
};

export default UniversitiesView;
