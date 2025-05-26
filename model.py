import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# --- 1. Thư mục dữ liệu ---
train_dir = "data/chest_xray/train"
val_dir = "data/chest_xray/val"
test_dir = "data/chest_xray/test"

# --- 2. Data Augmentation mạnh hơn ---
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    zoom_range=0.2,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.15,
    horizontal_flip=True,
    fill_mode='nearest'
)

val_test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    train_dir, target_size=(224, 224), batch_size=32, class_mode='binary'
)
val_generator = val_test_datagen.flow_from_directory(
    val_dir, target_size=(224, 224), batch_size=32, class_mode='binary'
)
test_generator = val_test_datagen.flow_from_directory(
    test_dir, target_size=(224, 224), batch_size=32, class_mode='binary', shuffle=False
)

# --- 3. Xây dựng mô hình ---
base_model = DenseNet121(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False  # Freeze toàn bộ trước

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)  # Tăng Dropout
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)  # Thêm Dropout
predictions = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# --- 4. Compile ---
model.compile(optimizer=Adam(learning_rate=1e-4),
              loss='binary_crossentropy',
              metrics=['accuracy'])

# --- 5. Callback: EarlyStopping & ModelCheckpoint ---
callbacks = [
    EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True, verbose=1),
    ModelCheckpoint("best_model.keras", monitor='val_loss', save_best_only=True, verbose=1)
]

# --- 6. Train ---
history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=50,
    callbacks=callbacks
)

# --- 7. Đánh giá ---
loss, acc = model.evaluate(test_generator)
print(f"✅ Test Accuracy: {acc:.4f}")

# --- 8. Báo cáo phân loại ---
y_pred_prob = model.predict(test_generator)
y_pred = (y_pred_prob > 0.5).astype("int32")
y_true = test_generator.classes
labels = list(test_generator.class_indices.keys())

print("📊 Classification Report:")
print(classification_report(y_true, y_pred, target_names=labels))

# --- 9. Lưu mô hình đã huấn luyện ---
model.save("final_densenet121_pneumonia_model1.keras")
print("💾 Mô hình đã lưu tại:", os.path.abspath("final_densenet121_pneumonia_model1.keras"))

# --- 10. Vẽ biểu đồ ---
plt.plot(history.history['accuracy'], label='Train Acc')
plt.plot(history.history['val_accuracy'], label='Val Acc')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.title('Training vs Validation Accuracy (Anti-overfitting)')
plt.legend()
plt.grid(True)
plt.show()
