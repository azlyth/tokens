#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_sqlalchemy import SQLAlchemy

db = None


def configure_database(app):
    global db
    db = SQLAlchemy(app)
    return db
