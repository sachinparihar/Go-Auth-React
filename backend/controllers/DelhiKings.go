package controllers

import (
	"context"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"myproject/database"
	"myproject/models"
)

func DelhiKing(c *fiber.Ctx) error {
	var data models.DelhiKing

	if err := c.BodyParser(&data); err != nil {
		fmt.Printf("Error parsing body: %v\n", err) // Log the error
		return err
	}

	fmt.Printf("Received data: %+v\n", data) // Log the received data

	collection := database.DB.Collection("delhikings")

	insertResult, err := collection.InsertOne(context.TODO(), bson.M{
		"number": data.Number,
		"date":   data.Date,
	})

	if err != nil {
		fmt.Printf("Error inserting data: %v\n", err) // Log the error
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not insert data",
		})
	}

	fmt.Printf("Inserted a single document: %v\n", insertResult.InsertedID) // Log the insert result

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

type DelhiKingResponse struct {
	Number int    `json:"number"`
	Date   string `json:"date"`
}

func GetDelhiKings(c *fiber.Ctx) error {
	collection := database.DB.Collection("delhikings") // This is correct

	findOptions := options.Find()
	var results []DelhiKingResponse

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not get data",
		})
	}

	for cur.Next(context.TODO()) {
		var elem models.DelhiKing
		err := cur.Decode(&elem)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "could not decode data",
			})
		}

		// Format the date and append to results
		results = append(results, DelhiKingResponse{
			Number: elem.Number,
			Date:   elem.Date.Format("02-01-2006"), // Format the date to "DD-MM-YYYY"
		})
	}

	if err := cur.Err(); err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not get data",
		})
	}

	cur.Close(context.TODO())

	return c.JSON(results)
}
