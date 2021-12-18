# syntax=docker/dockerfile:1
FROM node:16 as base
WORKDIR /usr/src/app
COPY . .

FROM base as test
RUN npm ci
ENV CI=true
RUN npm run test

FROM test as prod
COPY --from=base . .
RUN npm ci
ENV REACT_APP_BACKEND_URL=http://localhost:3001
CMD npm start

# docker build -t todo-frontend --target test .
# docker run -p 3001:3000 todo-frontend