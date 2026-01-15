from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# --- CORS AYARLARI ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Frontend erişimi için
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODEL YÜKLEME ---
try:
    print("Model yükleniyor...")
    # YOLO kütüphanesi .pt dosyasını otomatik tanır ve yükler
    model = YOLO("model.pt")
    print("✅ Model başarıyla yüklendi!")
except Exception as e:
    print(f"❌ Model yüklenirken hata oluştu: {e}")
    model = None

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model yüklü değil.")

    try:
        # 1. Resmi Frontend'den al ve oku
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        # 2. Tahmin Yap (YOLO resim işlemeyi kendi halleder)
        # verbose=False terminali gereksiz loglarla doldurmaz
        results = model(image, verbose=False) 
        
        # 3. Sonuçları Çıkar
        # YOLO sonuçları bir liste olarak döner (biz tek resim yolladığımız için ilkini alıyoruz)
        result = results[0]
        
        # En yüksek olasılıklı sınıfın indexi
        top1_index = result.probs.top1
        
        # Sınıf ismi (Modelin içinden otomatik gelir)
        class_name = result.names[top1_index]
        
        # Güven oranı (0-1 arasındadır, 100 ile çarpıyoruz)
        confidence = result.probs.top1conf.item() * 100

        return {
            "class": class_name,  # Örn: "cardboard"
            "confidence": f"{confidence:.2f}%"
        }

    except Exception as e:
        print(f"Tahmin hatası: {e}")
        raise HTTPException(status_code=500, detail=str(e))