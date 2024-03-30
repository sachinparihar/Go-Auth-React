package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"myproject/database"
	"myproject/models"
)

func DubaiKing(c *fiber.Ctx) error {
	var data models.DubaiKing

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	collection := database.DB.Collection("dubaikings")

	_, err := collection.InsertOne(context.TODO(), bson.M{
		"number": data.Number,
		"date":   data.Date, // Use the date directly
	})

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not insert data",
		})
	}
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

type DubaiKingResponse struct {
	Number int    `json:"number"`
	Date   string `json:"date"`
}

func GetDubaiKings(c *fiber.Ctx) error {
	collection := database.DB.Collection("dubaikings") // This is correct

	findOptions := options.Find()
	var results []DubaiKingResponse

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not get data",
		})
	}

	for cur.Next(context.TODO()) {
		var elem models.DubaiKing
		err := cur.Decode(&elem)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "could not decode data",
			})
		}

		// Format the date and append to results
		results = append(results, DubaiKingResponse{
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
