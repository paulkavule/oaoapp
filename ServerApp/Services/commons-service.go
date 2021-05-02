package Services

import (
	"errors"
	"strings"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type ICommonsService interface {
	GetItem(sv string, sc string) ([]Entities.PairedItem, error)
}

type CommonsService struct {
	cs ICommonsService
	dh Logic.IDbHandler
}

func InitCommonService(dah Logic.IDbHandler) *CommonsService{
	return &CommonsService{
		dh : dah,
	}
}

func (cs CommonsService) GetItem(sv string, sc string) ([]Entities.PairedItem, error){

	list := [] Entities.PairedItem{}
	switch strings.ToLower(sc)  {
		case "country":
			list = GetCountries(sv, cs.dh)
		case "branch":
			list = getBranches(sv, cs.dh)
		case "accountcategory":
			list = getAccountCategorys(sv, cs.dh);
		case "accounttype":
			list = getAccountTypes(sv, cs.dh);
	}
	if(len(list) > 0){
		return list, nil
	}
	return list, errors.New("not found")
}

func GetCountries(sv string, dh Logic.IDbHandler) []Entities.PairedItem{
	var itemlist []Entities.Country;
	pl := [] Entities.PairedItem{}
	dh.RunQuery("code = ? ", [] string {sv}, &itemlist);

	if(len(itemlist) > 0){
		for  _, itm := range itemlist{
			pl = append(pl,Entities.PairedItem{ Code: itm.Code, Name: itm.Name })
		}
	}

	return pl;
}

func getBranches(sv string, dh Logic.IDbHandler) []Entities.PairedItem{
	var itemlist []Entities.Branch;
	pl := [] Entities.PairedItem{}
	dh.Select(sv, &itemlist);

	if(len(itemlist) > 0){
		for  _, itm := range itemlist{
			pl = append(pl,Entities.PairedItem{ Code: itm.Code, Name: itm.Name })
		}
	}
	return pl;
}

func getAccountCategorys(sv string, dh Logic.IDbHandler) []Entities.PairedItem{
	var itemlist []Entities.AccountCategory;
	pl := [] Entities.PairedItem{}
	dh.RunQuery("code = ? ", [] string {sv}, &itemlist);

	if(len(itemlist) > 0){
		for  _, itm := range itemlist{
			pl = append(pl,Entities.PairedItem{ Code: itm.Code, Name: itm.Name })
		}
	}
	return pl;
}
func getAccountTypes(sv string, dh Logic.IDbHandler) []Entities.PairedItem{
	var itemlist []Entities.AccountType;
	pl := [] Entities.PairedItem{}
	dh.RunQuery("Account_Category = ? ", [] string {sv}, &itemlist);

	if(len(itemlist) > 0){
		for  _, itm := range itemlist{
			pl = append(pl,Entities.PairedItem{ Code: itm.Code, Name: itm.Name })
		}
	}
	return pl;
}

