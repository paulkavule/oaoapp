package Entities

type Preferences struct {
	Id              int    `gorm:"primary_key,auto_increment"`
	RequestId       string `json:"requestId" gorm:"type:varchar(50)"`
	TradingCountry  string `json:"tradingCountry" binding:"required" gorm:"type:varchar(40)"`
	PreferedBranch  string `json:"preferedBranch" binding:"required" gorm:"type:varchar(40)"`
	AccountCategory string `json:"accountCategory" binding:"required" gorm:"type:varchar(40)"`
	AccountType     string `json:"accountType" binding:"required" gorm:"type:varchar(40)"`
	MobileBanking   bool   `json:"mobileBanking" binding:"required" gorm:"type:bit"`
	EStatement      bool   `json:"eStatement" binding:"required" gorm:"type:bit"`
	SmsNotification bool   `json:"smsNotification" binding:"required" gorm:"type:bit"`
}