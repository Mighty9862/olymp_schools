from natasha import Doc, Segmenter, MorphVocab, NewsEmbedding, NewsMorphTagger
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from joblib import dump
import re

# Инициализация компонентов Natasha
segmenter = Segmenter()
emb = NewsEmbedding()
morph_tagger = NewsMorphTagger(emb)
morph_vocab = MorphVocab()

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    
    doc = Doc(text)
    doc.segment(segmenter)  # Токенизация
    doc.tag_morph(morph_tagger)  # Морфологический разбор
    
    # Извлечение лемм
    lemmas = []
    for token in doc.tokens:
        token.lemmatize(morph_vocab)
        lemmas.append(token.lemma)
    
    return ' '.join(lemmas)

# Загрузка данных
patterns = pd.read_csv('data/patterns.csv')
responses = pd.read_csv('data/responses.csv')

# Преобразование в словари
tags_data = {
    'patterns': patterns.groupby('tag')['pattern'].apply(list).to_dict(),
    'responses': responses.groupby('tag')['response'].apply(list).to_dict()
}

# Предобработка и векторизация
all_patterns = [preprocess(p) for sublist in tags_data['patterns'].values() for p in sublist]
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(all_patterns)

# Сохранение модели
dump({
    'vectorizer': vectorizer,
    'tags_data': tags_data,
    'all_patterns': all_patterns
}, 'models/model_data.joblib')

dump(vectorizer, 'models/vectorizer.joblib')