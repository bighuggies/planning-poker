FROM node:10.13-alpine as builder

# Environment

WORKDIR /home/app
ENV NODE_ENV=production

# Dependencies

COPY package.json /home/app/
COPY yarn.lock /home/app/
COPY lerna.json /home/app/

COPY packages/client/package.json /home/app/packages/client/
COPY packages/client/yarn.lock /home/app/packages/client/

RUN yarn install --frozen-lockfile --production --no-optional
RUN npx lerna bootstrap --ignore-scripts -- --production --no-optional

# Build

COPY . /home/app/
RUN cd packages/client && npm run build

# Serve

FROM nginx:1.15-alpine
COPY --from=builder /home/app/packages/client/build /usr/share/nginx/html