package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"myproject/database"
	"myproject/models"
)

func Dubai5_15(c *fiber.Ctx) error {
	var data models.Dubai5_15

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	collection := database.DB.Collection("dubai5_15")
	_, err := collection.InsertOne(context.TODO(), bson.M{
		"number": data.Number,
		"date":   data.Date,
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

type Dubai5_15Response struct {
	Number int    `json:"number"`
	Date   string `json:"date"`
}

func GetDubai5_15s(c *fiber.Ctx) error {
	collection := database.DB.Collection("dubai5_15s")

	findOptions := options.Find()
	var results []Dubai5_15Response

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not get data",
		})
	}

	for cur.Next(context.TODO()) {
		var elem models.Dubai5_15
		err := cur.Decode(&elem)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "could not decode data",
			})
		}

		// Format the date and append to results
		results = append(results, Dubai5_15Response{
			Number: elem.Number,
			Date:   elem.Date.Format("2006-01-02"),
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
