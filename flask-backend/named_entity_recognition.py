import re
import spacy
from lang_support import lang_map

class NamedEntityRecognition:

    def __init__(self, language='english'):
        self.language = language.lower()
        try:
            self.ner_model = spacy.load(lang_map[language])
        except KeyError:
            self.ner_model = None

    def get_supported_languages(self) -> list:
        return lang_map.keys()

    def get_entities(self, text: str) -> dict:
        
        result = {}
        if not self.ner_model:
            return {'msg': f'Language not Supported. Please choose language from {self.get_supported_languages()}'}
        
        try:
            text_obj = self.ner_model(text)
            if text_obj.ents:
                for entity in text_obj.ents:
                    result[str(entity)] = entity.label_
            else:
                result['msg'] = 'No entities found'
        except Exception as e:
            result['msg'] = str(e)

        return result
