FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

# RUN npm install
# If you are building your code for production

RUN yarn install

# Bundle app source
COPY . .


EXPOSE 8000

RUN yarn build

CMD [ "yarn","start:prod"]