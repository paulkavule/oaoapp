package Controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"zxabu.com/Dtos"
	"zxabu.com/Entities"
	"zxabu.com/Services"
)



type ContactInfoController struct{
	svc Services.IContactInfoService;
}
func InitCi(ser Services.IContactInfoService) *ContactInfoController{
	return &ContactInfoController{
		svc: ser,
	}
}

func (ctl ContactInfoController) PostContactInfo(cxt *gin.Context){
	
	var cntInfo Entities.ContactInfo

	err := cxt.ShouldBindJSON(&cntInfo)
	if(err != nil){
		fmt.Println(err)
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{
			ErrorCode: "100",
			ErrorDescription: "FAILED",
			Result: err,
		})
		return;
	}

	saved := ctl.svc.Create(cntInfo)
	status := http.StatusOK;
	resp := Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS" }

	if(saved){
		status = http.StatusInternalServerError
		resp = Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"}
	}
	cxt.JSON(status,resp)
}

func (ctl ContactInfoController) UpdateContactInfo(cxt *gin.Context){
	reqId := cxt.Param("id")
	var cntInfo Entities.ContactInfo;

	err := cxt.ShouldBindJSON(&cntInfo)
	if(err != nil){
		fmt.Println(err)
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{
			ErrorCode: "100",
			ErrorDescription: "FAILED",
			Result: err,
		})
		return;
	}

	saved := ctl.svc.Update(reqId, cntInfo)
	status := http.StatusOK;
	resp := Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS" }

	if(saved){
		status = http.StatusInternalServerError
		resp = Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"}
	}
	cxt.JSON(status,resp)
}

func (ctl ContactInfoController) GetPostContactInfo(cxt *gin.Context){
	reqId := cxt.Param("id")
	reqId = strings.Trim(reqId,"//");

	list, err := ctl.svc.Fetch(reqId)
	status := http.StatusOK;
	resp := Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS", Result: list}
	if(err != nil){
		status = http.StatusNotFound;
		resp = Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"}
	}
	cxt.JSON(status,resp);
}
