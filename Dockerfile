FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install
# If you are building your code for production
RUN npm ci

# Bundle app source
COPY ./dist ./dist

ENV PORT=$PORT 
ENV LIST_ID=$LIST_ID 
ENV CONTACTS_API_BASE_PATH=$CONTACTS_API_BASE_PATH 
ENV MAIL_MARKETING_API_KEY=$MAIL_MARKETING_API_KEY 
ENV MAIL_MARKETING_SERVER=$MAIL_MARKETING_SERVER 

CMD ["npm", "start"] 