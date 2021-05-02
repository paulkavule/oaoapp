package Entities

type Country struct {
	Id   int64  `gorm:"auto_increment,primary_key"`
	Name string `json:"name" gorm:"type:varchar(30)"`
	Code string `json:"code" gorm:"type:varchar(10)"`
}
type District struct {
	Id   int64  `gorm:"auto_increment,primary_key"`
	Name string `json:"name" gorm:"type:varchar(30)"`
	Code string `json:"code" gorm:"type:varchar(10)"`
}

type County struct {
	Id           int64  `gorm:"auto_increment,primary_key"`
	Name         string `json:"name" gorm:"type:varchar(30)"`
	Code         string `json:"code" gorm:"type:varchar(10)"`
	DistrictCode string `json:"districtCode" gorm:"type:varchar(10)"`
}

type SubCounty struct {
	Id         int64  `gorm:"auto_increment,primary_key"`
	Name       string `json:"name" gorm:"type:varchar(30)"`
	Code       string `json:"code" gorm:"type:varchar(10)"`
	CountyCode string `json:"countyCode" gorm:"type:varchar(10)"`
}

type Parish struct {
	Id            int64  `gorm:"auto_increment,primary_key"`
	Name          string `json:"name" gorm:"type:varchar(30)"`
	Code          string `json:"code" gorm:"type:varchar(10)"`
	SubCountyCode string `json:"subCountyCode" gorm:"type:varchar(10)"`
}

type Village struct {
	Id        int64  `gorm:"auto_increment,primary_key"`
	Name      string `json:"name" gorm:"type:varchar(30)"`
	Code      string `json:"code" gorm:"type:varchar(10)"`
	PrishCode string `json:"parishCode" gorm:"type:varchar(10)"`
}
