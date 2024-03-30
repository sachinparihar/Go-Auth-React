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

}
