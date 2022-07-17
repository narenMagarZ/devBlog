FROM node:alpine
WORKDIR /app
ENV PORT=7575
ADD package*.json /app/
RUN npm install
ADD . /app/
CMD ["npm","run","dev"]