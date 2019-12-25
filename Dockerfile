FROM node:12-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /home/src/miniproject
WORKDIR /home/src/miniproject

COPY package*.json /home/src/miniproject/

RUN npm install

COPY . /home/src/miniproject/

CMD ["npm", "start"]
