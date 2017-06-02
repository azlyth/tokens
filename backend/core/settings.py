#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

# Flask
DEBUG = os.getenv('DEBUG', False)

# Super secret key
SECRET_KEY = os.getenv('SECRET_KEY', 'DEFAULT-SECRET-KEY')

# SQLAlchemy
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/test.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
