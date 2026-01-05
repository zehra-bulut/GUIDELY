
import React, { useState, useMemo } from 'react';
import { Sector } from '../types';
import { Search, TrendingUp, DollarSign, Activity, Users, Info, Bookmark, BookmarkCheck, Filter, Sparkles, ChevronDown } from 'lucide-react';

export const sectors: Sector[] = [
  { 
    id: 'sec-1', 
    name: 'Yazılım Geliştirme', 
    category: 'Teknoloji',
    growth: '%25', 
    difficulty: 'Yüksek', 
    salary: '50k - 150k TL', 
    icon: '💻',
    description: 'Yazılım geliştirme, günümüz dünyasının en dinamik ve hızlı büyüyen sektörlerinden biridir. Sürekli öğrenme ve problem çözme becerisi gerektirir.',
    hardSkills: ['Python', 'JavaScript', 'SQL', 'Git/GitHub', 'Cloud (AWS/Azure)', 'Docker'],
    softSkills: ['Analitik Düşünme', 'Problem Çözme', 'Ekip Çalışması', 'Zaman Yönetimi', 'Sürekli Öğrenme'],
    trends: ['Yapay Zeka Entegrasyonu', 'Bulut Bilişim', 'Düşük Kodlu Platformlar (No-Code/Low-Code)'],
    expertInsights: [
      { 
        id: 'ex-1', 
        name: 'Dr. Selin Ak', 
        title: 'Senior Software Engineer @ TechGiant', 
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200', 
        comment: 'Bu sektörde başarının anahtarı asla "öğrendim" dememektir. Teknoloji her 6 ayda bir değişiyor.',
        fieldOfWork: 'Yazılım Mühendisliği',
        experienceYears: 12,
        bio: 'Selin Ak, büyük ölçekli dağıtık sistemler üzerinde uzmanlaşmış bir mühendistir. Son 5 yıldır AI destekli yazılım süreçleri üzerine çalışmaktadır.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        scoringSummary: [
          { label: 'İş Tatmini', score: 9 },
          { label: 'Giriş Zorluğu', score: 8 },
          { label: 'Gelecek Potansiyeli', score: 10 },
          { label: 'Sosyal Denge', score: 6 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Frontend Developer', 
        description: 'Web sitelerinin kullanıcı tarafından görülen arayüzlerini ve etkileşimlerini geliştirir.', 
        workplace: 'Teknoloji şirketleri, ajanslar veya freelance.', 
        jobFindingEase: 8, 
        growthPotential: 7, 
        internationalOpportunities: 9,
        workplaceDistribution: [
          { category: 'Global Teknoloji Devleri', percentage: 40, companies: ['Google', 'Meta', 'Netflix'] },
          { category: 'Yerli Unicornlar & Startuplar', percentage: 45, companies: ['Getir', 'Dream Games', 'Insider'] },
          { category: 'Dijital Ajanslar', percentage: 15, companies: ['Sherpa', 'Userspots'] }
        ]
      },
      { 
        title: 'Backend Developer', 
        description: 'Sunucu tarafındaki mantığı, veritabanı yönetimini ve API sistemlerini kurar.', 
        workplace: 'Yazılım evleri, büyük kurumsal firmalar, bankalar.', 
        jobFindingEase: 9, 
        growthPotential: 8, 
        internationalOpportunities: 9,
        workplaceDistribution: [
          { category: 'Bankacılık & Finans', percentage: 50, companies: ['Yapı Kredi', 'Garanti BBVA', 'Papara'] },
          { category: 'E-Ticaret Platformları', percentage: 35, companies: ['Trendyol', 'Hepsiburada', 'Amazon'] },
          { category: 'Bulut Bilişim Servisleri', percentage: 15, companies: ['AWS', 'Azure'] }
        ]
      },
      { 
        title: 'Full Stack Developer', 
        description: 'Hem arayüz hem de sunucu tarafında uzmanlaşarak projeyi uçtan uca yönetir.', 
        workplace: 'Startuplar, ürün odaklı teknoloji firmaları.', 
        jobFindingEase: 9, 
        growthPotential: 9, 
        internationalOpportunities: 9,
        workplaceDistribution: [
          { category: 'Erken Aşama Startuplar', percentage: 60, companies: ['Y Combinator Startups', 'Peak Games'] },
          { category: 'SaaS Şirketleri', percentage: 30, companies: ['Atlassian', 'Slack'] },
          { category: 'Freelance & Danışmanlık', percentage: 10, companies: ['Upwork Elite', 'Toptal'] }
        ]
      }
    ]
  },
  { 
    id: 'sec-7', 
    name: 'Elektrik Elektronik Mühendisliği', 
    category: 'Mühendislik',
    growth: '%18', 
    difficulty: 'Yüksek', 
    salary: '35k - 120k TL', 
    icon: '⚡',
    description: 'Elektrik, elektronik ve elektromanyetizma ile ilgili sistemlerin tasarımı, geliştirilmesi ve test edilmesi süreçlerini kapsayan temel mühendislik dalıdır.',
    hardSkills: ['Devre Analizi', 'Sinyal İşleme', 'Mikrodenetleyiciler', 'Güç Sistemleri', 'MATLAB/Simulink', 'C/C++'],
    softSkills: ['Karmaşık Problem Çözme', 'Eleştirel Düşünme', 'Proje Yönetimi', 'Ekip Koordinasyonu'],
    trends: ['Akıllı Şebekeler', 'Elektrikli Araç Teknolojileri', '5G ve Ötesi Haberleşme', 'Gömülü Sistemler'],
    specializations: [
      { 
        title: 'Sistem Mühendisi', 
        description: 'Karmaşık mühendislik projelerinin tüm yaşam döngüsü boyunca verimli ve güvenli çalışmasını koordine eder.', 
        workplace: 'Savunma sanayii, havacılık ve büyük üretim tesisleri.', 
        jobFindingEase: 7, 
        growthPotential: 8, 
        internationalOpportunities: 8,
        workplaceDistribution: [
          { category: 'Savunma Sanayii', percentage: 55, companies: ['ASELSAN', 'ROKETSAN', 'TUSAŞ'] },
          { category: 'Havacılık & Uzay', percentage: 30, companies: ['Boeing', 'Airbus', 'SpaceX'] },
          { category: 'Otomotiv Sistemleri', percentage: 15, companies: ['TOGG', 'Ford Otosan'] }
        ]
      },
      { 
        title: 'Biyomedikal Mühendisliği', 
        description: 'Sağlık alanındaki teşhis ve tedavi süreçleri için teknolojik cihazlar ve sistemler tasarlar.', 
        workplace: 'Hastaneler, tıbbi cihaz üreticileri ve araştırma laboratuvarları.', 
        jobFindingEase: 8, 
        growthPotential: 9, 
        internationalOpportunities: 7,
        workplaceDistribution: [
          { category: 'Medikal Cihaz Üretimi', percentage: 60, companies: ['Siemens Healthineers', 'Philips', 'GE Healthcare'] },
          { category: 'Özel Hastane Zincirleri', percentage: 25, companies: ['Acıbadem', 'MLP Care'] },
          { category: 'Biyoteknoloji Startupları', percentage: 15, companies: ['Biogen', 'Moderna'] }
        ]
      },
      { 
        title: 'Telekomünikasyon Mühendisliği', 
        description: 'Veri iletimi, kablosuz ağlar, uydu haberleşmesi ve fiber optik sistemler üzerine odaklanır.', 
        workplace: 'GSM operatörleri, haberleşme teknolojileri şirketleri ve devlet kurumları.', 
        jobFindingEase: 8, 
        growthPotential: 8, 
        internationalOpportunities: 9,
        workplaceDistribution: [
          { category: 'Telekom Operatörleri', percentage: 65, companies: ['Turkcell', 'Vodafone', 'Türk Telekom'] },
          { category: 'Ağ Altyapı Sağlayıcıları', percentage: 25, companies: ['Ericsson', 'Nokia', 'Huawei'] },
          { category: 'Düzenleyici Kurumlar', percentage: 10, companies: ['BTK', 'Türksat'] }
        ]
      },
      { 
        title: 'Kontrol ve Otomasyon', 
        description: 'Fabrikaların ve endüstriyel sistemlerin insansız veya akıllı şekilde çalışmasını sağlayan kontrol algoritmaları kurar.', 
        workplace: 'Otomotiv fabrikaları, robotik firmaları, üretim bantları.', 
        jobFindingEase: 9, 
        growthPotential: 9, 
        internationalOpportunities: 7,
        workplaceDistribution: [
          { category: 'Endüstriyel Otomasyon', percentage: 50, companies: ['ABB', 'Schneider Electric', 'Rockwell'] },
          { category: 'Robotik & AI Lab', percentage: 30, companies: ['Boston Dynamics', 'Fanuc'] },
          { category: 'Gıda & İlaç Üretimi', percentage: 20, companies: ['Unilever', 'Nestle'] }
        ]
      },
      { 
        title: 'Güç Sistemleri Mühendisi', 
        description: 'Elektrik enerjisinin üretimi, iletimi ve dağıtımı süreçlerini yönetir; enerji verimliliği üzerine çalışır.', 
        workplace: 'Enerji santralleri, elektrik dağıtım şirketleri, yenilenebilir enerji tesisleri.', 
        jobFindingEase: 8, 
        growthPotential: 7, 
        internationalOpportunities: 6,
        workplaceDistribution: [
          { category: 'Enerji Üretim & Dağıtım', percentage: 70, companies: ['EUAŞ', 'Enerjisa', 'CK Enerji'] },
          { category: 'Yenilenebilir Enerji', percentage: 20, companies: ['Zorlu Enerji', 'Limak Enerji'] },
          { category: 'Ağır Sanayi Tesisleri', percentage: 10, companies: ['Erdemir', 'İsdemir'] }
        ]
      }
    ]
  },
  { 
    id: 'sec-2', 
    name: 'Sağlık ve Tıp', 
    category: 'Sağlık',
    growth: '%15', 
    difficulty: 'Çok Yüksek', 
    salary: '40k - 120k TL', 
    icon: '🏥',
    description: 'İnsan hayatına dokunan, teknik bilgiyle yüksek empatinin birleştiği bir alan. Yaşlanan nüfus ve teknolojik gelişmelerle önemi artıyor.',
    hardSkills: ['Anatomi', 'Teşhis Yöntemleri', 'Farmakoloji', 'Cerrahi Teknikler', 'Medikal Cihaz Kullanımı'],
    softSkills: ['Yüksek Empati', 'Kriz Yönetimi', 'Hasta İletişimi', 'Etik Karar Verme', 'Dayanıklılık'],
    trends: ['Teletıp', 'Kişiselleştirilmiş Tıp', 'Robotik Cerrahi'],
    expertInsights: [
      { 
        id: 'ex-2', 
        name: 'Doç. Dr. Mert Yılmaz', 
        title: 'Kardiyolog', 
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200', 
        comment: 'Teknoloji ne kadar ilerlese de hastayla kurduğunuz o insani bağ her zaman en önemli iyileştiricidir.',
        fieldOfWork: 'Kardiyoloji',
        experienceYears: 15,
        bio: 'Mert Yılmaz, kardiyoloji alanında birçok uluslararası yayına sahip, teknoloji destekli teşhis yöntemleri üzerine uzmanlaşmış bir hekimdir.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        scoringSummary: [
          { label: 'Manevi Tatmin', score: 10 },
          { label: 'Eğitim Zorluğu', score: 10 },
          { label: 'İş Garantisi', score: 9 },
          { label: 'Boş Zaman', score: 3 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Pratisyen Hekim', 
        description: 'Birinci basamak sağlık hizmeti sunan genel tıp doktorudur.', 
        workplace: 'Aile sağlığı merkezleri, acil servisler.', 
        jobFindingEase: 10, 
        growthPotential: 5, 
        internationalOpportunities: 7,
        workplaceDistribution: [
          { category: 'Kamu Sağlık Kurumları', percentage: 80, companies: ['Sağlık Bakanlığı Hastaneleri', 'ASM'] },
          { category: 'Özel Sağlık Kabinleri', percentage: 20, companies: ['Özel Poliklinikler'] }
        ]
      },
      { 
        title: 'Uzman Cerrah', 
        description: 'Belirli bir alanda cerrahi operasyonlar gerçekleştiren doktordur.', 
        workplace: 'Kamu ve özel hastaneler.', 
        jobFindingEase: 9, 
        growthPotential: 8, 
        internationalOpportunities: 8,
        workplaceDistribution: [
          { category: 'Üniversite Hastaneleri', percentage: 40, companies: ['Çapa Tıp', 'Hacettepe Tıp'] },
          { category: 'Özel Hastane Grupları', percentage: 40, companies: ['Memorial', 'Medicana'] },
          { category: 'Yurt Dışı Klinikleri', percentage: 20, companies: ['Mayo Clinic', 'Charité'] }
        ]
      }
    ]
  },
  { 
    id: 'sec-3', 
    name: 'Yenilenebilir Enerji', 
    category: 'Mühendislik',
    growth: '%40', 
    difficulty: 'Orta', 
    salary: '35k - 90k TL', 
    icon: '🌱',
    description: 'Sürdürülebilir bir gelecek için kritik öneme sahip, mühendislik ve çevre bilimlerinin kesişim noktası.',
    hardSkills: ['Güneş/Rüzgar Teknolojileri', 'Elektrik Devreleri', 'Enerji Depolama', 'CAD Yazılımları', 'Çevresel Mevzuat'],
    softSkills: ['Sürekli Merak', 'Etik Yaklaşım', 'Kompleks Problem Çözme', 'Matematiksel Düşünme'],
    trends: ['Yeşil Hidrojen', 'Güneş Paneli Verimliliği', 'Enerji Depolama Çözümleri'],
    expertInsights: [
      { 
        id: 'ex-3', 
        name: 'Elif Can', 
        title: 'Enerji Stratejisti', 
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200', 
        comment: 'Gelecek yeşil enerjide. Bu alandaki inovasyon hızı inanılmaz bir seviyede.',
        fieldOfWork: 'Enerji Politikaları',
        experienceYears: 10,
        bio: 'Elif, sürdürülebilir enerji dönüşümü konusunda devletlere ve büyük şirketlere stratejik danışmanlık vermektedir.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        scoringSummary: [
          { label: 'Global Vizyon', score: 10 },
          { label: 'Maaş Artışı', score: 7 },
          { label: 'Ar-Ge Payı', score: 9 },
          { label: 'İstikrar', score: 8 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Güneş Enerjisi Uzmanı', 
        description: 'PV sistem tasarımı ve kurulumu üzerine odaklanır.', 
        workplace: 'Enerji firmaları, danışmanlık.', 
        jobFindingEase: 9, 
        growthPotential: 9, 
        internationalOpportunities: 8,
        workplaceDistribution: [
          { category: 'Enerji Yatırım Firmaları', percentage: 60, companies: ['SolarEdge', 'BayWa r.e.', 'Kalyon Enerji'] },
          { category: 'EPC (Mühendislik-Tedarik)', percentage: 30, companies: ['Asunim', 'Kontek'] },
          { category: 'Kamu Enerji Kurulları', percentage: 10, companies: ['EPDK'] }
        ]
      }
    ]
  },
  {
    id: 'sec-4',
    name: 'Finans ve Yatırım',
    category: 'Finans',
    growth: '%12',
    difficulty: 'Yüksek',
    salary: '45k - 180k TL',
    icon: '📈',
    description: 'Küresel ekonominin kalbi. Analitik zeka ve piyasa takibi ile servet yönetimi ve yatırım stratejileri üzerine odaklanır.',
    hardSkills: ['Finansal Modelleme', 'Varlık Yönetimi', 'Ekonomi', 'Excel/VBA', 'Risk Analizi'],
    softSkills: ['Stratejik Düşünme', 'Duygusal Dayanıklılık', 'Karar Verme', 'Müzakere'],
    trends: ['Blockchain Finansı', 'ESG Yatırımları', 'Algoritmik Trading'],
    expertInsights: [
      {
        id: 'ex-4',
        name: 'Kerem Atakan',
        title: 'Portföy Yöneticisi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
        comment: 'Rakamlar yalan söylemez, ama onları nasıl okuduğunuz her şeyi değiştirir.',
        fieldOfWork: 'Yatırım Bankacılığı',
        experienceYears: 18,
        bio: 'Kerem, son 10 yıldır uluslararası fonlarda risk yönetimi ve varlık tahsisi üzerine uzmanlaşmıştır.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        scoringSummary: [
          { label: 'Maaş Potansiyeli', score: 10 },
          { label: 'Zihinsel Efor', score: 9 },
          { label: 'Global Kariyer', score: 9 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'Yatırım Danışmanı', 
        description: 'Müşterilere finansal hedefleri doğrultusunda rehberlik eder.', 
        workplace: 'Bankalar, yatırım şirketleri.', 
        jobFindingEase: 7, 
        growthPotential: 8, 
        internationalOpportunities: 8,
        workplaceDistribution: [
          { category: 'Yatırım Bankacılığı', percentage: 50, companies: ['Goldman Sachs', 'Morgan Stanley', 'QNB Finansinvest'] },
          { category: 'Portföy Yönetimi', percentage: 40, companies: ['BlackRock', 'İstanbul Portföy'] },
          { category: 'Varlık Yönetimi', percentage: 10, companies: ['Hedge Funds'] }
        ]
      }
    ]
  },
  {
    id: 'sec-5',
    name: 'Dijital Tasarım & UX',
    category: 'Yaratıcı',
    growth: '%22',
    difficulty: 'Orta',
    salary: '30k - 100k TL',
    icon: '🎨',
    description: 'Kullanıcıların dijital dünyadaki deneyimini tasarlayan, estetik ve fonksiyonelliği birleştiren modern bir alan.',
    hardSkills: ['Figma', 'Adobe Suite', 'Prototipleme', 'Kullanıcı Araştırması', 'Görsel Hiyerarşi'],
    softSkills: ['Empati', 'Yaratıcılık', 'Eleştirel Düşünme', 'Kullanıcı Odaklılık'],
    trends: ['AI Destekli Tasarım', '3D UI', 'No-Code Tasarım Araçları'],
    expertInsights: [
      {
        id: 'ex-5',
        name: 'Selin Gökdeniz',
        title: 'UX Design Lead',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200&h=200',
        comment: 'Tasarım sadece nasıl göründüğü değil, nasıl hissettirdiğidir.',
        fieldOfWork: 'Kullanıcı Deneyimi',
        experienceYears: 9,
        bio: 'Selin, birçok global appin arayüz ve deneyim süreçlerini yönetmiş ödüllü bir tasarımcıdır.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        scoringSummary: [
          { label: 'Yaratıcılık', score: 10 },
          { label: 'Esnek Çalışma', score: 9 },
          { label: 'Sektör Hızı', score: 8 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'UX Designer', 
        description: 'Kullanıcı yolculuklarını ve etkileşimleri tasarlar.', 
        workplace: 'Teknoloji firmaları, ajanslar.', 
        jobFindingEase: 8, 
        growthPotential: 8, 
        internationalOpportunities: 9,
        workplaceDistribution: [
          { category: 'Ürün Odaklı Teknoloji Şirketleri', percentage: 70, companies: ['Spotify', 'Airbnb', 'Peak'] },
          { category: 'Kullanıcı Deneyimi Ajansları', percentage: 20, companies: ['Fjord', 'Frog Design'] },
          { category: 'Freelance & Danışmanlık', percentage: 10, companies: ['Independent'] }
        ]
      }
    ]
  },
  {
    id: 'sec-6',
    name: 'Yapay Zeka Uzmanlığı',
    category: 'Teknoloji',
    growth: '%65',
    difficulty: 'Çok Yüksek',
    salary: '80k - 250k TL',
    icon: '🤖',
    description: 'Geleceğin dünyasını inşa eden, makinelerin öğrenmesini ve karar vermesini sağlayan en ileri teknoloji alanı.',
    hardSkills: ['Machine Learning', 'Deep Learning', 'PyTorch/TensorFlow', 'Veri Bilimi', 'NLP'],
    softSkills: ['Sürekli Merak', 'Etik Yaklaşım', 'Kompleks Problem Çözme', 'Matematiksel Düşünme'],
    trends: ['Generative AI', 'Otonom Sistemler', 'AI Etiği ve Güvenliği'],
    expertInsights: [
      {
        id: 'ex-6',
        name: 'Dr. Berk Erdem',
        title: 'AI Researcher',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
        comment: 'AI artık bir araç değil, yeni bir düşünme biçimidir.',
        fieldOfWork: 'Yapay Sinir Ağları',
        experienceYears: 11,
        bio: 'Berk, akademik kariyerini AI ve insan etkileşimi üzerine kurmuş, birçok patent sahibi bir araştırmacıdır.',
        videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        scoringSummary: [
          { label: 'Gelecek Vizyonu', score: 10 },
          { label: 'Maddi Getiri', score: 10 },
          { label: 'Giriş Bariyeri', score: 10 }
        ]
      }
    ],
    specializations: [
      { 
        title: 'NLP Engineer', 
        description: 'Dil işleme modelleri üzerine uzmanlaşır.', 
        workplace: 'Teknoloji devleri, AI girişimleri.', 
        jobFindingEase: 9, 
        growthPotential: 10, 
        internationalOpportunities: 10,
        workplaceDistribution: [
          { category: 'Yapay Zeka Laboratuvarları', percentage: 50, companies: ['OpenAI', 'DeepMind', 'Anthropic'] },
          { category: 'Kurumsal AI Departmanları', percentage: 40, companies: ['Microsoft Research', 'Meta AI'] },
          { category: 'Akademik Araştırma', percentage: 10, companies: ['Stanford AI', 'MIT CSAIL'] }
        ]
      }
    ]
  }
];

interface Props {
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSeeDetail: (id: string) => void;
  hasTestResult: boolean;
}

const SectorsView: React.FC<Props> = ({ savedIds, onToggleSave, onSeeDetail, hasTestResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'growth' | 'salary'>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('Hepsi');

  const categories = ['Hepsi', 'Teknoloji', 'Sağlık', 'Finans', 'Yaratıcı', 'Mühendislik'];

  const filteredSectors = useMemo(() => {
    let result = sectors.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Hepsi' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    
    if (sortOrder === 'growth') {
      result = [...result].sort((a, b) => parseInt(b.growth) - parseInt(a.growth));
    } else if (sortOrder === 'salary') {
      result = [...result].sort((a, b) => {
        const getVal = (s: string) => parseInt(s.split('-')[1]?.trim().replace('k', '') || s.split(' ')[0].replace('k', ''));
        return getVal(b.salary) - getVal(a.salary);
      });
    }
    return result;
  }, [searchTerm, sortOrder, selectedCategory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Sektör Karşılaştırma</h1>
          <p className="text-gray-500 font-medium">Geleceğin dünyasında seni bekleyen fırsatları keşfet.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Sektör veya beceri ara..."
              className="pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary outline-none w-full sm:w-72 shadow-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm">
            {['growth', 'salary'].map((sort) => (
              <button 
                key={sort}
                onClick={() => setSortOrder(sort as any)}
                className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${sortOrder === sort ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:bg-brand-50'}`}
              >
                {sort === 'growth' ? 'Büyüme' : 'Maaş'}
              </button>
            ))}
            <button 
              onClick={() => {setSortOrder('default'); setSelectedCategory('Hepsi'); setSearchTerm('');}}
              className="px-5 py-2 text-[10px] font-black text-gray-400 hover:text-brand-primary uppercase tracking-widest"
            >
              Sıfırla
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Category Bar */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
              selectedCategory === cat 
                ? 'bg-brand-50 border-brand-primary text-brand-primary' 
                : 'bg-white border-gray-100 text-gray-400 hover:border-brand-200 hover:text-brand-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSectors.map((sector) => (
          <div key={sector.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500 group relative border-b-8 border-b-transparent hover:border-b-brand-primary">
            <button 
              onClick={() => onToggleSave(sector.id)}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-gray-300 hover:text-brand-primary hover:bg-brand-50 transition-all z-10 shadow-sm"
            >
              {savedIds.includes(sector.id) ? <BookmarkCheck className="w-5 h-5 fill-current text-brand-primary" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-brand-50 rounded-[22px] flex items-center justify-center text-4xl shadow-inner border border-brand-100 group-hover:scale-110 transition-transform duration-500">
                  {sector.icon}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {sector.category}
                  </span>
                  {parseInt(sector.growth) > 20 && (
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5 animate-pulse">
                      <TrendingUp className="w-3.5 h-3.5" /> Trend
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-800 mb-3 tracking-tight group-hover:text-brand-primary transition-colors">{sector.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-8 leading-relaxed font-medium">{sector.description}</p>
              
              <div className="grid grid-cols-1 gap-3 mb-8">
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-primary" /> Büyüme
                  </span>
                  <span className="font-black text-green-600 text-sm">{sector.growth}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5 text-brand-primary" /> Maaş
                  </span>
                  <span className="font-black text-brand-primary text-sm">{sector.salary}</span>
                </div>
              </div>

              <button 
                onClick={() => onSeeDetail(sector.id)}
                className="w-full bg-brand-primary text-white py-4 rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-brand-600 transition-all shadow-xl shadow-brand-200 active:scale-[0.98]"
              >
                Analizi Gör
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorsView;
