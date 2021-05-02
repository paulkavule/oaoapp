package Services

import (
	"crypto/sha1"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"zxabu.com/Entities"
	"zxabu.com/Logic"
)


type IDocumentUploadService interface {
	InsertData(reqId string, docCode string, orgFileName string, file multipart.File ) (Entities.Document, error);
	UpdateData(reqId string, docCode string, orgFileName string, file multipart.File ) (Entities.Document, error);
	FetchData(reqId string, docCode string) ([]Entities.Document, bool);
	GetDocs(reqId string) ([]Entities.Document, bool);
}

type DocumentUploadService struct{
	dbh Logic.IDbHandler
}
func InitDocSvc(db Logic.IDbHandler) *DocumentUploadService{
	return &DocumentUploadService{
		dbh: db,
	}
}

func (doc DocumentUploadService) InsertData(reqId string, docCode string, orgFileName string, 
	file multipart.File ) (Entities.Document, error){

	dirPath := "./docs/"+reqId;// strings.Replace(reqId,"-","",0); 
	os.MkdirAll(dirPath, os.ModePerm);

	ext := orgFileName[strings.LastIndex(orgFileName, "."):];
	fileName := docCode+"."+ext;
	filePath := filepath.Join(dirPath, fileName);
	fl, err := os.Create(filePath);
	if(err != nil){
		fmt.Println("error in fl doc service"+err.Error())
		return Entities.Document{}, err
	}
	defer fl.Close()

	bs, err := ioutil.ReadAll(file);
	if(err != nil){
		fmt.Println("error in bs doc service"+err.Error())
		return Entities.Document{}, err
	}

	_, err = fl.Write(bs);
	if(err != nil){
		fmt.Println("error in wr doc service"+err.Error())
		return Entities.Document{}, err
	}

	dok := Entities.Document{
		RequestId: reqId,
		DocCode: docCode,
		FileName: fileName,
		FilePath: filePath,
	}

	saved  := doc.dbh.Insert(&dok)
	if(saved){
		return dok, nil
	}
	return  Entities.Document{}, errors.New("failed to save document");
}

func (doc DocumentUploadService) UpdateData(reqId string, docCode string, orgFileName string, file multipart.File ) (Entities.Document,error){
	return Entities.Document{}, nil
}

func generatefileHash(file multipart.File) string{
	h := sha1.New();
	io.Copy(h,file);
	return string(h.Sum(nil))
}

func (doc DocumentUploadService) FetchData(reqId string, docCode string) ([]Entities.Document, bool){

	list := [] Entities.Document{};
	colVals := [] string {reqId, docCode}
	doc.dbh.RunQuery("", colVals, &list);

	if(len(list) > 0){
		return list, true;
	}else{
		return nil, false;
	}
}

func (doc DocumentUploadService) GetDocs(reqId string) ([]Entities.Document, bool){

	list := [] Entities.Document{};
	doc.dbh.Select(reqId, &list);

	if(len(list) > 0){
		return list, true;
	}else{
		return nil, false;
	}
}