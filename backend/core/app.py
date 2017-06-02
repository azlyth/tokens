#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Api

from .db import configure_database
from .api.questions import QuestionList


class Application:

    def __init__(self):
        self.app = Flask(__name__)
        self.api = Api(self.app)

        self.import_configuration()
        self.add_routes()
        self.configure_database()

    def import_configuration(self):
        self.app.config.from_object('core.settings')

    def add_routes(self):
        self.api.add_resource(QuestionList, '/')

    def configure_database(self):
        self.db = configure_database(self.app)

    def run(self):
        self.app.run(host='0.0.0.0')
