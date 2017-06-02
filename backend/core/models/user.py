from .base import Model
from ..db import db


class User(Model):

    email = db.Column(db.String(255))
