# Python机器学习

## 机器学习概述

### 机器学习类型
```python
# 监督学习: 分类、回归
# 无监督学习: 聚类、降维
# 半监督学习: 结合有标签和无标签数据
# 强化学习: 通过环境交互学习
```

### 常用库
```python
# NumPy: 数值计算
# Pandas: 数据处理
# Scikit-learn: 机器学习算法
# TensorFlow: 深度学习
# PyTorch: 深度学习
# Keras: 深度学习高级API
```

## 数据预处理

### 数据加载
```python
import pandas as pd
import numpy as np

# 从CSV加载数据
data = pd.read_csv('data.csv')

# 从Excel加载数据
data = pd.read_excel('data.xlsx')

# 创建示例数据
X = np.array([[1, 2], [3, 4], [5, 6]])
y = np.array([0, 1, 0])
```

### 数据清洗
```python
# 处理缺失值
data.fillna(data.mean(), inplace=True)

# 删除重复值
data.drop_duplicates(inplace=True)

# 处理异常值
Q1 = data.quantile(0.25)
Q3 = data.quantile(0.75)
IQR = Q3 - Q1
data = data[~((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).any(axis=1)]
```

### 特征工程
```python
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer

# 数值特征标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 分类特征编码
encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X_categorical)

# 组合特征处理
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(), categorical_features)
    ])
```

## 监督学习

### 线性回归
```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# 创建模型
model = LinearRegression()

# 训练模型
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
mse = mean_squared_error(y_test, y_pred)
```

### 逻辑回归
```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 创建模型
model = LogisticRegression()

# 训练模型
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
accuracy = accuracy_score(y_test, y_pred)
```

### 决策树
```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

# 创建模型
model = DecisionTreeClassifier(max_depth=3)

# 训练模型
model.fit(X_train, y_train)

# 可视化决策树
plt.figure(figsize=(20,10))
plot_tree(model, filled=True)
plt.show()
```

### 随机森林
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# 创建模型
model = RandomForestClassifier(n_estimators=100)

# 训练模型
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)

# 评估
print(classification_report(y_test, y_pred))
```

## 无监督学习

### K均值聚类
```python
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 创建模型
kmeans = KMeans(n_clusters=3)

# 训练模型
kmeans.fit(X)

# 获取聚类结果
labels = kmeans.labels_

# 评估
score = silhouette_score(X, labels)
```

### 主成分分析
```python
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 创建模型
pca = PCA(n_components=2)

# 训练模型
X_pca = pca.fit_transform(X)

# 可视化
plt.scatter(X_pca[:, 0], X_pca[:, 1])
plt.show()
```

## 模型评估

### 交叉验证
```python
from sklearn.model_selection import cross_val_score

# 执行交叉验证
scores = cross_val_score(model, X, y, cv=5)

# 打印结果
print(f"交叉验证得分: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})")
```

### 混淆矩阵
```python
from sklearn.metrics import confusion_matrix
import seaborn as sns

# 计算混淆矩阵
cm = confusion_matrix(y_test, y_pred)

# 可视化
sns.heatmap(cm, annot=True, fmt='d')
plt.show()
```

### ROC曲线
```python
from sklearn.metrics import roc_curve, auc
import matplotlib.pyplot as plt

# 计算ROC曲线
fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
roc_auc = auc(fpr, tpr)

# 绘制ROC曲线
plt.plot(fpr, tpr, label=f'ROC curve (area = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], 'k--')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()
```

## 深度学习

### TensorFlow基础
```python
import tensorflow as tf
from tensorflow.keras import layers

# 创建模型
model = tf.keras.Sequential([
    layers.Dense(64, activation='relu'),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

# 编译模型
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# 训练模型
model.fit(X_train, y_train, epochs=10, batch_size=32)
```

### PyTorch基础
```python
import torch
import torch.nn as nn
import torch.optim as optim

# 定义模型
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(10, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = torch.sigmoid(self.fc3(x))
        return x

# 创建模型
model = Net()
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters())

# 训练模型
for epoch in range(10):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
```

## 模型部署

### 模型保存和加载
```python
import joblib
from tensorflow.keras.models import save_model, load_model

# 保存Scikit-learn模型
joblib.dump(model, 'model.joblib')
loaded_model = joblib.load('model.joblib')

# 保存TensorFlow模型
save_model(model, 'model.h5')
loaded_model = load_model('model.h5')
```

### Flask API部署
```python
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load('model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = model.predict([data['features']])
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
```

## 实践案例

### 图像分类
```python
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import numpy as np

# 加载预训练模型
model = ResNet50(weights='imagenet')

# 加载和预处理图像
img = image.load_img('image.jpg', target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

# 预测
preds = model.predict(x)
print('预测结果:', decode_predictions(preds, top=3)[0])
```

### 文本分类
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# 创建文本分类管道
text_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB()),
])

# 训练模型
text_clf.fit(X_train_text, y_train)

# 预测
predicted = text_clf.predict(X_test_text)
```

### 时间序列预测
```python
from statsmodels.tsa.arima.model import ARIMA
import pandas as pd

# 创建ARIMA模型
model = ARIMA(series, order=(5,1,0))

# 训练模型
model_fit = model.fit()

# 预测
forecast = model_fit.forecast(steps=10)
``` 