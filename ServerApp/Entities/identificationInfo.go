package Entities

type IdentificationInfo struct {
	Id                 int    `gorm:"primary_key,auto_increment"`
	RequestId          string `json:"requestId" binding:"required" gorm:"type:varcar(150)"`
	Nationality        string `json:"nationality" binding:"required,min=2" gorm:"type:varchar(10)"`
	CountryOfResidence string `json:"countryOfResidence" binding:"required,min=2" gorm:"type:varchar(10)"`
	IdType             string `json:"idType" binding:"required" gorm:"type:varchar(10)"`
	IdNumber           string `json:"idNumber" binding:"required" gorm:"type:varchar(50)"`
}