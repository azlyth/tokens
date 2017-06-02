#!/usr/bin/env python
# -*- coding: utf-8 -*-
import click

from core.app import Application


@click.group()
def cli():
    pass


@cli.command()
@click.pass_context
def init_db(context):
    import core.models
    context.obj.db.create_all()


@cli.command()
@click.pass_context
def run(context):
    context.obj.run()


if __name__ == '__main__':
    cli(obj=Application())
