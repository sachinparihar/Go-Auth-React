package database

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	config "myproject/Config"
)

var DB *mongo.Database

func Connect() {
	// Get the host, port, username, and password from the environment variables
	host := config.Config("DB_HOST")
	port := config.Config("DB_PORT")
	username := config.Config("DB_USERNAME")
	password := config.Config("DB_PASSWORD")

	// Create the connection string
	connectionString := fmt.Sprintf("mongodb://%s:%s@%s:%s/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@go-auth@", username, password, host, port)

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// Connect to MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		fmt.Println("Failed to create client:", err)
		return
	}

	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil {
		fmt.Println("Failed to ping database:", err)
		return
	}

	fmt.Println("Connected to MongoDB!")

	// Get the database
	DB = client.Database(config.Config("DB_NAME"))
}
