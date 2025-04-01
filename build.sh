#!/bin/bash

# update node version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# install dependencies
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Build backend
echo "Building backend..."
cd backend
go build -o ../teal-trust-invest main.go
cd ..

# Create a startup script
echo "Creating startup script..."
cat > start.sh << 'EOL'
#!/bin/bash
# Start the Go backend
./teal-trust-invest &
# Start the frontend in development mode
npm run dev
EOL
chmod +x start.sh

echo "Build complete! Run the application with ./start.sh"