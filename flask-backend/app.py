from flask import Flask
from flask_cors import CORS
from named_entity_recognition import NamedEntityRecognition
from flask import request

app = Flask(__name__)
ors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/", methods=['GET'])
def named_entity_api():
    try:
        language = request.args.get('language').lower()
    except AttributeError:
        language = 'english'
    ner = NamedEntityRecognition(language=language)
    text = request.args.get('document')
    return ner.get_entities(text)


if __name__ == '__main__':
    app.run(debug=True)
