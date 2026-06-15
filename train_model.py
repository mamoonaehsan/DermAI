import tensorflow as tf #run core nework calculations
from tensorflow.keras.preprocessing.image import ImageDataGenerator#(Data Augmentation Tool).
from tensorflow.keras.applications import MobileNetV2 #(Pre-trained Backbone).
from tensorflow.keras import layers, models

# 1. Dataset Path
train_dir = 'improved fyp/dataset/train'

# 2. Data Augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,# Min-Max Normalization: Scales raw pixel values from [0,255] to strict [0,1] range
    rotation_range=20,# Randomly rotates images up to 20 degrees to simulate orientation variations
    zoom_range=0.2,# Randomly zooms inside images by 20% to handle distance/scale variations
    horizontal_flip=True,# Randomly flips images horizontally to make the network invariant to direction
    validation_split=0.2# Stratified splitting: Allocates 20% of the dataset for validation tracking
)

# Load and resize training images to (224, 224) in batches of 32
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# 3. MobileNetV2 Model (No new installation needed)
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False 

# Build sequential model and append custom layers for our 22 diseases
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),# Flattens the feature maps into a 1D vector
    layers.Dense(128, activation='relu'),# Intermediate layer for feature extraction
    layers.Dropout(0.2),# Regularization to prevent model overfitting
    layers.Dense(22, activation='softmax') # 22 skin diseases
])

# Compile model using Adam optimizer and Categorical Crossentropy loss
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model configuration across 20 full epochs
print("\nStarting Stable Training with MobileNet...")
model.fit(train_generator, validation_data=validation_generator, epochs=20)

# Save the complete trained model state as an H5 file
model.save('improved fyp/scripts/skin_disease_model.h5')
print("\nModel saved successfully!")