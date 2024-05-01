package controllers

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"myproject/database"
	"myproject/models"
)

func CurrentVijayLaxmi(c *fiber.Ctx) error {
	var data models.CurrenVijayLaxmi

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	collection := database.DB.Collection("vijaylaxmi12_40")
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

type VijayLaxmi12_40Response struct {
	Number int    `json:"number"`
	Date   string `json:"date"`
}

func GetCurrentVijayLaxmi(c *fiber.Ctx) error {
	collection := database.DB.Collection("vijaylaxmi12_40s")

	findOptions := options.Find()
	var results []VijayLaxmi12_40Response

	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not get data",
		})
	}

	for cur.Next(context.TODO()) {
		var elem models.CurrenVijayLaxmi
		err := cur.Decode(&elem)
		if err != nil {
			c.Status(fiber.StatusInternalServerError)
			return c.JSON(fiber.Map{
				"message": "could not decode data",
			})
		}

		// Format the date and append to results
		results = append(results, VijayLaxmi12_40Response{
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
