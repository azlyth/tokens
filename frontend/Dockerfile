FROM node:8.0.0-alpine

WORKDIR /srv/

# Install requirements
ADD package.json .
ADD node_modules .
RUN yarn

# Add the source
ADD . /srv/

CMD yarn start
