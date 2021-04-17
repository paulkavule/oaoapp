package Services

import (
	"errors"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type IIdentificationInfoService interface {
	Insert(idInfo Entities.IdentificationInfo) bool
	Update(reqId string, idInfo Entities.IdentificationInfo) bool
	Fetch(reqId string) ( [] Entities.IdentificationInfo,error)
}

type IdentificationInfoService struct{
	svc IIdentificationInfoService
	dh Logic.IDbHandler
}

func InitIdInfo(dah Logic.IDbHandler) *IdentificationInfoService{
	return &IdentificationInfoService{
		dh: dah,	
	}
}

func (ids IdentificationInfoService) Insert(idInfo Entities.IdentificationInfo) bool{
	return ids.dh.Insert(&idInfo);
}

func (ids IdentificationInfoService) Update(reqId string, idInfo Entities.IdentificationInfo) bool{
	idArray, err := ids.svc.Fetch(reqId);
	if(err != nil){
		return false;
	}
	if(len(idArray) <= 0){
		return false;
	}
	idInfo.RequestId = reqId;
	return ids.dh.Update(&idInfo);
}

func (ids IdentificationInfoService) Fetch(reqId string) ( [] Entities.IdentificationInfo,error){
	idsInfo := [] Entities.IdentificationInfo{};

	ids.dh.Select(reqId, &idsInfo);

	if(len(idsInfo) > 0 ){
		return idsInfo,nil
	}

	return nil, errors.New("not found")
}