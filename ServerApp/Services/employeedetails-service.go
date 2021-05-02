package Services

import (
	"errors"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type IEmployeeService interface {
	InsertData(emp Entities.EmploymentDetails) bool
	UpdateData(reqId string, emp Entities.EmploymentDetails) bool
	FetchData(reqId string) ([] Entities.EmploymentDetails, error)
}

type EmploymentDetails struct{
	es IEmployeeService
	dbh Logic.IDbHandler
}

func InitEmpSvc(db Logic.IDbHandler) *EmploymentDetails{
	return &EmploymentDetails{
		dbh: db,
	}
}

func (ed EmploymentDetails) FetchData(reqId string) ([]Entities.EmploymentDetails, error){

	list := []Entities.EmploymentDetails{};

	ed.dbh.Select(reqId, &list)

	if(len(list) > 0){
		return list, nil
	}
	return nil, errors.New("item not found");
}

func (ed EmploymentDetails) InsertData(emp Entities.EmploymentDetails) bool{
	return ed.dbh.Insert(&emp)
}

func (ed EmploymentDetails) UpdateData(reqId string, emp Entities.EmploymentDetails)bool{
	
	list, err := ed.es.FetchData(reqId)
	if(err != nil){
		return false;
	}

	emp.RequestId = list[0].RequestId;

	return ed.dbh.Update(&emp);
}