# Use Node.js 14 image.
# can't find one for 16
# https://hub.docker.com/_/node
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package.json ./
COPY yarn.lock ./

# Installing production dependencies only breaks the app
# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm install --only=production
# RUN npm ci --only=production
RUN yarn

# Copy local code to the container image.
COPY . ./

#Expose a Port to access the APIs
EXPOSE 8080

# Run build step
RUN yarn build

# Run the web service on container startup.
CMD [ "node", "./dist/index.js" ]
