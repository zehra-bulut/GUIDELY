
import React, { useState, useMemo, useRef } from 'react';
import { 
  MessageSquare, 
  Video, 
  Quote, 
  Star, 
  School, 
  Home, 
  Music, 
  ChevronRight, 
  ChevronLeft,
  Users,
  GraduationCap,
  Play,
  Pause,
  X,
  LayoutGrid,
  MapPin,
  Building2,
  Bed,
  Sparkles,
  Award
} from 'lucide-react';
import { universities } from './UniversitiesView';
import { AcademicMember, StudentVlog, Grade, CampusVlog } from '../types';

type MainSection = 'none' | 'faculty-about' | 'campus-about';
type CornerType = 'academic' | 'student';
type ReviewCategory = 'yurt' | 'kampus' | 'sosyal';

const DEPARTMENTS: Record<string, string[]> = {
  'Bilgisayar ve Bilişim': ['Bilgisayar Mühendisliği', 'Yapay Zeka ve Veri Mühendisliği'],
  'İnşaat': ['İnşaat Mühendisliği', 'Geomatik Mühendisliği'],
  'Mimarlık': ['Mimarlık', 'Şehir ve Bölge Planlama', 'Endüstriyel Tasarım'],
  'Maden': ['Maden Mühendisliği', 'Jeoloji Mühendisliği', 'Petrol ve Doğalgaz Mühendisliği'],
  'Uçak ve Uzay Bilimleri': ['Uçak Mühendisliği', 'Uzay Mühendisliği', 'Meteoroloji Mühendisliği'],
  'Mühendislik': ['Makine Mühendisliği', 'Elektrik Mühendisliği', 'Endüstri Mühendisliği', 'Kimya Mühendisliği'],
  'Fen Edebiyat': ['Fizik', 'Matematik', 'Biyoloji', 'Kimya', 'Sosyoloji', 'Psikoloji'],
  'Fen-Edebiyat': ['Fizik', 'Matematik', 'Biyoloji', 'Kimya', 'Sosyoloji', 'Psikoloji'],
  'İktisadi ve İdari Bilimler': ['İktisat', 'İşletme', 'Siyaset Bilimi ve Uluslararası İlişkiler'],
  'Eğitim': ['Bilgisayar ve Öğretim Teknolojileri', 'Rehberlik ve Psikolojik Danışmanlık', 'Okul Öncesi Eğitimi'],
  'Yönetim Bilimleri': ['Yönetim Bilişim Sistemleri', 'Turizm İşletmeciliği'],
  'Tıp': ['Tıp'],
  'Hukuk': ['Hukuk'],
  'İnsani Bilimler ve Edebiyat': ['Felsefe', 'Tarih', 'İngiliz Dili ve Edebiyatı'],
  'Fen': ['Fizik', 'Kimya', 'Matematik']
};

const MOCK_ACADEMICS: AcademicMember[] = [
  {
    id: 'a1',
    name: 'Prof. Dr. Ahmet Yılmaz',
    title: 'Bölüm Başkanı',
    faculty: 'Bilgisayar ve Bilişim',
    department: 'Bilgisayar Mühendisliği',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    publications: 124,
    citations: 3500,
    hIndex: 42,
    bio: 'Yapay zeka ve büyük veri analitiği üzerine 20 yıllık araştırma deneyimine sahiptir.'
  },
  {
    id: 'a2',
    name: 'Doç. Dr. Elif Gök',
    title: 'Öğretim Üyesi',
    faculty: 'Mimarlık',
    department: 'Mimarlık',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    publications: 56,
    citations: 1200,
    hIndex: 18,
    bio: 'Sürdürülebilir mimari ve kentsel dönüşüm stratejileri uzmanıdır.'
  },
  {
    id: 'a3',
    name: 'Prof. Dr. Mehmet Can',
    title: 'Dekan Yardımcısı',
    faculty: 'Mühendislik',
    department: 'Makine Mühendisliği',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    publications: 89,
    citations: 2100,
    hIndex: 31,
    bio: 'Termodinamik ve yenilenebilir enerji sistemleri üzerine dünya çapında çalışmalar yürütmektedir.'
  }
];

const MOCK_STUDENTS: StudentVlog[] = [
  {
    id: 's1',
    name: 'Can Mert',
    universityId: 'itu',
    faculty: 'Bilgisayar ve Bilişim',
    department: 'Bilgisayar Mühendisliği',
    grade: '3. Sınıf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'İTÜ Bilgisayar\'da bir günüm nasıl geçiyor? Dersler, laboratuvarlar ve sosyal yaşam.'
  },
  {
    id: 's2',
    name: 'İpek Yıldız',
    universityId: 'bogazici',
    faculty: 'İktisadi ve İdari Bilimler',
    department: 'İşletme',
    grade: '2. Sınıf',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ipek',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Güney Kampüs\'te işletme öğrencisi olmak. Kulüp faaliyetleri ve kariyer hedeflerim.'
  }
];

const MOCK_CAMPUS_VLOGS: CampusVlog[] = [
  {
    id: 'cv1',
    universityId: 'itu',
    category: 'yurt',
    studentName: 'Ahmet Arı',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'Ayazağa Yerleşkesi yurtlarının oda koşulları ve imkanlarını detaylıca geziyoruz.'
  },
  {
    id: 'cv2',
    universityId: 'itu',
    category: 'kampus',
    studentName: 'Selin Su',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selin',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    description: 'İTÜ Kampüs turu: Merkezi kütüphane, spor salonları ve favori kahve mekanlarımız.'
  },
  {
    id: 'cv3',
    universityId: 'itu',
    category: 'sosyal',
    studentName: 'Kaan Gök',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kaan',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'İTÜ kulüp kültürü: Robot Olimpiyatları hazırlıkları ve kampüs festivalleri.'
  },
  {
    id: 'cv4',
    universityId: 'odtu',
    category: 'kampus',
    studentName: 'Ece Kar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ece',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'ODTÜ Devrim Stadyumu ve kampüs ormanında bir gün. Doğa ve okul iç içe!'
  }
];

const mockCampusReviews: Record<string, Record<ReviewCategory, { id: string, userName: string, role: string, text: string, rating: number, date: string }[]>> = {
  itu: {
    yurt: [{ id: 'cr1', userName: 'Ahmet K.', role: 'Yazılım Müh.', text: 'Yurtlar kampüs içinde olması büyük avantaj. Ring servisleri sürekli çalışıyor.', rating: 4, date: '2 ay önce' }],
    kampus: [{ id: 'cr2', userName: 'Mert S.', role: 'Makine Müh.', text: 'Kampüs çok geniş ve her yere metroyla ulaşım var.', rating: 5, date: '1 ay önce' }],
    sosyal: [{ id: 'cr3', userName: 'Deniz G.', role: 'İşletme', text: 'Kulüp çeşitliliği Türkiye\'nin en iyileri arasındadır.', rating: 5, date: '3 hafta önce' }]
  },
  odtu: {
    yurt: [{ id: 'od1', userName: 'Melis V.', role: 'İktisat', text: 'Yurtlar eski olsa da ortamı çok samimi.', rating: 4, date: '4 ay önce' }],
    kampus: [{ id: 'od2', userName: 'Caner L.', role: 'Fizik', text: 'Dünyanın en güzel kampüslerinden biridir kesinlikle.', rating: 5, date: '2 ay önce' }],
    sosyal: [{ id: 'od3', userName: 'Burcu Y.', role: 'Sosyoloji', text: 'Festivaller ve Devrim stadyumu unutulmaz.', rating: 5, date: '1 ay önce' }]
  }
};

const ReviewsView: React.FC = () => {
  const [mainSection, setMainSection] = useState<MainSection>('none');
  const [cornerMode, setCornerMode] = useState<CornerType | null>(null);
  const [step, setStep] = useState(0); 

  const [selectedUni, setSelectedUni] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<Grade>('1. Sınıf');
  const [activeCategory, setActiveCategory] = useState<ReviewCategory | null>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetFlow = () => {
    setMainSection('none');
    setCornerMode(null);
    setStep(0);
    setSelectedUni('');
    setSelectedFaculty('');
    setSelectedDept('');
    setSelectedGrade('1. Sınıf');
    setActiveCategory(null);
  };

  const currentUniData = universities.find(u => u.id === selectedUni);
  const faculties = currentUniData?.faculties || [];
  const depts = selectedFaculty ? (DEPARTMENTS[selectedFaculty] || []) : [];

  const filteredAcademics = MOCK_ACADEMICS.filter(a => a.faculty === selectedFaculty && a.department === selectedDept);
  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.universityId === selectedUni && 
    s.faculty === selectedFaculty && 
    s.department === selectedDept && 
    (cornerMode === 'student' ? s.grade === selectedGrade : true)
  );

  const filteredCampusVlogs = MOCK_CAMPUS_VLOGS.filter(v => 
    v.universityId === selectedUni && v.category === activeCategory
  );

  const getAvgRating = (uniId: string, category: ReviewCategory) => {
    const reviews = mockCampusReviews[uniId]?.[category] || [];
    if (reviews.length === 0) return "-";
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const campusCategories = [
    { id: 'yurt' as ReviewCategory, label: 'Yurt Koşulları', icon: Bed, color: 'text-orange-500', bgColor: 'bg-orange-50' },
    { id: 'kampus' as ReviewCategory, label: 'Kampüs Koşulları', icon: School, color: 'text-brand-primary', bgColor: 'bg-brand-50' },
    { id: 'sosyal' as ReviewCategory, label: 'Sosyal Aktivite', icon: Music, color: 'text-pink-500', bgColor: 'bg-pink-50' },
  ];

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div 
              onClick={() => { setMainSection('faculty-about'); setStep(1); }}
              className="group bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-brand-primary transition-all cursor-pointer text-center space-y-8"
            >
              <div className="w-24 h-24 bg-brand-50 rounded-[35px] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                <Building2 className="w-10 h-10 text-brand-primary" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Fakülte ve Bölüm Hakkında</h3>
                <p className="text-gray-400 text-sm font-medium">Bölüm başkanları ve mevcut öğrencilerden akademik detaylar.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Giriş Yap <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div 
              onClick={() => { setMainSection('campus-about'); setStep(2); }}
              className="group bg-white p-12 rounded-[50px] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-500 transition-all cursor-pointer text-center space-y-8"
            >
              <div className="w-24 h-24 bg-indigo-50 rounded-[35px] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                <Home className="w-10 h-10 text-indigo-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">Kampüs ve Yurtlar Hakkında</h3>
                <p className="text-gray-400 text-sm font-medium">Üniversite hayatı, konaklama ve yerleşke imkanlarına dair görüşler.</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Giriş Yap <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        );

      case 1: 
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
             <div 
              onClick={() => { setCornerMode('academic'); setStep(2); }}
              className="p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-brand-primary hover:shadow-xl transition-all cursor-pointer group text-center space-y-6"
             >
               <div className="w-20 h-20 bg-brand-50 rounded-[28px] flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-brand-primary" />
               </div>
               <h4 className="text-xl font-black text-gray-800">Akademisyen Görüşleri</h4>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Bölüm başkanları ve profesörler</p>
             </div>
             <div 
              onClick={() => { setCornerMode('student'); setStep(2); }}
              className="p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer group text-center space-y-6"
             >
               <div className="w-20 h-20 bg-indigo-50 rounded-[28px] flex items-center justify-center mx-auto">
                <GraduationCap className="w-10 h-10 text-indigo-500" />
               </div>
               <h4 className="text-xl font-black text-gray-800">Öğrenci Görüşleri</h4>
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Akran deneyimi ve vloglar</p>
             </div>
          </div>
        );

      case 2: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Üniversite Seçin</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map(uni => (
                <div 
                  key={uni.id}
                  onClick={() => { 
                    setSelectedUni(uni.id); 
                    if (mainSection === 'faculty-about') setStep(3);
                    else setStep(6); 
                  }}
                  className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center gap-5 group"
                >
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <School className="w-7 h-7 text-brand-primary" />
                  </div>
                  <span className="font-black text-gray-700 tracking-tight">{uni.name}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 3: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Fakülte Seçin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculties.map(faculty => (
                <div 
                  key={faculty}
                  onClick={() => { setSelectedFaculty(faculty); setStep(4); }}
                  className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="font-bold text-gray-700">{faculty} Fakültesi</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );

      case 4: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Bölüm Seçin</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {depts.map(dept => (
                <div 
                  key={dept}
                  onClick={() => { 
                    setSelectedDept(dept); 
                    if (cornerMode === 'student') setStep(5);
                    else setStep(7); 
                  }}
                  className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-brand-primary transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="font-bold text-gray-700">{dept}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                </div>
              ))}
            </div>
          </div>
        );

      case 5: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <h3 className="text-xl font-black text-gray-800 text-center uppercase tracking-[0.2em]">Sınıf Seçin</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Hazırlık', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Mezun'].map(grade => (
                <div 
                  key={grade}
                  onClick={() => { setSelectedGrade(grade as Grade); setStep(7); }}
                  className="bg-white p-8 rounded-[35px] border border-gray-100 shadow-sm hover:border-indigo-500 transition-all cursor-pointer text-center group"
                >
                  <span className="font-black text-gray-700 group-hover:text-indigo-600">{grade}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 6: 
        return (
          <div className="space-y-12 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {campusCategories.map((cat) => {
                  const avg = getAvgRating(selectedUni, cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`p-8 rounded-[45px] border transition-all flex flex-col items-center text-center gap-5 relative group ${
                        activeCategory === cat.id 
                        ? 'bg-brand-primary border-brand-primary text-white shadow-2xl shadow-brand-200 -translate-y-2' 
                        : 'bg-white border-gray-100 text-gray-500 hover:border-brand-200'
                      }`}
                    >
                      <div className={`p-5 rounded-3xl ${activeCategory === cat.id ? 'bg-white/20' : cat.bgColor} group-hover:scale-110 transition-transform`}>
                        <cat.icon className={`w-8 h-8 ${activeCategory === cat.id ? 'text-white' : cat.color}`} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-widest">{cat.label}</span>
                        <div className="flex items-center justify-center gap-1.5 mt-2">
                          <Star className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white fill-current' : 'text-yellow-400 fill-current'}`} />
                          <span className={`text-sm font-black ${activeCategory === cat.id ? 'text-white' : 'text-gray-700'}`}>{avg}/5</span>
                        </div>
                      </div>
                      <div className={`mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-white/80' : 'text-brand-primary'}`}>
                        <Play className="w-3 h-3 fill-current" /> Deneyimi İzle
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeCategory && (
                <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
                  {/* Category Video Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                       <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-brand-primary" /> 
                          {campusCategories.find(c => c.id === activeCategory)?.label} Video İncelemesi
                       </h3>
                       {filteredCampusVlogs.length > 0 ? filteredCampusVlogs.map(vlog => (
                         <div key={vlog.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group">
                           <div className="relative aspect-video bg-gray-900">
                             <img src={`https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover opacity-60" alt="" />
                             <button 
                                onClick={() => setActiveVideo(vlog.videoUrl)}
                                className="absolute inset-0 m-auto w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                              >
                                <Play className="w-8 h-8 fill-current ml-1" />
                              </button>
                           </div>
                           <div className="p-8 flex items-center gap-6">
                              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-brand-50">
                                <img src={vlog.avatar} alt={vlog.studentName} />
                              </div>
                              <div>
                                <h5 className="font-black text-gray-800">{vlog.studentName}</h5>
                                <p className="text-sm text-gray-500 font-medium italic">"{vlog.description}"</p>
                              </div>
                           </div>
                         </div>
                       )) : (
                        <div className="py-16 text-center bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
                           <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Bu üniversite ve kategori için henüz vlog yüklenmemiş.</p>
                        </div>
                       )}
                    </div>
                    
                    <div className="lg:col-span-2 space-y-6">
                       <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
                          <MessageSquare className="w-6 h-6 text-brand-primary" /> Öğrenci Yorumları
                       </h3>
                       <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {(mockCampusReviews[selectedUni]?.[activeCategory] || []).length > 0 ? (mockCampusReviews[selectedUni]?.[activeCategory] || []).map(r => (
                          <div key={r.id} className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm relative group">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">{r.userName[0]}</div>
                                <div>
                                  <p className="font-black text-gray-800 text-xs">{r.userName}</p>
                                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{r.role}</p>
                                </div>
                              </div>
                              <div className="flex text-yellow-400">
                                {Array.from({length: 5}).map((_, i) => <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 font-medium leading-relaxed italic">"{r.text}"</p>
                          </div>
                        )) : (
                          <div className="py-12 text-center bg-white rounded-[40px] border border-gray-100">
                            <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Henüz yazılı görüş yok.</p>
                          </div>
                        )}
                       </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        );

      case 7: 
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-brand-50 rounded-[28px] flex items-center justify-center shadow-inner">
                      {cornerMode === 'academic' ? <Users className="w-8 h-8 text-brand-primary" /> : <GraduationCap className="w-8 h-8 text-indigo-500" />}
                   </div>
                   <div>
                      <h4 className="font-black text-xl text-gray-800 tracking-tight">{currentUniData?.name}</h4>
                      <p className="text-brand-primary text-xs font-black uppercase tracking-widest">{selectedDept} • {cornerMode === 'academic' ? 'Akademisyen Portalı' : `${selectedGrade} Deneyimi`}</p>
                   </div>
                </div>
                <button onClick={() => setStep(1)} className="text-brand-primary font-black text-xs uppercase tracking-widest hover:underline border border-brand-100 px-6 py-2 rounded-full hover:bg-brand-50 transition-all">Seçimi Sıfırla</button>
             </div>

             {cornerMode === 'academic' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAcademics.length > 0 ? filteredAcademics.map(academic => (
                    <div key={academic.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-video bg-gray-900 group-hover:brightness-110 transition-all">
                        <img src={academic.avatar} className="w-full h-full object-cover opacity-50" alt="" />
                        <button 
                          onClick={() => setActiveVideo(academic.videoUrl)}
                          className="absolute inset-0 m-auto w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                        >
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                        <div className="absolute bottom-6 left-8 text-white">
                          <p className="font-black text-xl tracking-tight">{academic.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{academic.title}</p>
                        </div>
                      </div>
                      <div className="p-10 space-y-8">
                        <div className="space-y-4">
                           <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                             <Quote className="w-3 h-3 text-brand-primary" /> Akademik Vizyon
                           </h5>
                           <p className="text-gray-500 italic font-medium leading-relaxed">"{academic.bio}"</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Yayın</p>
                             <p className="text-xl font-black text-brand-primary">{academic.publications}</p>
                           </div>
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Atıf</p>
                             <p className="text-xl font-black text-brand-primary">{academic.citations}</p>
                           </div>
                           <div className="bg-gray-50 p-5 rounded-3xl text-center space-y-1 border border-gray-100">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">H-Index</p>
                             <p className="text-xl font-black text-brand-primary">{academic.hIndex}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-24 text-center bg-white rounded-[50px] border-2 border-dashed border-gray-100">
                       <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                       <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Bu bölüm için veri bulunamadı.</p>
                    </div>
                  )}
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredStudents.length > 0 ? filteredStudents.map(student => (
                    <div key={student.id} className="bg-white rounded-[45px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-video bg-gray-900">
                        <img src={`https://images.unsplash.com/photo-1523240715632-d984bb4b9156?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover opacity-60" alt="" />
                        <button 
                          onClick={() => setActiveVideo(student.videoUrl)}
                          className="absolute inset-0 m-auto w-20 h-20 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                        >
                          <Play className="w-8 h-8 fill-current ml-1" />
                        </button>
                      </div>
                      <div className="p-10 space-y-6">
                         <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-[22px] overflow-hidden border-2 border-indigo-50 shadow-md">
                               <img src={student.avatar} alt="" />
                            </div>
                            <div>
                               <h5 className="font-black text-xl text-gray-800 tracking-tight">{student.name}</h5>
                               <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-xl border border-indigo-100">{student.grade}</span>
                            </div>
                         </div>
                         <p className="text-gray-500 font-medium leading-relaxed italic">"{student.description}"</p>
                      </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-24 text-center bg-white rounded-[50px] border-2 border-dashed border-gray-100">
                       <GraduationCap className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                       <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Bu seçim için henüz vlog bulunmuyor.</p>
                    </div>
                  )}
                </div>
             )}
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tighter">Görüşler & Deneyimler</h1>
          <p className="text-gray-500 font-medium text-lg">Gerçek hayat, gerçek deneyim. Doğru tercihi içeriden dinle.</p>
        </div>
        {step > 0 && (
          <button 
            onClick={resetFlow}
            className="flex items-center gap-3 text-brand-primary font-black text-sm uppercase tracking-widest hover:gap-4 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Ana Menüye Dön
          </button>
        )}
      </div>

      {renderStepContent()}

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="relative w-full max-w-5xl aspect-video bg-black rounded-[50px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
              <button 
                onClick={() => { setActiveVideo(null); setIsPlaying(false); }}
                className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white z-20 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              </button>
              <video 
                ref={videoRef}
                src={activeVideo}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button 
                    onClick={() => videoRef.current?.play()}
                    className="w-28 h-28 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                  >
                    <Play className="w-12 h-12 fill-current ml-1" />
                  </button>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsView;
