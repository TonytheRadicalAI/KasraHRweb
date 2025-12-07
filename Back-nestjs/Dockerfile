# Stage 1: Build
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files first (so Docker can cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# Copy only built files and package.json
COPY --from=0 /app/dist ./dist
COPY --from=0 /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose NestJS port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
