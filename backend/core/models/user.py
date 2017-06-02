#!/usr/bin/env python
# -*- coding: utf-8 -*-
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import jwt

from .base import Model
from ..db import db
from .. import settings


class User(Model, UserMixin):

    email = db.Column(db.String(255))
    password = db.Column(db.String(128), nullable=False)

    @classmethod
    def from_token(cls, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY)
            return cls.find_one(id=payload['user_id'])
        except:
            return None

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def create_token(self):
        data = {'user_id': self.id}
        return jwt.encode(data, settings.SECRET_KEY).decode('utf-8')
