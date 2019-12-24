#
# KOA REST API BOILERPLATE
#
# build:
#   docker build --force-rm -t posquit0/koa-rest-api-boilerplate .
# run:
#   docker run --rm --it --env-file=path/to/.env --name koa-rest-api-boilerplate -p 80:7071 posquit0/koa-rest-api-boilerplate
#
#

### BASE
FROM node:10.17.0-alpine AS base
LABEL maintainer "Zoko"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json package-lock.json ./


### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN npm install --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN npm install

#
# ### TEST
# FROM dependencies AS test
# # Copy app sources
# COPY . .
# # Run linters and tests
# # RUN yarn lint && yarn test
# # RUN yarn test

### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Expose application port
EXPOSE 8081

# In production environment
ENV NODE_ENV production
ENV APP_PORT 8081

# Run
CMD ["npm", "start"]
