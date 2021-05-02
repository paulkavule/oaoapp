package Entities

type ContactInfo struct {
	Id                     int64  `json:"_"  gorm:"primary_key, auto_increment"`
	RequestId              string `json:"requestId" binding:"required,min=10" gorm:"type:varchar(40)"`
	PhysicalAddress        string `json:"physicalAddress" binding:"required" gorm:"type:varchar(100)"`
	PostalAddress          string `json:"postalAdress" gorm:"type:varchar(40)"`
	PhoneNumber            string `json:"phoneNumber" gorm:"type:varchar(40)"`
	AlternativePhoneNumber string `json:"alternativeNumber" gorm:"type:varchar(40)"`
	EmailAddress           string `json:"emailAddress" gorm:"type:varchar(40)"`
}