package Entities

type Document struct {
	Id        int64  `json:"_"  gorm:"primary_key, auto_increment"`
	RequestId string `json:"requestId" binding:"required" gorm:"type:varchar(40)"`
	DocCode   string `json:"docCode" binding:"required" gorm:"type:varchar(40)"`
	FileName  string `json:"fileName" binding:"required" gorm:"type:varchar(40)"`
	FilePath  string `json:"filePath" binding:"required" gorm:"type:varchar(200)"`
}