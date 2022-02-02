import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

env_config = os.getenv("APP_SETTINGS", "app.config.DevelopmentConfig")
app.config.from_object(env_config)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.models import Actor


@app.route('/')
def index():
    return "<h1>Hello world</h1>"


@app.route('/<name>')
def hello_name(name):
    return f'Hello {name}!'
