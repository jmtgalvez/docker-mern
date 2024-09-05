FROM node:20.17-alpine AS base
WORKDIR /app
COPY . ./
RUN npm ci
EXPOSE 5000
CMD ["npm", "start"]