FROM ubuntu:18.04

# general
RUN apt-get update
RUN apt-get install -y nano net-tools curl wget gnupg2

# node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    apt-get install -y nodejs
RUN npm install -g yarn

# mongodb
RUN apt-get install -y mongodb

CMD service mongodb start && \
    cd /workspace && \
    yarn install && \
    yarn build && \
    CI=true yarn test