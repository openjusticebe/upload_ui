# Stage 0, build using node
FROM node:buster-slim AS build

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc build-essential

RUN npm install -g gatsby-cli

RUN mkdir /workdir
WORKDIR /workdir

ARG GATSBY_UPLOAD_API="http://localhost:5000"
ARG GATSBY_DATA_API="http://localhost:5000"
ARG GATSBY_SITE_ID="0"
ARG GATSBY_SITE_URL="http://localhost"
ENV GATSBY_UPLOAD_API=${GATSBY_UPLOAD_API} \
    GATSBY_DATA_API=${GATSBY_DATA_API} \
    GATSBY_SITE_ID=${GATSBY_SITE_ID} \
    GATSBY_SITE_URL=${GATSBY_SITE_URL}

COPY package.json yarn.lock ./
RUN yarn

COPY ./src ./src
COPY .env* ./
COPY gatsby* ./
RUN yarn build


# Stage 1, Serve compiled pages with nginx
FROM nginx:alpine as serve

COPY --from=build /workdir/public /usr/share/nginx/html
COPY ./misc/default.conf /etc/nginx/nginx.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
STOPSIGNAL SIGTERM
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
