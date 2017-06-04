FROM node:8.0.0-alpine

WORKDIR /srv/

# DEV: Install requirements
#ADD package.json .
#ADD node_modules .
#RUN yarn

# Add the source
ADD . /srv/

# PROD: Install requirements
RUN yarn

CMD yarn start
