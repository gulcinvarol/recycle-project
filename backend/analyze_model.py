from ultralytics import YOLO
import torch

# Modeli yükle
try:
    model = YOLO('model.pt')
    print("=" * 60)
    print("MODEL BİLGİLERİ")
    print("=" * 60)
    
    # Sınıf bilgileri
    print(f"\n📊 Sınıf Sayısı: {model.model.nc}")
    print(f"📂 Sınıflar: {model.names}")
    
    # Model mimarisi
    print(f"\n🏗️ Model Mimarisi: {type(model.model).__name__}")
    
    # Model parametreleri
    total_params = sum(p.numel() for p in model.model.parameters())
    print(f"⚙️ Toplam Parametre: {total_params:,}")
    
    # Model boyutu
    import os
    model_size = os.path.getsize('model.pt') / (1024 * 1024)
    print(f"💾 Model Dosya Boyutu: {model_size:.2f} MB")
    
    # İnput boyutu
    if hasattr(model, 'model') and hasattr(model.model, 'stride'):
        print(f"📏 İnput Boyutu: {model.model.stride}")
    
    print("\n" + "=" * 60)
    print("MODEL YAPISI")
    print("=" * 60)
    print(model.model)
    
except Exception as e:
    print(f"Hata: {e}")
    import traceback
    traceback.print_exc()
