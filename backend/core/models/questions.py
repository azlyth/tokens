from .base import ForeignKey, Model
from ..db import db


class Question(Model):

    text = db.Column(db.Unicode)


class Choice(Model):

    text = db.Column(db.Unicode)
    question = ForeignKey('question.id')


class Answer(Model):

    user = ForeignKey('user.id')
    choice = ForeignKey('choice.id')
