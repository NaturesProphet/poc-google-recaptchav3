FROM node:18.13.0-alpine

ENV TZ=America/SaoPaulo
RUN mkdir -p /usr/app/src
WORKDIR /usr/app

COPY package.json tsconfig.json tsconfig.build.json /usr/app/
RUN npm install
COPY src/ /usr/app/src
COPY site.js /usr/app
COPY testPage.html /usr/app
RUN npm run build
RUN rm -R node_modules
RUN npm install --prod
RUN rm -R src

CMD ["npm","run","poc"]