#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Api

from .db import configure_database


class Application:

    def __init__(self):
        self.flask_app = Flask(__name__)
        self.api = Api(self.flask_app)

        self.import_configuration()
        self.configure_database()
        self.setup_api()

    def import_configuration(self):
        self.flask_app.config.from_object('core.settings')

    def configure_database(self):
        self.db = configure_database(self.flask_app)

    def setup_api(self):
        from .api import setup_api
        setup_api(self)

    def bootstrap(self):
        from .models import User, Question
        if not Question.find_all():
            self.db.session.add(User('peter', 'asdf'))
            self.db.session.add(Question(text='Really?'))
            self.db.session.add(Question(text='Is this what you want?'))
            self.db.session.add(Question(text='Are you sure?'))
            self.db.session.commit()

    def run(self):
        if self.flask_app.config['DEBUG']:
            self.bootstrap()

        self.flask_app.run(host='0.0.0.0')
