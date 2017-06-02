#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Api

from .db import configure_database


class Application:

    def __init__(self):
        self.app = Flask(__name__)
        self.api = Api(self.app)

        self.import_configuration()
        self.configure_database()
        self.setup_api()

    def import_configuration(self):
        self.app.config.from_object('core.settings')

    def setup_api(self):
        # Load the module here to avoid circular dependencies
        from .api import ROUTES, login_manager

        # Setup the login manager
        self.login_manager = login_manager
        self.login_manager.init_app(self.app)

        # Add the routes
        for resource, route in ROUTES:
            self.api.add_resource(resource, route)

    def configure_database(self):
        self.db = configure_database(self.app)

    def run(self):
        self.app.run(host='0.0.0.0')
