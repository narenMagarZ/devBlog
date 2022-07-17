ARG nodeversion=lts-alpine
FROM node:${nodeversion}
ENV dir=/app/
WORKDIR ${dir}
ADD package*.json ${dir}
RUN npm install
ADD . ${dir}
CMD ["npm","run","prod"]