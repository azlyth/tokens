from .base import ForeignKey, Model
from ..db import db


class Question(Model):

    text = db.Column(db.Unicode)
    yes = db.Column(db.Integer, default=0)
    no = db.Column(db.Integer, default=0)


class Category(Model):

    name = db.Column(db.Unicode)


class QuestionWeight(Model):

    question = ForeignKey('question.id')
    category = ForeignKey('category.id')
    yes_weight = db.Column(db.Integer, default=0)
    no_weight = db.Column(db.Integer, default=0)
