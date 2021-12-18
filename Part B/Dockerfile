FROM node:16@sha256:89b59ce49929d8a8e230946bdb1b58c14cdbbb86c9a7397610afcecfce1be035
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node . .
COPY . .
RUN npm ci --only-production
ENV DEBUG=part-b:*
CMD node start