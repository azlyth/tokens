from functools import partial

from ..db import db


def ForeignKey(parent_field):
    return db.Column(
        db.Integer,
        db.ForeignKey(parent_field, ondelete='CASCADE'),
        nullable=False
    )


class Model(db.Model):

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=db.func.now())
    updated_on = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
