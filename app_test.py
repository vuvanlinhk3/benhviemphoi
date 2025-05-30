import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import matplotlib.pyplot as plt

# ✅ Bước 1: Load mô hình đã huấn luyện
model = tf.keras.models.load_model("best_model1.keras")

# ✅ Bước 2: Tiền xử lý ảnh ngoài
def preprocess_external_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = img_array / 255.0  # Chuẩn hóa giống khi huấn luyện
    img_array = np.expand_dims(img_array, axis=0)  # Thêm batch dimension
    return img_array

# ✅ Bước 3: Dự đoán
def predict_external_image(img_path):
    img_array = preprocess_external_image(img_path)
    prediction = model.predict(img_array)[0][0]
    label = "PNEUMONIA" if prediction > 0.5 else "NORMAL"
    confidence = prediction if prediction > 0.5 else 1 - prediction

    # Hiển thị ảnh và kết quả
    plt.imshow(image.load_img(img_path))
    plt.title(f"Prediction: {label} ({confidence:.2%})")
    plt.axis("off")
    plt.show()
    return label, confidence

# ✅ Gọi hàm với ảnh ngoài
img_path = "data/viem-phoi1.jpg"  # ← thay bằng đường dẫn ảnh thật
predict_external_image(img_path)
