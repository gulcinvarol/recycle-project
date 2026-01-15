from ultralytics import YOLO
import os

model = YOLO('model.pt')

print("=" * 60)
print("VERİ SETİ SINIFLARI (CLASSES)")
print("=" * 60)

for i, name in model.names.items():
    print(f"{i}: {name}")

print(f"\nToplam Sınıf Sayısı: {len(model.names)}")
print(f"\nModel Dosya Boyutu: {os.path.getsize('model.pt') / (1024*1024):.2f} MB")
print(f"Model Mimarisi: {model.model.__class__.__name__}")

# Model parametreleri
total_params = sum(p.numel() for p in model.model.parameters())
print(f"Toplam Parametre Sayısı: {total_params:,}")

print("\n" + "=" * 60)
print("MODEL DETAYLARI")
print("=" * 60)
print(model)
