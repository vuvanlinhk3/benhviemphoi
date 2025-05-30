import os
import pickle
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
from tensorflow.keras.metrics import AUC
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt

# --- 1. Thư mục dữ liệu ---
train_dir = "data/chest_xray/train"
val_dir = "data/chest_xray/val"
test_dir = "data/chest_xray/test"

# --- 2. Data Augmentation ---
train_datagen = ImageDataGenerator(
    rescale=1. / 255,
    rotation_range=30,
    zoom_range=0.25,
    width_shift_range=0.15,
    height_shift_range=0.15,
    shear_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)
val_test_datagen = ImageDataGenerator(rescale=1. / 255)

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

# Fine-tune từ layer 400 trở đi
for layer in base_model.layers[:400]:
    layer.trainable = False
for layer in base_model.layers[400:]:
    layer.trainable = True

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
x = Dense(256, activation='relu')(x)
x = BatchNormalization()(x)
x = Dropout(0.5)(x)
x = Dense(128, activation='relu')(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)
predictions = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# --- 4. Compile ---
model.compile(optimizer=Adam(learning_rate=1e-5),
              loss='binary_crossentropy',
              metrics=['accuracy', AUC(name='auc')])

# --- 5. Callbacks ---
callbacks = [
    EarlyStopping(monitor='val_loss', patience=6, restore_best_weights=True, verbose=1),
    ModelCheckpoint("best_model1.keras", monitor='val_loss', save_best_only=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=4, verbose=1, min_lr=1e-7)
]

# --- 6. Train ---
steps_per_epoch = train_generator.samples // train_generator.batch_size
validation_steps = val_generator.samples // val_generator.batch_size

history = model.fit(
    train_generator,
    validation_data=val_generator,
    steps_per_epoch=steps_per_epoch,
    validation_steps=validation_steps,
    epochs=50,
    callbacks=callbacks
)

# Lưu lại lịch sử huấn luyện
with open('training_history.pkl', 'wb') as f:
    pickle.dump(history.history, f)

# --- 7. Đánh giá ---
results = model.evaluate(test_generator, return_dict=True)
print("✅ Evaluation Results:")
for key, value in results.items():
    print(f"{key}: {value:.4f}")

# --- 8. Báo cáo phân loại ---
y_pred_prob = model.predict(test_generator)
y_pred = (y_pred_prob > 0.5).astype("int32")
y_true = test_generator.classes
labels = list(test_generator.class_indices.keys())

print("📊 Classification Report:")
print(classification_report(y_true, y_pred, target_names=labels))

# --- 9. Lưu mô hình ---
model.save("final_densenet121_pneumonia_model2.keras")
print("💾 Mô hình đã lưu tại:", os.path.abspath("final_densenet121_pneumonia_model2.keras"))

# --- 10. Vẽ biểu đồ Accuracy ---
plt.plot(history.history['accuracy'], label='Train Acc')
plt.plot(history.history['val_accuracy'], label='Val Acc')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.title('Training vs Validation Accuracy')
plt.legend()
plt.grid(True)
plt.show()

# --- 11. Vẽ biểu đồ Loss ---
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Val Loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.title('Training vs Validation Loss')
plt.legend()
plt.grid(True)
plt.show()
