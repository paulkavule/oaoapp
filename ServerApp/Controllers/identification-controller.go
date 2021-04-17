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


type IdentificationInfoController struct{
	svc Services.IIdentificationInfoService;
}
func InitId(ids Services.IIdentificationInfoService) *IdentificationInfoController {
	return &IdentificationInfoController{
		svc: ids,
	}
}

func (idc IdentificationInfoController) PostIdInformation(cxt *gin.Context){
	var idInfo Entities.IdentificationInfo;
	err := cxt.ShouldBindJSON(&idInfo);
	fmt.Println(idInfo)
	if(err != nil){
		fmt.Println(err);
		cxt.JSON(http.StatusBadGateway, Dtos.ApiResponse{ 
			ErrorCode:  "100", 
			ErrorDescription: "Request is poorly formated", 
			Result: strings.Split(err.Error(), "\n"),
		}); 
	}

	success := idc.svc.Insert(idInfo)
	status := http.StatusInternalServerError;
	resp := Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED", Result: nil }
	if(success){
		status = http.StatusOK;
		resp = Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS", Result: nil }
	}
	cxt.JSON(status, resp);
}


func (idc IdentificationInfoController) UpdateIdInformation(cxt *gin.Context){
	
}

func (idc IdentificationInfoController) GetIdInformation(cxt *gin.Context){
	reqId := cxt.Param("id");
	reqId = strings.Trim(reqId,"//");
	fmt.Println(reqId)
	idlist, err := idc.svc.Fetch(reqId)
	if(err != nil){
		fmt.Println(err);
		cxt.JSON(http.StatusInternalServerError, Dtos.ApiResponse{
			ErrorCode: "100",
			ErrorDescription: "FAILED",
			Result: err,
		})
	}
	status := http.StatusNotFound
	resp := Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "NOT FOUND", Result: nil }
	if(len(idlist) > 0){
		status = http.StatusOK
		resp = Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS", Result: idlist}
	}

	cxt.JSON(status,resp)
}

