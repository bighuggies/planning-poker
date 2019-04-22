FROM node:10.13-alpine

# Environment

WORKDIR /home/app
ENV NODE_ENV=production

# Dependencies

COPY package.json /home/app/
COPY yarn.lock /home/app/
COPY lerna.json /home/app/

COPY packages/server/package.json /home/app/packages/server/
COPY packages/server/yarn.lock /home/app/packages/server/

# Build

RUN cd packages/server && yarn install && yarn build

COPY ./lib /home/app/

# Serve
CMD [ "node", "./lib/index.js" ]