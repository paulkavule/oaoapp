package Logic

import (
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
	"zxabu.com/Entities"
)


var (dbcon *gorm.DB)

func init() {
	db, _err := gorm.Open("sqlite3", "oaodb.db")
	if _err != nil {
		panic(_err)
	}
	db.AutoMigrate(Entities.PersonalInfo{}, 
		Entities.IdentificationInfo{}, 
		Entities.ContactInfo{}, 
		Entities.Country {},
		Entities.Preferences{},
		Entities.EmploymentDetails{},
		Entities.Document{},
	)
	dbcon = db;
}

type IDbHandler interface {
	//GetConnection(obj interface{}) *gorm.DB
	Insert(obj interface{}) bool
	Update(obj interface{}) bool
	Select(id string, obj interface{}) interface{}
	RunQuery(query string, colValue [] string, obj interface{}) interface{}
}

type DbHandler struct{
	db IDbHandler
}

func GetConnection () IDbHandler{
	return &DbHandler{};
}
func (db DbHandler) Insert(obj interface{}) bool{
	//data := reflect.ValueOf(obj)
	//data.
	rows := dbcon.Create(obj).RowsAffected;
	return rows > 0
}

func (db DbHandler) Update(obj interface{}) bool{
	rows := dbcon.Save(obj).RowsAffected;
	return rows > 0
}

func (db DbHandler) Select(id string, obj interface{}) interface{}{
	if(id == ""){
		dbcon.Set("gorm:auto_preload", true).Find(obj)
	}else{
		dbcon.Where("request_id = ?", id).Find(obj)
	}
	
	return obj
}

func (db DbHandler) RunQuery(query string, colValue [] string, obj interface{}) interface{}{

	dbcon.Where(query, colValue).Find(obj)
	return obj
}