FROM node:12 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
RUN node-prune

FROM node:12-alpine

LABEL org.label-schema.name="sapper-kube" \
    org.label-schema.vendor="ablab.io"

ENV NODE_ENV production

RUN adduser -D ablab

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder  /app/static/ ./static/
COPY --from=builder /app/package* ./
COPY --from=builder /app/__sapper__ ./__sapper__/

USER ablab

EXPOSE 3000

ENTRYPOINT ["npm"]

CMD ["run", "start"]