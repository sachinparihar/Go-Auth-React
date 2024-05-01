package routes

import (
	"github.com/gofiber/fiber/v2"

	"myproject/controllers"
)

func Setup(app *fiber.App) {

	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	app.Post("/api/posthimachal", controllers.Himachal)
	app.Get("/api/gethimachals", controllers.GetHimachals)

	app.Post("/api/postdelhiking", controllers.DelhiKing)
	app.Get("/api/getdelhikings", controllers.GetDelhiKings)

	app.Post("/api/postvijaylaxmi", controllers.VijayLaxmi) // New route
	app.Get("/api/getvijaylaxmis", controllers.GetVijayLaxmis)
	// New route
	app.Post("/api/postdubaiking", controllers.DubaiKing)    // New route
	app.Get("/api/getdubaikings", controllers.GetDubaiKings) // New route

	app.Post("/api/postcurrentdelhiking", controllers.CurrentDelhiKing)   // New route
	app.Get("/api/getcurrentdelhikings", controllers.GetCurrentDelhiKing) // New route

	app.Post("/api/postcurrentdubaiking", controllers.CurrentDubai)       // New route
	app.Get("/api/getcurrentdubaikings", controllers.GetCurrentDubaiKing) // New route

	app.Post("/api/postcurrentvijaylaxmi", controllers.CurrentVijayLaxmi)   // New route
	app.Get("/api/getcurrentvijaylaxmis", controllers.GetCurrentVijayLaxmi) // New route

	app.Post("/api/postcurrenthimachal", controllers.CurrentHimachal)    // New route
	app.Get("/api/getcurrenthimachals", controllers.GetCurrentHimachals) // New route

}
