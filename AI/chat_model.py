from joblib import load
from fuzzywuzzy import fuzz
import re
import random

class ChatBot:
    def __init__(self):
        self.model_data = load('models/model_data.joblib')
        self.vectorizer = load('models/vectorizer.joblib')
        
    def preprocess(self, text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        return text

    def get_response(self, user_input):
        processed_input = self.preprocess(user_input)
        
        # Нечеткий поиск
        best_fuzzy = {'score': 0, 'tag': None}
        for tag, patterns in self.model_data['tags_data']['patterns'].items():
            for pattern in patterns:
                score = fuzz.ratio(processed_input, self.preprocess(pattern))
                if score > best_fuzzy['score']:
                    best_fuzzy = {'score': score, 'tag': tag}
        
        if best_fuzzy['score'] > 85:
            return random.choice(self.model_data['tags_data']['responses'][best_fuzzy['tag']])
        
        # Поиск по TF-IDF
        input_vec = self.vectorizer.transform([processed_input])
        similarities = (input_vec * self.vectorizer.transform(self.model_data['all_patterns']).T).toarray()
        best_match_idx = similarities.argmax()
        
        if similarities[0, best_match_idx] > 0.2:
            for tag, patterns in self.model_data['tags_data']['patterns'].items():
                if self.model_data['all_patterns'][best_match_idx] in patterns:
                    return random.choice(self.model_data['tags_data']['responses'][tag])
        
        return "Извините, не понял вопрос. Можете переформулировать?"

if __name__ == "__main__":
    bot = ChatBot()
    print("Бот запущен. Для выхода введите 'выход'")
    while True:
        user_input = input("Вы: ")
        if user_input.lower() == 'выход':
            break
        print("Бот:", bot.get_response(user_input))