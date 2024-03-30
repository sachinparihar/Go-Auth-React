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

type DelhiKing7_30 struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type Dubai5_15 struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}

type VijayLaxmi12_40 struct {
	Number int       `json:"number"`
	Date   time.Time `json:"date"`
}
