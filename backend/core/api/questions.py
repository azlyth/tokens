#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask_restful import Resource
from flask_login import login_required


class QuestionListResource(Resource):

    def get(self):
        return {'data': 'success'}


class QuestionResource(Resource):

    def get(self):
        return {'data': 'success'}


class ChoiceResource(Resource):
    pass


class AnswerResource(Resource):
    pass
