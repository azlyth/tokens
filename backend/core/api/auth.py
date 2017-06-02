#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_login import current_user, login_user, logout_user

from .base import BaseResource
from ..models import User


class AuthResource(BaseResource):

    def post(self):
        data = self.json_data()

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
        logout_user(current_user)
