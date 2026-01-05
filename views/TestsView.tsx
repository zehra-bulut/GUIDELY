
import React, { useState } from 'react';
import { getCareerAdvice } from '../geminiService';
import { Brain, Sparkles, CheckCircle2, Loader2, RefreshCcw } from 'lucide-react';

interface Props {
  onComplete: (result: string) => void;
}

const TestsView: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const questions = [
    { 
      q: "Yeni ve karmaşık bir problemle karşılaştığınızda zihniniz ilk olarak neye odaklanır?", 
      options: [
        "Problemin temelindeki mantıksal hataları bulmaya (Analitik)", 
        "Durumu benzersiz kılan yaratıcı boşlukları yakalamaya (Yaratıcı)", 
        "Problemin diğer insanları nasıl etkilediğine (Sosyal)",
        "Daha önce işe yaramış pratik çözümleri hatırlamaya (Uygulamacı)"
      ] 
    },
    { 
      q: "Bir çalışma ortamında sizi 'akış' haline sokan asıl itici güç nedir?", 
      options: [
        "Zorlayıcı bir bulmacayı adım adım çözmek", 
        "Sıfırdan yepyeni bir şey inşa etmek veya tasarlamak", 
        "Birine rehberlik ederek gelişimine şahit olmak",
        "Belirlenmiş hedeflere planlı bir hızla ulaşmak"
      ] 
    },
    { 
      q: "Boş vaktinizde hangisiyle uğraşmak enerjinizi tazeler?", 
      options: [
        "Strateji oyunları veya kodlama projeleri", 
        "Müzik, resim veya estetik bir hobi", 
        "Arkadaş grubunda derin sohbetler başlatmak",
        "Bir nesneyi tamir etmek veya düzenlemek"
      ] 
    },
    { 
      q: "Bir ekip çalışmasında genellikle hangi rolde en verimli hissedersiniz?", 
      options: [
        "Verileri toplayıp objektif kararlar alan 'Analist'", 
        "Ufuk açan ve kalıpların dışında düşünen 'Vizyoner'", 
        "Ekip ruhunu koruyan ve arabuluculuk yapan 'Destekçi'",
        "İşleri organize eden ve süreci yöneten 'Lider'"
      ] 
    },
    { 
      q: "İş hayatınızda 'başarı' kelimesinin sizin için en yakın tanımı nedir?", 
      options: [
        "Kendi alanımda en yüksek teknik otorite olmak", 
        "Eserimin veya fikrimin dünya çapında bilinmesi", 
        "İnsanların hayatında anlamlı bir iz bırakmak",
        "Finansal bağımsızlık ve istikrarlı bir kariyer"
      ] 
    },
    { 
      q: "Bir tartışma esnasında tutumunuzu hangisi daha iyi açıklar?", 
      options: [
        "Verilere dayalı, soğukkanlı ve rasyonel kalırım", 
        "Farklı perspektifleri birleştirip özgün bir sentez yaparım", 
        "Ortamı yumuşatmaya ve duygusal dengeyi kurmaya çalışırım",
        "Hızlı ve pratik bir sonuç için inisiyatif alırım"
      ] 
    },
    { 
      q: "Gelecekteki çalışma alanınızda hangisi kesinlikle bulunmamalı?", 
      options: [
        "Duygusal karmaşa ve mantıksız süreçler", 
        "Katı kurallar ve yaratıcılığa kapalı bir rutin", 
        "Yalnızlık ve insanlarla bağ kuramama durumu",
        "Belirsiz hedefler ve düşük disiplinli bir ortam"
      ] 
    },
    { 
      q: "Belirsizlik altında çalışırken hangisini hissetmeye daha meyillisiniz?", 
      options: [
        "Merak; bu karmaşayı nasıl çözerim?", 
        "Heyecan; yeni imkanlar doğabilir mi?", 
        "Empati; ekibim bu durumdan nasıl etkilenir?",
        "Konsantrasyon; krizi yönetmek için plana ihtiyacım var."
      ] 
    },
    { 
      q: "Bilgi edinme biçiminiz hangisidir?", 
      options: [
        "Okuyarak, araştırarak ve derinlemesine inceleyerek", 
        "Deneyerek, yanılarak ve keşfederek", 
        "Başkalarıyla tartışarak ve deneyimlerini dinleyerek",
        "Gözlemleyerek ve doğrudan uygulamaya geçerek"
      ] 
    },
    { 
      q: "Bir projenin bitiş çizgisine yaklaştığında ne hissedersiniz?", 
      options: [
        "Zihinsel bir doyum; her parça yerine oturdu.", 
        "Yeni bir proje için sabırsızlık; sırada ne var?", 
        "Duygusal bir bağ; birlikte başardık.",
        "Görev bilinci; hedef başarıyla tamamlandı."
      ] 
    },
    { 
      q: "Hayatınızdaki değişimlere nasıl adapte olursunuz?", 
      options: [
        "Değişimin risklerini ve fırsatlarını hesaplarım", 
        "Akışa bırakır ve yaratıcılığımı kullanırım", 
        "Çevremdeki insanlarla konuşarak destek alırım",
        "Hemen yeni bir düzen ve rutin kurmaya odaklanırım"
      ] 
    },
    { 
      q: "Hangi tür övgü sizi en çok mutlu eder?", 
      options: [
        "Zekam ve çözüm yeteneğim hakkındaki övgü", 
        "Yaratıcılığım ve vizyonum hakkındaki övgü", 
        "Yardımseverliğim ve kişiliğim hakkındaki övgü",
        "Çalışkanlığım ve sonuç odaklılığım hakkındaki övgü"
      ] 
    }
  ];

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      processAnalysis(newAnswers);
    }
  };

  const processAnalysis = async (finalAnswers: string[]) => {
    setStep('loading');
    const result = await getCareerAdvice(finalAnswers);
    const finalResult = result || "Analiz tamamlanamadı.";
    setAnalysis(finalResult);
    onComplete(finalResult);
    setStep('result');
  };

  const reset = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers([]);
    setAnalysis(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800 flex items-center justify-center gap-3 tracking-tight">
          <Brain className="text-brand-primary w-8 h-8" /> Kariyer DNA Analizi
        </h1>
        <p className="text-gray-500 font-medium">Gelişmiş psikometrik metodoloji ile potansiyelini haritalayalım.</p>
      </div>

      {step === 'intro' && (
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Sparkles className="w-12 h-12 text-brand-primary" />
          </div>
          <h2 className="text-2xl font-black mb-4 text-gray-800 tracking-tight">Geleceğini Verilerle Tasarla</h2>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium px-4">Bu analiz, 12 farklı bilişsel ve duygusal boyutta tercihlerini ölçerek sana en uygun 3 sektörü ve çalışma stilini belirler.</p>
          <button 
            onClick={() => setStep('quiz')}
            className="w-full bg-brand-primary text-white py-5 rounded-[22px] font-black hover:bg-brand-700 transition-all shadow-xl shadow-brand-200 text-lg uppercase tracking-widest active:scale-95"
          >
            Analize Başla
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl animate-in fade-in slide-in-from-bottom duration-500">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-brand-primary px-3 py-1 bg-brand-50 rounded-full uppercase tracking-widest">Soru {currentQuestion + 1} / {questions.length}</span>
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-primary rounded-full transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-10 leading-snug tracking-tight">{questions[currentQuestion].q}</h2>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full p-6 text-left border-2 border-gray-50 rounded-[24px] hover:border-brand-primary hover:bg-brand-50/50 transition-all font-bold text-gray-700 flex items-center justify-between group"
              >
                <span className="max-w-[85%]">{opt}</span>
                <div className="w-8 h-8 rounded-xl border-2 border-gray-200 group-hover:border-brand-primary group-hover:bg-white flex items-center justify-center transition-all flex-shrink-0">
                   <div className="w-3 h-3 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className="bg-white rounded-[40px] p-16 border border-gray-100 shadow-xl text-center">
          <div className="relative w-24 h-24 mx-auto mb-10">
            <Loader2 className="w-24 h-24 text-brand-primary animate-spin absolute inset-0" />
            <Brain className="w-12 h-12 text-brand-200 absolute inset-0 m-auto" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-4 tracking-tight">Kariyer DNA'n İşleniyor...</h2>
          <p className="text-gray-500 font-medium italic">Yapay zekamız tercihlerini 10,000+ meslek profiliyle senkronize ediyor.</p>
        </div>
      )}

      {step === 'result' && (
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl space-y-8 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-4 p-5 bg-green-50 rounded-3xl border border-green-100">
            <div className="p-3 bg-green-500 rounded-2xl">
                <CheckCircle2 className="text-white w-6 h-6" />
            </div>
            <div>
                <span className="font-black text-green-800 block text-sm">Analiz Tamamlandı!</span>
                <span className="text-[10px] text-green-700/70 font-bold uppercase tracking-widest">Kişiselleştirilmiş Yol Haritan Hazır</span>
            </div>
          </div>
          <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap p-8 bg-gray-50 rounded-[35px] border border-gray-100 font-medium">
            {analysis}
          </div>
          <button 
            onClick={reset}
            className="w-full flex items-center justify-center gap-3 text-brand-primary hover:bg-brand-50 font-black py-5 rounded-[22px] transition-all border-2 border-dashed border-brand-200 uppercase tracking-widest text-xs"
          >
            <RefreshCcw className="w-4 h-4" /> Yeni Analiz Başlat
          </button>
        </div>
      )}
    </div>
  );
};

export default TestsView;
