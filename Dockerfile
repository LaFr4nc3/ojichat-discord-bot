FROM node:alpine as node
FROM golang:latest

RUN mkdir /opt
COPY --from=node /opt/yarn /opt/yarn
COPY --from=node /usr/local/bin/node /usr/local/bin/
RUN ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
 && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarnpkg

ADD . /ojichat-discord-bot

WORKDIR /ojichat-discord-bot
RUN yarn install
RUN go get -u github.com/greymd/ojichat

CMD ["yarn", "run", "dev"]
