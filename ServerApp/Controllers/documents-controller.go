package Controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"zxabu.com/Dtos"
	"zxabu.com/Services"
)


type DocumentsController struct {
	svc Services.IDocumentUploadService
}

func InitDocCtl(sv Services.IDocumentUploadService) *DocumentsController {
	return &DocumentsController{
		svc:sv,
	}
}

func (ctl DocumentsController) PostFile(cxt *gin.Context){
	// cxt.Header("Access-Control-Allow-Origin", "*")
	fmt.Println("Hello chief one");
	fl, err := cxt.FormFile("fl");

	if(err != nil){
		fmt.Printf("fl %s \n", err.Error())
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}
	file, err := fl.Open()
	if(err != nil){
		fmt.Printf("Open %s \n", err.Error())
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}
	reqId := cxt.Param("id");
	docCode := cxt.Param("dc");
	fmt.Printf("reqId %s , %s docCode", reqId, docCode);
	dok, err := ctl.svc.InsertData(reqId, docCode, fl.Filename, file);
	if(err != nil){
		fmt.Printf("InsertData %s \n", err.Error())
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	cxt.JSON(http.StatusOK, Dtos.ApiResponse{ ErrorCode: "0", ErrorDescription: "SUCCESS", Result: dok})
}

func (ctl DocumentsController) GetDocuments(cxt *gin.Context){
	fmt.Println("Hello chief two");
	reqId := cxt.Param("id");
	list, fetched := ctl.svc.GetDocs(reqId);
	fmt.Printf("GetDocuments %s\n", reqId);
	if(fetched){
		cxt.JSON(http.StatusOK, Dtos.ApiResponse{ ErrorCode: "0", ErrorDescription: "SUCCESS", Result: list})
	}else{
		cxt.JSON(http.StatusNotFound, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "NOT FOUND"})
	}
}

func (ctl DocumentsController) GetDocument(cxt *gin.Context){
	fmt.Println("Hello chief three");
	reqId := cxt.Param("id");
	docCode := cxt.Param("dc");
	list, fetched := ctl.svc.FetchData(reqId,docCode);

	if(fetched){
		cxt.JSON(http.StatusOK, Dtos.ApiResponse{ ErrorCode: "0", ErrorDescription: "SUCCESS", Result: list})
	}else{
		cxt.JSON(http.StatusConflict, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "NOT FOUND"})
	}
}