# Python自然语言处理

## 自然语言处理概述

### 主要任务
```python
# 文本分类
# 情感分析
# 命名实体识别
# 机器翻译
# 文本摘要
# 问答系统
```

### 常用库
```python
# NLTK: 自然语言工具包
# spaCy: 工业级NLP库
# Gensim: 主题建模
# Transformers: 预训练模型
# TextBlob: 简单NLP任务
```

## 文本预处理

### 文本清洗
```python
import re
import nltk
from nltk.corpus import stopwords

def clean_text(text):
    # 转换为小写
    text = text.lower()
    
    # 移除特殊字符
    text = re.sub(r'[^\w\s]', '', text)
    
    # 移除数字
    text = re.sub(r'\d+', '', text)
    
    # 移除多余空格
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text

# 下载停用词
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def remove_stopwords(text):
    words = text.split()
    filtered_words = [word for word in words if word not in stop_words]
    return ' '.join(filtered_words)
```

### 分词和词性标注
```python
import spacy

# 加载spaCy模型
nlp = spacy.load('en_core_web_sm')

def tokenize_and_tag(text):
    doc = nlp(text)
    
    # 获取分词和词性
    tokens = [(token.text, token.pos_) for token in doc]
    
    return tokens

# 示例
text = "Natural Language Processing is amazing!"
tokens = tokenize_and_tag(text)
print(tokens)
```

### 词干提取和词形还原
```python
from nltk.stem import PorterStemmer, WordNetLemmatizer
nltk.download('wordnet')

def stem_text(text):
    stemmer = PorterStemmer()
    words = text.split()
    stemmed_words = [stemmer.stem(word) for word in words]
    return ' '.join(stemmed_words)

def lemmatize_text(text):
    lemmatizer = WordNetLemmatizer()
    words = text.split()
    lemmatized_words = [lemmatizer.lemmatize(word) for word in words]
    return ' '.join(lemmatized_words)
```

## 特征提取

### 词袋模型
```python
from sklearn.feature_extraction.text import CountVectorizer

# 创建词袋模型
vectorizer = CountVectorizer()

# 示例文本
corpus = [
    'This is the first document.',
    'This document is the second document.',
    'And this is the third one.'
]

# 转换文本为特征向量
X = vectorizer.fit_transform(corpus)
print(vectorizer.get_feature_names_out())
print(X.toarray())
```

### TF-IDF
```python
from sklearn.feature_extraction.text import TfidfVectorizer

# 创建TF-IDF向量化器
tfidf_vectorizer = TfidfVectorizer()

# 转换文本为TF-IDF特征
X_tfidf = tfidf_vectorizer.fit_transform(corpus)
print(tfidf_vectorizer.get_feature_names_out())
print(X_tfidf.toarray())
```

### 词嵌入
```python
import gensim
from gensim.models import Word2Vec

# 准备训练数据
sentences = [
    ['this', 'is', 'the', 'first', 'sentence'],
    ['this', 'is', 'the', 'second', 'sentence'],
    ['yet', 'another', 'sentence']
]

# 训练Word2Vec模型
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, workers=4)

# 获取词向量
vector = model.wv['sentence']
```

## 文本分类

### 朴素贝叶斯分类器
```python
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# 创建分类管道
text_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# 训练模型
text_clf.fit(X_train, y_train)

# 预测
predicted = text_clf.predict(X_test)

# 评估
print(classification_report(y_test, predicted))
```

### 支持向量机
```python
from sklearn.svm import SVC

# 创建SVM分类器
svm_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', SVC(kernel='linear'))
])

# 训练模型
svm_clf.fit(X_train, y_train)

# 预测
predicted = svm_clf.predict(X_test)
```

## 情感分析

### 基于规则的情感分析
```python
from textblob import TextBlob

def analyze_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return 'positive'
    elif analysis.sentiment.polarity == 0:
        return 'neutral'
    else:
        return 'negative'

# 示例
text = "I love this product!"
sentiment = analyze_sentiment(text)
print(sentiment)
```

### 基于机器学习的情感分析
```python
from sklearn.linear_model import LogisticRegression

# 创建情感分析模型
sentiment_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

# 训练模型
sentiment_clf.fit(X_train, y_train)

# 预测情感
sentiment = sentiment_clf.predict(["This movie is great!"])
```

## 命名实体识别

### 使用spaCy进行NER
```python
def extract_entities(text):
    doc = nlp(text)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities

# 示例
text = "Apple is looking at buying U.K. startup for $1 billion"
entities = extract_entities(text)
print(entities)
```

### 自定义实体识别
```python
import spacy
from spacy.tokens import Span

def add_custom_entity(nlp, text, entity_label, start, end):
    doc = nlp(text)
    span = Span(doc, start, end, label=entity_label)
    doc.ents = list(doc.ents) + [span]
    return doc

# 示例
text = "I love Python programming"
doc = add_custom_entity(nlp, text, "PROGRAMMING_LANGUAGE", 2, 3)
print([(ent.text, ent.label_) for ent in doc.ents])
```

## 文本摘要

### 抽取式摘要
```python
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

def extractive_summary(text, sentences_count=3):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, sentences_count)
    return ' '.join([str(sentence) for sentence in summary])
```

### 生成式摘要
```python
from transformers import pipeline

# 加载摘要模型
summarizer = pipeline("summarization")

def abstractive_summary(text, max_length=130, min_length=30):
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)
    return summary[0]['summary_text']
```

## 机器翻译

### 使用Transformers进行翻译
```python
from transformers import pipeline

# 加载翻译模型
translator = pipeline("translation_en_to_fr")

def translate_text(text):
    translation = translator(text)
    return translation[0]['translation_text']

# 示例
text = "Hello, how are you?"
translated = translate_text(text)
print(translated)
```

### 自定义翻译模型
```python
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

def load_translation_model(model_name):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    return tokenizer, model

def translate_with_model(text, tokenizer, model):
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
```

## 问答系统

### 基于规则的问答
```python
import re

qa_pairs = {
    r'what is your name': 'My name is ChatBot',
    r'how are you': 'I am fine, thank you!',
    r'bye': 'Goodbye!'
}

def answer_question(question):
    question = question.lower()
    for pattern, answer in qa_pairs.items():
        if re.search(pattern, question):
            return answer
    return "I don't understand the question."
```

### 基于BERT的问答
```python
from transformers import pipeline

# 加载问答模型
qa_model = pipeline("question-answering")

def answer_with_bert(question, context):
    result = qa_model(question=question, context=context)
    return result['answer']
```

## 实践案例

### 新闻分类
```python
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# 加载数据
newsgroups_train = fetch_20newsgroups(subset='train')
newsgroups_test = fetch_20newsgroups(subset='test')

# 创建分类管道
text_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# 训练模型
text_clf.fit(newsgroups_train.data, newsgroups_train.target)

# 评估
predicted = text_clf.predict(newsgroups_test.data)
print(classification_report(newsgroups_test.target, predicted))
```

### 情感分析应用
```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

# 加载数据
data = pd.read_csv('sentiment_data.csv')
X_train, X_test, y_train, y_test = train_test_split(data['text'], data['sentiment'])

# 创建情感分析模型
sentiment_clf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', LogisticRegression())
])

# 训练模型
sentiment_clf.fit(X_train, y_train)

# 预测新文本
new_text = "This product is amazing!"
prediction = sentiment_clf.predict([new_text])
print(f"Sentiment: {prediction[0]}")
```

### 文本摘要应用
```python
from transformers import pipeline
import streamlit as st

# 创建Streamlit应用
st.title("Text Summarization App")

# 加载摘要模型
summarizer = pipeline("summarization")

# 用户输入
text = st.text_area("Enter your text here:", height=200)
max_length = st.slider("Maximum length of summary:", 50, 200, 130)
min_length = st.slider("Minimum length of summary:", 10, 100, 30)

if st.button("Summarize"):
    if text:
        summary = summarizer(text, max_length=max_length, min_length=min_length)
        st.write("Summary:")
        st.write(summary[0]['summary_text'])
    else:
        st.write("Please enter some text to summarize.")
``` 