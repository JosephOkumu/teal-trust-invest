#!/bin/bash

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