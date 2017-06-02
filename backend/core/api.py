#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import request
from flask_login import LoginManager, current_user, login_user, logout_user
from flask_restful import Resource
from flask_restless import APIManager, ProcessingException

from .models import Question, User


def authenticate(*args, **kwargs):
    if not current_user.is_authenticated:
        raise ProcessingException(description='Not authenticated', code=401)


def setup_api(app):
    # Initialize the login manager
    login_manager = LoginManager()
    login_manager.init_app(app.flask_app)

    # Setup the user and request loading
    @login_manager.user_loader
    def user_loader(user_id):
        return User.find_one(id=user_id)

    @login_manager.request_loader
    def request_loader(request):
        session_token = request.headers.get('X-Session-Token')
        return User.from_token(session_token)

    # Add the auth endpoint
    app.api.add_resource(AuthResource, '/api/auth')

    # Add the object endpoints
    manager = APIManager(app.flask_app, flask_sqlalchemy_db=app.db)
    manager.create_api(
        Question,
        preprocessors={
            'GET_SINGLE': [authenticate],
            'POST': [authenticate],
            'PUT': [authenticate],
            'DELETE': [authenticate]
        },
        methods=['GET', 'POST', 'PUT', 'DELETE']
    )


class AuthResource(Resource):

    def post(self):
        data = request.get_json()

        # Check if a valid user
        user = User.find_one(email=data['email'])
        if not user:
            return {'error': 'invalid user/password combination'}

        # Check if valid password
        if not user.check_password(data['password']):
            return {'error': 'invalid user/password combination'}

        login_user(user)

        return {
            'data': {
                'token': user.create_token()
            }
        }

    def delete(self):
        logout_user()
        return {
            'data': {}
        }