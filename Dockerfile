FROM node:alpine as builder

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN ls . -ll & cd /usr/src/app & npm install 

FROM node:alpine as app

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN ls /usr/src/app -ll

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["ls -l & chmod +x /usr/src/app/entrypoint.sh & sh /usr/src/app/entrypoint.sh"]