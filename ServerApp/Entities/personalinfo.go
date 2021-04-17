package Entities

import (
	"time"
)

type PersonalInfo struct {
	Id 			uint64	`gorm:"primary_key,auto_increment"`
	RequestId 	string 	`json:"requestId" gorm:"type:varchar(150)"`
	FirstName   string	`json:"firstName" binding:"required,min=2,max=50" gorm:"type:varchar(50)"`
	LastName    string	`json:"lastName" binding:"required,min=2,max=50" gorm:"type:varchar(50)"`
	Middlename  string	`json:"middleName" gorm:"type:varchar(50)"`
	DateOfBirth time.Time `json:"dateOfBirth" binding:"required" gorm:"type:datetime"`
	Gender 		int64	`json:"gender,omitempty" grom:"type:int(1)"`
	CreatedAt   time.Time `json:"-" gorm:"default:current_timestamp"`
}