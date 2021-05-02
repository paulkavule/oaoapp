package Entities

import "time"

type EmploymentDetails struct {
	Id              int64  `json:"_"  gorm:"primary_key, auto_increment"`
	RequestId       string `json:"requestId" binding:"required,min=10" gorm:"type:varchar(40)"`
	EmploymentType  string `json:"employmentType" binding:"required" gorm:"type:varchar(40)"`
	CurrentEmployer string `json:"currentEmployer" binding:"required" gorm:"type:varchar(40)"`
	StartDate       time.Time `json:"startDate" binding:"required" gorm:"type:date"`
	GrossIncome     string `json:"grossIncome" binding:"required" gorm:"type:varchar(40)"`
}