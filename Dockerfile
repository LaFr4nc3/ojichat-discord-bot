FROM golang:latest as golang

RUN go get -u github.com/greymd/ojichat

FROM node:alpine

COPY --from=golang /go/bin/ojichat /usr/local/bin/ojichat
ADD . /ojichat-discord-bot
WORKDIR /ojichat-discord-bot
RUN yarn install
RUN mkdir /lib64 \
 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

CMD ["yarn", "run", "dev"]
