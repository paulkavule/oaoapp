package Entities

type AccountCategory struct {
	Id   int64  `gorm:"auto_increment,primary_key"`
	Name string `json:"name" gorm:"type:varchar(30)"`
	Code string `json:"code" gorm:"type:varchar(10)"`
}

type AccountType struct {
	Id              int64  `gorm:"auto_increment,primary_key"`
	Name            string `json:"name" gorm:"type:varchar(30)"`
	Code            string `json:"code" gorm:"type:varchar(10)"`
	AccountCategory string `json:"accountCategory" gorm:"type:varchar(10)"`
}

type Branch struct {
	Id   int64  `gorm:"auto_increment,primary_key"`
	Name string `json:"name" gorm:"type:varchar(30)"`
	Code string `json:"code" gorm:"type:varchar(10)"`
}