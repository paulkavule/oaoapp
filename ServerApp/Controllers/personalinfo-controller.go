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


type PersonalInfoController struct {
	svc Services.IPersonalInfoService
}

func InitPi(pis Services.IPersonalInfoService) *PersonalInfoController{
	return &PersonalInfoController{
		svc: pis,
	}
}

func (ctl PersonalInfoController) PostPersonalInfo(cxt *gin.Context){
	var data Entities.PersonalInfo;
	err := cxt.ShouldBindJSON(&data)
	if(err != nil){
		fmt.Println(err)
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{
			ErrorCode:  "100",
			ErrorDescription: "Request is poorly formated",
			Result: strings.Split(err.Error(), "\n") ,
		});
		return;
	}

	id, err := ctl.svc.InsertData(data);
	
	sc := http.StatusOK;
	resp := Dtos.ApiResponse{ ErrorCode:  "0", ErrorDescription: "SUCCESS", Result: id };

	if(err != nil){
		sc = http.StatusInternalServerError;
		fmt.Println(err)
		resp = Dtos.ApiResponse{ ErrorCode:  "100", ErrorDescription: "Failed", Result: err, };
	}

	cxt.JSON(sc, resp)  ;
}

func (ctl PersonalInfoController) UpdatePersonalInfo(cxt *gin.Context){
	
	reqId := cxt.Param("id");
	var perInfo Entities.PersonalInfo;
	err := cxt.ShouldBindJSON(&perInfo);
	if(err != nil){
		fmt.Println(err)
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{
			ErrorCode:  "100",
			ErrorDescription: "Request is poorly formated",
			Result: strings.Split(err.Error(), "\n") ,
		});
	}
	err = ctl.svc.UpdateData(reqId, perInfo)
	
	resp := Dtos.ApiResponse{
		ErrorCode:  "0",
		ErrorDescription: "SUCCESS - UpdatePersonalInfo",
		Result: reqId,
	};
	
	status := http.StatusOK;
	if(err != nil){
		status = http.StatusInternalServerError;
		resp = Dtos.ApiResponse{ ErrorCode:  "100", ErrorDescription: "Failed", Result: err, };
	}

	cxt.JSON(status, resp);
}

func (ctl PersonalInfoController) GetPersonalInfo(cxt *gin.Context){

	reqId := cxt.Param("id")
	reqId = strings.Trim(reqId,"//");
	fmt.Println("requestId : "+reqId);

	pis, err := ctl.svc.FetchData(reqId)
	sc := http.StatusOK;
	resp := Dtos.ApiResponse{
		ErrorCode:  "0",
		ErrorDescription: "SUCCESS",
		Result: pis,
	};

	if(err != nil){
		sc = http.StatusNotFound;
		resp = Dtos.ApiResponse{ ErrorCode:  "100", ErrorDescription: "Failed", Result: err.Error() };
	}

	cxt.JSON(sc, resp);
}