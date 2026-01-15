import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, Recycle, Leaf, Wind, Droplets, 
  FileText, Box, GlassWater, Hammer, Package, Trash2, ScanLine 
} from 'lucide-react';

const Home = () => {

  // "Sistem Nasıl Çalışır?" butonuna basınca çalışacak kaydırma fonksiyonu
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- HERO SECTION (Ana Giriş) --- */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32">
        {/* Arkaplan Işık Efektleri */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/50 px-4 py-1 text-sm">
            Yapay Zeka Destekli Sınıflandırma
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Atığını Tanı, <br className="hidden md:block" /> Doğayı Koru.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hangi çöpün nereye atılacağını düşünmene gerek yok. Yükle, yapay zeka saniyeler içinde söylesin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Analiz Butonu */}
            <Link to="/analiz">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 h-14 px-8 text-lg rounded-full shadow-lg shadow-green-900/20">
                Hemen Analiz Et <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            {/* Scroll Butonu */}
            <Button 
                variant="outline" 
                size="lg" 
                onClick={scrollToHowItWorks}
                className="h-14 px-8 text-lg rounded-full border-slate-700 text-slate-900 hover:bg-slate-800 hover:text-white"
            >
              Sistem Nasıl Çalışır?
            </Button>
          </div>
        </div>
      </section>

      {/* --- İSTATİSTİKLER --- */}
      <section className="bg-green-50 border-y border-green-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StatItem 
            icon={<Leaf className="h-8 w-8 text-green-600" />} 
            value="17 Ağaç" 
            label="1 Ton Kağıt Geri Dönüşümüyle Kurtarılır" 
          />
          <StatItem 
            icon={<Wind className="h-8 w-8 text-blue-600" />} 
            value="%95 Enerji" 
            label="Alüminyum Geri Dönüşümüyle Tasarruf Edilir" 
          />
          <StatItem 
            icon={<Droplets className="h-8 w-8 text-cyan-600" />} 
            value="4000 Yıl" 
            label="Cam Şişenin Doğada Yok Olma Süresi" 
          />
        </div>
      </section>

      {/* --- NASIL ÇALIŞIR? (ID Eklendi: how-it-works) --- */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Sistem Nasıl Çalışır?</h2>
            <p className="text-slate-600">Karmaşık süreçleri sizin için 3 basit adıma indirdik.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
             {/* Çizgi Efekti */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

            <StepCard 
              number="01" 
              title="Fotoğrafı Çek" 
              desc="Ayrıştırmak istediğiniz atığın fotoğrafını çekin veya dosyalardan yükleyin." 
              icon={<ScanLine className="h-10 w-10 text-blue-600" />} 
            />
             <StepCard 
              number="02" 
              title="Yapay Zeka Analizi" 
              desc="Gelişmiş derin öğrenme modelimiz görseli tarar ve materyali tanımlar." 
              icon={<Recycle className="h-10 w-10 text-green-600" />} 
            />
             <StepCard 
              number="03" 
              title="Doğru Kutuya At" 
              desc="Size sonucun hangi geri dönüşüm kategorisine girdiğini gösterelim." 
              icon={<Trash2 className="h-10 w-10 text-orange-600" />} 
            />
          </div>
        </div>
      </section>

      {/* --- ATIK KÜTÜPHANESİ --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Neleri Ayrıştırıyoruz?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Yapay zeka modelimiz şu anda aşağıdaki 6 ana kategoriyi %95'in üzerinde doğrulukla tespit edebilmektedir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WasteCard 
              title="Kağıt" 
              color="bg-blue-50 text-blue-700 border-blue-200" 
              icon={<FileText className="h-12 w-12 mb-4" />} 
              desc="Gazeteler, dergiler, ofis kağıtları. Islak veya yağlı kağıtlar geri dönüştürülemez." 
            />
            <WasteCard 
              title="Karton" 
              color="bg-amber-50 text-amber-800 border-amber-200" 
              icon={<Box className="h-12 w-12 mb-4" />} 
              desc="Koli kutuları, yumurta kapları. Bantları sökülerek ve düzleştirilerek atılmalıdır." 
            />
            <WasteCard 
              title="Plastik" 
              color="bg-yellow-50 text-yellow-700 border-yellow-200" 
              icon={<Package className="h-12 w-12 mb-4" />} 
              desc="PET şişeler, şampuan kutuları. İçleri yıkanıp ezilerek atılmalıdır." 
            />
            <WasteCard 
              title="Cam" 
              color="bg-emerald-50 text-emerald-700 border-emerald-200" 
              icon={<GlassWater className="h-12 w-12 mb-4" />} 
              desc="İçecek şişeleri, kavanozlar. Kapakları çıkarılmalı, kırılmadan atılmalıdır." 
            />
            <WasteCard 
              title="Metal" 
              color="bg-slate-200 text-slate-700 border-slate-300" 
              icon={<Hammer className="h-12 w-12 mb-4" />} 
              desc="Konserve kutuları, içecek kutuları. Alüminyum ve çelik sonsuz kez dönüştürülebilir." 
            />
             <WasteCard 
              title="Evsel Atık (Çöp)" 
              color="bg-gray-800 text-gray-300 border-gray-700" 
              icon={<Trash2 className="h-12 w-12 mb-4" />} 
              desc="Dönüştürülemeyen diğer atıklar. Organik atıklar veya kirli ambalajlar." 
            />
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-green-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Dünyayı Değiştirmeye Hazır mısın?</h2>
          <p className="text-green-100 mb-10 max-w-xl mx-auto text-lg">
            Küçük bir ayrıştırma işlemi, büyük bir değişimin başlangıcıdır. Şimdi test et.
          </p>
          <Link to="/analiz">
            <Button size="lg" className="bg-white text-green-700 hover:bg-green-50 text-lg h-14 px-10 rounded-full font-bold">
              Test Etmeye Başla
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// --- YARDIMCI COMPONENTLER ---

const StatItem = ({ icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="flex flex-col items-center p-4 hover:-translate-y-1 transition-transform duration-300">
    <div className="mb-3 bg-white p-4 rounded-full shadow-sm">{icon}</div>
    <div className="text-3xl font-extrabold text-slate-800 mb-1">{value}</div>
    <div className="text-sm text-slate-500 font-medium">{label}</div>
  </div>
);

const StepCard = ({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: any }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative z-10 hover:shadow-xl transition-shadow duration-300">
    <div className="text-6xl font-bold text-slate-100 absolute top-4 right-4 -z-10 select-none">{number}</div>
    <div className="mb-6 bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center">{icon}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const WasteCard = ({ title, desc, icon, color }: { title: string, desc: string, icon: any, color: string }) => (
  <div className={`p-8 rounded-3xl border ${color} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-default`}>
    <div className="flex justify-between items-start">
      {icon}
      <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-current">Tespit Edilebilir</Badge>
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="opacity-90 font-medium">{desc}</p>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
    <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
          <Recycle className="h-8 w-8 text-green-500" />
          EcoZeka
        </div>
        <p className="max-w-xs text-sm">
          Yapay zeka teknolojilerini kullanarak sürdürülebilir bir gelecek için atık yönetimini kolaylaştırıyoruz.
        </p>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-4">Proje</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/" className="hover:text-green-400">Ana Sayfa</Link></li>
          <li><Link to="/analiz" className="hover:text-green-400">Analiz Aracı</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">İletişim</h4>
        <ul className="space-y-2 text-sm">
          <li>GitHub</li>
          <li>LinkedIn</li>
          <li>mevlit@example.com</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
      &copy; 2024 EcoZeka Projesi. Tüm hakları saklıdır.
    </div>
  </footer>
);

export default Home;