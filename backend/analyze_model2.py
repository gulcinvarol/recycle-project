import torch
import os

try:
    # Model dosyasını torch ile yükle
    model_path = 'model.pt'
    
    # Dosya bilgileri
    file_size = os.path.getsize(model_path) / (1024 * 1024)
    print(f"Model Dosya Boyutu: {file_size:.2f} MB")
    
    # YOLO model dosyasını yükle (state_dict'i al)
    checkpoint = torch.load(model_path)
    
    # Kontrol et ne var
    print(f"\nCheckpoint keys: {list(checkpoint.keys())}")
    
    # Model bilgileri var mı kontrol et
    if isinstance(checkpoint, dict):
        for key in checkpoint:
            val = checkpoint[key]
            if isinstance(val, dict):
                print(f"\n{key} içindeki keys: {list(val.keys())[:10]}")
            else:
                print(f"{key}: {type(val)}")
    
    # Eğer ultralytics tarafından kaydedilmişse
    if hasattr(checkpoint, 'model'):
        print("\nModel var!")
        
except Exception as e:
    print(f"Hata: {e}")
    import traceback
    traceback.print_exc()
