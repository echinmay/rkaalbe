# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
# This ensures Docker caches dependencies unless package files change
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start the application using the compiled JavaScript file
CMD ["node", "dist/index.js"]