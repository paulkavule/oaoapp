package Services

import (
	"errors"

	"github.com/google/uuid"
	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type IPersonalInfoService interface {
	InsertData(perInfo Entities.PersonalInfo) (string, error)
	FetchData(reqId string) ([] Entities.PersonalInfo, error)
	UpdateData(reqId string, perInfo Entities.PersonalInfo) error
}

type PersonalInfoService struct{
	pis IPersonalInfoService
	dh Logic.IDbHandler
}

func InitPi(dbh Logic.IDbHandler) *PersonalInfoService {
	return &PersonalInfoService{
		dh: dbh,
	}
}

func (pis PersonalInfoService) InsertData (data Entities.PersonalInfo) (string, error){
	data.RequestId = uuid.NewString()
	done := pis.dh.Insert(&data)
	if(done){
		return data.RequestId, nil
	}
	return "", errors.New ("saving personal information has failed");
}

func (pis PersonalInfoService) UpdateData (reqId  string, data Entities.PersonalInfo)  error{

	piArray, err := pis.FetchData(reqId)
	if(err != nil){
		return err;
	}
	if(len(piArray) <= 0){
		return errors.New("item not found");
	}

	data.RequestId = reqId;
	done := pis.dh.Update(&data)
	if(done){
		return nil
	}
	return errors.New ("saving personal information has failed");
}

func (pis PersonalInfoService) FetchData(reqId string) ([] Entities.PersonalInfo, error){

	//pi := [] Entities.PersonalInfo{}
	var info [] Entities.PersonalInfo
	// if(reqId == ""){
	// 	var pi Entities.PersonalInfo;
	// 	pis.dh.Select(reqId, pi);
		
	// }else{
	// 	pis.dh.Select("", &info)
	// }
	pis.dh.Select(reqId, &info)

	if(len(info) > 0 ){
		return info,nil
	}

	return nil, errors.New("not found")
}