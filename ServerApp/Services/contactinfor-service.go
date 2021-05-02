package Services

import (
	"errors"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type IContactInfoService interface {
	Create(contInf Entities.ContactInfo) bool
	Update(reqId string,  contInf Entities.ContactInfo) bool
	Fetch(id string) ([] Entities.ContactInfo, error)
}

type ContactInfoService struct {
	svc IContactInfoService
	dh  Logic.IDbHandler
}

func InitContactInfo(dah Logic.IDbHandler) *ContactInfoService{
	return &ContactInfoService{
		dh: dah,
	}
}

func (ci ContactInfoService) Create(contInf Entities.ContactInfo) bool{
	return ci.dh.Insert(&contInf)
}

func (ci ContactInfoService) Update(reqId string, contInf Entities.ContactInfo) bool{

	_, err := ci.svc.Fetch(reqId)
	if(err != nil){
		return false;
	}

	contInf.RequestId = reqId;
	return ci.dh.Update(&contInf)
}

func (ci ContactInfoService) Fetch(reqId string) ([] Entities.ContactInfo, error){
	info := []Entities.ContactInfo{}

	ci.dh.Select(reqId, &info);

	if(len(info) > 0){
		return info, nil
	}

	return nil, errors.New("not found");
}