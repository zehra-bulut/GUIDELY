
import React from 'react';
import { Crown, CheckCircle2, Star, Zap, Users, BarChart3, MessageSquareText, ShieldCheck } from 'lucide-react';

const PremiumView: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      title: "1:1 Mentorluk",
      desc: "Hayalindeki okulda okuyan öğrenciler veya sektör uzmanlarıyla birebir görüşme şansı."
    },
    {
      icon: <MessageSquareText className="w-6 h-6 text-indigo-500" />,
      title: "AI Kariyer Koçu",
      desc: "Senin için özel olarak eğitilmiş AI asistanına 7/24 soru sor, kariyer tavsiyesi al."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-green-500" />,
      title: "Gelişmiş İstatistikler",
      desc: "Üniversitelerin işe yerleştirme oranları ve mezun maaş skalalarına dair şeffaf veriler."
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: "Öncelikli Erişim",
      desc: "Yeni özelliklere ve canlı yayınlara herkesten önce katılma hakkı."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: "Reklamsız Deneyim",
      desc: "Odaklanman için tamamen temiz ve reklamsız bir platform arayüzü."
    },
    {
      icon: <Star className="w-6 h-6 text-purple-500" />,
      title: "Özel Sertifikalar",
      desc: "Guidely testlerini başarıyla tamamladığında CV'ne ekleyebileceğin yetkinlik belgeleri."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Hero Header */}
      <section className="bg-white rounded-[50px] p-12 md:p-20 text-center border border-gray-100 shadow-2xl shadow-brand-500/5 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-100 mb-4 animate-bounce">
            <Crown className="w-4 h-4" /> En Üst Düzey Deneyim
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 leading-[1.1] tracking-tighter">
            Geleceğin İçin <span className="text-brand-primary">Sınırları Zorla</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Guidely Premium, sadece bir rehber değil; seni başarıya taşıyacak kişisel bir kariyer motorudur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <div className="bg-brand-primary text-white p-8 rounded-[40px] shadow-2xl shadow-brand-200 min-w-[300px] border-4 border-brand-100">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Yıllık Plan (Efsane Fırsat)</p>
               <h2 className="text-4xl font-black mb-1">₺29,90 <span className="text-lg opacity-60">/ay</span></h2>
               <p className="text-xs text-brand-100 font-bold mb-8 italic">"%40 Daha Hesaplı"</p>
               <button className="w-full bg-white text-brand-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-50 transition-all active:scale-95">
                 Premium'u Başlat
               </button>
            </div>
            <div className="bg-gray-50 text-gray-800 p-8 rounded-[40px] border border-gray-100 min-w-[280px]">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Aylık Plan</p>
               <h2 className="text-4xl font-black mb-1">₺49,90 <span className="text-lg text-gray-400">/ay</span></h2>
               <p className="text-xs text-gray-400 font-bold mb-8 italic">Her ay yenilenir</p>
               <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95">
                 Hemen Başla
               </button>
            </div>
          </div>
        </div>
        
        {/* Background Visuals */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-[120px] -mr-48 -mt-48 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-50 rounded-full blur-[100px] -ml-40 -mb-40 opacity-40"></div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Neden Premium?</h2>
          <div className="w-20 h-1.5 bg-brand-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group border-b-8 border-b-transparent hover:border-b-brand-primary">
              <div className="mb-8 p-5 bg-gray-50 rounded-3xl w-fit group-hover:scale-110 transition-transform shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-4 tracking-tight group-hover:text-brand-primary transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-brand-50 rounded-[50px] p-12 text-center border border-brand-100">
         <h3 className="text-xl font-black text-brand-900 mb-8 flex items-center justify-center gap-3">
           <Users className="w-6 h-6 text-brand-primary" /> 10,000+ Öğrenci Kariyerini Premium ile Çiziyor
         </h3>
         <div className="flex flex-wrap justify-center gap-8">
           {[
             { name: "Selin B.", text: "Mentorluk sayesinde Boğaziçi'ndeki bölümüm hakkında en doğru bilgileri aldım." },
             { name: "Caner T.", text: "AI Kariyer Koçu meslek seçimimde tam isabet sağladı." },
             { name: "İpek L.", text: "Maaş verileri sayesinde hedefimi çok daha net belirledim." }
           ].map((t, i) => (
             <div key={i} className="max-w-[280px] bg-white p-6 rounded-3xl border border-brand-100 shadow-sm text-left">
               <p className="text-xs italic text-gray-600 font-medium mb-4">"{t.text}"</p>
               <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{t.name}</p>
             </div>
           ))}
         </div>
      </section>
    </div>
  );
};

export default PremiumView;
