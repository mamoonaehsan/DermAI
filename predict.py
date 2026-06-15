import os # Operating System interface module to manage environment configurations and path logic
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' #Suppressing Warnings (first lines) 
import tensorflow as tf # Core framework used to load the pre-trained deep learning architecture and run tensor computations
from tensorflow.keras.preprocessing import image # Keras pre-processing utility specifically imported to programmatically load and scale structural input images
import numpy as np # Standard mathematical library used to cast processed image vectors into multi-dimensional numerical arrays

# 1. Load the trained MobileNetV2 model
# Path handling
base_path = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_path, 'skin_disease_model.h5')

if not os.path.exists(model_path):
    print(f"Error: Model file not found at {model_path}")
    exit()

model = tf.keras.models.load_model(model_path)

# 2. Define the 22 classes (Diseases) - Must match training order
class_names = [
    'Acne', 'Actinic Keratosis', 'Benign Tumors', 'Bullous', 
    'Candidiasis', 'Drug Eruption', 'Eczema', 'Infestations/Bites', 
    'Lichen', 'Lupus', 'Moles', 'Psoriasis', 'Rosacea', 
    'Seborrheic Keratoses', 'Skin Cancer', 'Sun Damage', 
    'Tinea', 'Unknown/Normal', 'Vascular Tumors', 'Vasculitis', 
    'Vitiligo', 'Warts'
]

# 3. Prediction Function (Reusable code)
def predict_skin_disease(img_path):
    if not os.path.exists(img_path):
        return "Image not found", 0.0

    # Preprocessing
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) # Expands the array shape by adding a batch dimension (axis=0) to convert a 3D image into a 4D tensor matching the model input requirement
    img_array /= 255.0  # Normalization

    # Model Prediction
    predictions = model.predict(img_array, verbose=0) # Executes forward-pass prediction on the normalized 4D tensor and suppresses terminal loading output
    score = np.max(predictions)
    class_idx = np.argmax(predictions)
    
    # Safety Check for Index
    if class_idx < len(class_names):
        result = class_names[class_idx]
    else:
        result = "Unknown"
        
    return result, score

# --- Testing the code ---
test_img = r"C:\Users\malih\Downloads\fyp forty percent\improved fyp\dataset\test\Acne\acne-pustular-26.jpeg"

print("Analyzing image...")
disease, confidence = predict_skin_disease(test_img)

print("-" * 30)
print(f"Prediction: {disease}")
print(f"Confidence Score: {confidence * 100:.2f}%")
print("-" * 30)