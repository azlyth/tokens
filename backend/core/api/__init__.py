#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .auth import *
from .base import *
from .questions import *


ROUTES = (
    (AuthResource, '/api/auth'),
    (QuestionListResource, '/api/questions'),
    (QuestionResource, '/api/questions/<int:id>'),
)
