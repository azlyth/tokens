#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

from flask import request
from flask_restful import Resource
from flask_login import LoginManager

from ..models import User


login_manager = LoginManager()


@login_manager.user_loader
def user_loader(user_id):
    return User.find_one(id=user_id)


@login_manager.request_loader
def request_loader(request):
    session_token = request.headers.get('X-Session-Token')
    return User.from_token(session_token)


class BaseResource(Resource):

    def json_data(self):
        return request.get_json()
