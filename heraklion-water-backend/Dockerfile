FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Enviroment variables
ENV HOST_PORT=80
ENV DATABASE_IP=
ENV DATABASE_PORT=
ENV DATABASE_NAME=

EXPOSE ${HOST_PORT}

CMD [ "npm", "run", "prod" ]