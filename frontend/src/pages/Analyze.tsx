import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Upload, CheckCircle, AlertCircle, ImagePlus, ScanSearch, Camera, X, RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PredictionResult {
  class: string;
  confidence: string;
}

const CLASS_TRANSLATIONS: Record<string, string> = {
    "cardboard": "Karton",
    "glass": "Cam",
    "metal": "Metal",
    "paper": "Kağıt",
    "plastic": "Plastik",
    "trash": "Diğer Çöp"
};

const Analyze = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Kamera State'leri
  const [isCameraActive, setIsCameraActive] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya işleme (Hem upload hem kamera için ortak)
  const processFile = (file: File) => {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setError(null);
    setIsCameraActive(false); // Fotoğraf seçilince kamerayı kapat
  };

  // Base64 (Kamera çıktısı) -> File Objesine Çevirme
  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Fotoğraf Çekme Fonksiyonu
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
        const file = dataURLtoFile(imageSrc, "camera-capture.jpg");
        processFile(file);
    }
  }, [webcamRef]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      processFile(event.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const translatedClass = CLASS_TRANSLATIONS[response.data.class.toLowerCase()] || response.data.class;
      setResult({ ...response.data, class: translatedClass });
    } catch (err) {
        console.error(err);
        setError("Analiz sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="container mx-auto p-4 py-12 flex justify-center animate-in fade-in duration-500 min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-xl shadow-xl border-slate-200/60 bg-white/80 backdrop-blur-sm h-fit">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <ScanSearch className="h-8 w-8 text-green-600" /> Atık Analizi
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Geri dönüştürülebilir atığı tanımlamak için bir yöntem seçin.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
            
            {/* Mod Seçimi (Kamera kapalıyken göster) */}
            {!previewUrl && !isCameraActive && (
                 <Tabs defaultValue="upload" className="w-full">
                 <TabsList className="grid w-full grid-cols-2 mb-4">
                   <TabsTrigger value="upload">Dosya Yükle</TabsTrigger>
                   <TabsTrigger value="camera" onClick={() => setIsCameraActive(true)}>Kamerayı Aç</TabsTrigger>
                 </TabsList>
               </Tabs>
            )}

            {/* 1. DURUM: Kamera Modu Aktif */}
            {isCameraActive && !previewUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: "environment" }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 flex gap-4">
                        <Button variant="destructive" size="icon" onClick={() => setIsCameraActive(false)} className="rounded-full h-12 w-12">
                            <X className="h-6 w-6"/>
                        </Button>
                        <Button onClick={capture} className="rounded-full h-12 w-12 bg-white hover:bg-slate-200 text-slate-900 border-4 border-slate-300">
                            <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                        </Button>
                    </div>
                </div>
            )}

            {/* 2. DURUM: Dosya Yükleme Modu (Kamera kapalı ve resim yoksa) */}
            {!isCameraActive && !previewUrl && (
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-3 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[300px] group
                    ${isDragging 
                        ? 'border-green-500 bg-green-50/50 animate-pulse-border scale-[1.02]' 
                        : 'border-slate-300 hover:border-green-400 hover:bg-slate-50'
                    }`}
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    <div className="p-4 rounded-full bg-slate-100 text-slate-400 group-hover:text-green-500 group-hover:bg-green-50 transition-colors mb-4">
                        <Upload className="h-10 w-10" />
                    </div>
                    <div className="text-center">
                        <p className="text-lg text-slate-700 font-medium">Fotoğrafı buraya sürükle</p>
                        <p className="text-sm text-slate-500">veya dosyalarından seç</p>
                    </div>
                    <Button variant="ghost" className="mt-4 text-slate-400 hover:text-slate-600" onClick={(e) => {
                        e.stopPropagation();
                        setIsCameraActive(true);
                    }}>
                        <Camera className="mr-2 h-4 w-4"/> Kamerayı Kullan
                    </Button>
                </div>
            )}

            {/* 3. DURUM: Resim Seçildi/Çekildi (Önizleme ve Sonuç) */}
            {previewUrl && (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                        <img src={previewUrl} alt="Preview" className="w-full max-h-[400px] object-cover" />
                        
                        {/* Tarama Efekti */}
                        {loading && <div className="scanning-overlay z-20"></div>}

                        {/* Resmi Değiştir Butonu */}
                        {!loading && (
                             <Button 
                                size="sm" 
                                variant="secondary" 
                                className="absolute top-4 right-4 shadow-lg bg-white/90 hover:bg-white text-slate-800"
                                onClick={() => {
                                    setPreviewUrl(null);
                                    setSelectedImage(null);
                                    setResult(null);
                                }}
                             >
                                <RefreshCcw className="mr-2 h-4 w-4"/> Yeni Fotoğraf
                             </Button>
                        )}
                    </div>

                    {/* Sonuç Gösterimi */}
                    {result && (
                        <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Tespit Edilen Atık</p>
                            <h3 className="text-3xl font-extrabold text-green-800 capitalize flex items-center gap-2">
                                {result.class}
                                <CheckCircle className="h-6 w-6 text-green-600"/>
                            </h3>
                        </div>
                        <div className="text-right">
                            <Badge variant="outline" className="bg-white text-green-700 border-green-300 text-xl px-4 py-2 font-bold shadow-sm">
                            %{result.confidence}
                            </Badge>
                            <p className="text-xs text-green-600 mt-1 font-medium">Güven Oranı</p>
                        </div>
                        </div>
                    )}

                     {/* Hata Mesajı */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg border border-red-100 animate-in shake">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Analiz Butonu */}
                    <Button 
                        onClick={handlePredict} 
                        disabled={loading || !!result} // Sonuç varsa veya yükleniyorsa disable et
                        className={`w-full text-lg h-14 transition-all shadow-md ${result ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        size="lg"
                    >
                        {loading ? (
                        <>
                            <ScanSearch className="mr-2 h-6 w-6 animate-spin" /> Analiz Yapılıyor...
                        </>
                        ) : result ? (
                           <>Analiz Tamamlandı</> 
                        ) : (
                        <>
                            <ScanSearch className="mr-2 h-6 w-6" /> Analizi Başlat
                        </>
                        )}
                    </Button>
                </div>
            )}

        </CardContent>
      </Card>
    </div>
  );
};

export default Analyze;