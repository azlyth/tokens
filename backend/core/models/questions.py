#!/usr/bin/env python
# -*- coding: utf-8 -*-
from random import randint

from .base import ForeignKey, Model
from .. import settings
from ..db import db


class Question(Model):

    text = db.Column(db.Unicode)

    weights = db.relationship('QuestionWeight', backref='question')

    def save(self):
        super(Question, self).save()

        # Create any missing weights
        for category in Category.find_all():
            QuestionWeight.find_or_create(
                category_id=category.id,
                question_id=self.id
            )


class Category(Model):

    name = db.Column(db.Unicode)
    score = db.Column(db.Integer, default=0)

    weights = db.relationship('QuestionWeight', backref='category')

    def save(self):
        super(Category, self).save()

        # Create any missing weights
        for question in Question.find_all():
            QuestionWeight.find_or_create(
                category_id=self.id,
                question_id=question.id
            )


class QuestionWeight(Model):

    question_id = ForeignKey('question.id')
    category_id = ForeignKey('category.id')
    yes = db.Column(db.Integer, default=randint(-5, 5) if settings.DEBUG else 0)
    no = db.Column(db.Integer, default=randint(-5, 5) if settings.DEBUG else 0)

    def __init__(self, *args, **kw):
        super(QuestionWeight, self).__init__(*args, **kw)

        # Set random weights if not provided and we're in DEBUG mode
        if settings.DEBUG:
            if 'yes' not in kw:
                self.yes = randint(-5, 5)
            if 'no' not in kw:
                self.no = randint(-5, 5)
