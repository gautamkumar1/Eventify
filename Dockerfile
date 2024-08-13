# Start your image with a Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /Eventify

# Copy package.json and package-lock.json first, then install dependencies
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY server/ ./

# Expose the port your application runs on
EXPOSE 9099

# Start the application
CMD ["npm", "start"]
