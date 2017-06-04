FROM node:8.0.0-alpine

# DEV: Install requirements
#WORKDIR /srv/
#ADD package.json .
#ADD node_modules .
#RUN yarn

# Add the source
ADD . /srv/

# PROD: Install requirements
WORKDIR /srv/

# FIXME: node_modules gets removed after this step runs in the build,
# because the directory belongs to the worker
# https://stackoverflow.com/questions/30043872/docker-compose-node-modules-not-present-in-a-volume-after-npm-install-succeeds
RUN yarn install --non-interactive

CMD yarn install && yarn start
