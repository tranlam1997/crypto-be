# Use the official Bun image as the base
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["bun", "run", "start"]