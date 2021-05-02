package Services

import (
	"errors"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)

type IPreferenceService interface {
	InsertData(preInfo Entities.Preferences) bool
	UpdateData(reqId string, preInfo Entities.Preferences) bool
	FetchData(reqId string) ([]Entities.Preferences, error)
	
}

type PreferenceService struct {
	pref IPreferenceService
	db Logic.IDbHandler
}

func InitPref(dbh Logic.IDbHandler) *PreferenceService{
	return &PreferenceService{
		db: dbh,
	}
}

func (pref PreferenceService) InsertData(preInfo Entities.Preferences) bool{
	saved := pref.db.Insert(&preInfo)
	
	return saved;
}

func (pre PreferenceService) 	UpdateData(reqId string, preInfo Entities.Preferences) bool{
	
	pref, err := pre.FetchData(reqId);
	if(err != nil){
		return false;
	}

	preInfo.RequestId = pref[0].RequestId;

	saved := pre.db.Update(&pref);
	return saved;
}

func (pre PreferenceService) 	FetchData(reqId string) ([]Entities.Preferences, error){

	pref := []Entities.Preferences{};
	pre.db.Select(reqId, &pref);
	if(len(pref) > 0){
		return pref, nil
	}
	return nil, errors.New("item not found");
}
 
