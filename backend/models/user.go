package models

import "time"

type User struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"`
}

type NumberDate struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type DelhiKing struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type VijayLaxmi struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type DubaiKing struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type Himachal struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type CurrentDelhiKing struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type CurrentDubai struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type CurrenVijayLaxmi struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type CurrentHimachal struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}
