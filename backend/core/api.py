#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import request
from flask_cors import CORS
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_restful import Resource
from flask_restless import APIManager, ProcessingException

from .models import Category, Question, User, QuestionWeight


def authenticate(*args, **kwargs):
    if not current_user.is_authenticated:
        raise ProcessingException(description='Not authenticated', code=401)


def weight_postprocessor(model_class):
    def create_weights(result=None, **kw):
        instance = model_class.find_one(id=result['id'])
        instance.create_missing_weights()
    return create_weights


def setup_api(app):
    # Setup CORS
    CORS(app.flask_app)

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

    # Add the answer endpoint
    app.api.add_resource(AnswerResource, '/api/question/<int:question_id>/answer')

    # Add the object endpoints
    manager = APIManager(app.flask_app, flask_sqlalchemy_db=app.db)
    manager.create_api(
        Question,
        methods=['GET', 'POST', 'PUT', 'DELETE'],
        preprocessors={
            'POST': [authenticate],
            'PUT_SINGLE': [authenticate],
            'PUT_MANY': [authenticate],
            'DELETE_SINGLE': [authenticate],
            'DELETE_MANY': [authenticate],
        },
        postprocessors={'POST': [weight_postprocessor(Question)]}
    )
    manager.create_api(
        Category,
        methods=['GET', 'POST', 'PUT', 'DELETE'],
        preprocessors={
            'POST': [authenticate],
            'PUT_SINGLE': [authenticate],
            'PUT_MANY': [authenticate],
            'DELETE_SINGLE': [authenticate],
            'DELETE_MANY': [authenticate],
        },
        postprocessors={'POST': [weight_postprocessor(Category)]}
    )
    manager.create_api(
        QuestionWeight,
        methods=['PUT'],
        preprocessors={'PUT': [authenticate]},
    )


class AuthResource(Resource):

    @login_required
    def get(self):
        return {'data': {'logged_in': True}}

    def post(self):
        data = request.get_json()

        # Check if a valid user
        user = User.find_one(email=data['email'])
        if not user:
            return {'error': 'Invalid credentials'}, 400

        # Check if valid password
        if not user.check_password(data['password']):
            return {'error': 'Invalid credentials'}, 400

        login_user(user)

        return {
            'data': {
                'token': user.create_token()
            }
        }

    def delete(self):
        logout_user()
        return {'data': 'success'}


class AnswerResource(Resource):

    def post(self, question_id):
        # Get the question
        question = Question.find_one(id=question_id)
        if not question:
            return {'error': 'No such question'}, 404

        # Validate the answer
        answer = request.get_json().get('answer')
        if answer not in ['yes', 'no']:
            return {'error': 'Invalid answer'}, 400

        # Update the category scores appropriately
        for weight in question.weights:
            category = weight.category
            category.score += getattr(weight, answer)
            category.save()

        return {'data': 'success'}
