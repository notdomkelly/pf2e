from app.main import db
from sqlalchemy.types.postgresql import ARRAY

class Actor(db.Model):
    __tablename__ = 'actor'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    family = db.Column(db.String())
    rarity = db.Column(db.String())
    size = db.Column(db.String())
    type = db.Column(db.String())
    traits = db.Column(ARRAY(db.String()))
    level = db.Column(db.Integer)
    aon_id = db.Column(db.Integer)

    def __init__(self, name, family, rarity, size, type, traits, level, aon_id):
        self.name = name
        self.family = family
        self.rarity = rarity
        self.size = size
        self.type = type
        self.traits = traits
        self.level = level
        self.aon_id = aon_id

    def __repr__(self):
        return f'<{self.name}>'
