package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"zxabu.com/Dtos"
	"zxabu.com/Entities"
	"zxabu.com/Services"
)


type PreferencesContoller struct {
	svc Services.IPreferenceService
}

func InitPrefCtl(sv Services.IPreferenceService) *PreferencesContoller {
	return &PreferencesContoller{
		svc: sv,
	}
}

func (ctl PreferencesContoller) PostData(ctx *gin.Context){

	var pref Entities.Preferences;
	err := ctx.ShouldBindJSON(&pref);
	if(err != nil){
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	saved := ctl.svc.InsertData(pref);
	if(saved){
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCSS"})
	}else{
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"})	
	}
}

func (ctl PreferencesContoller) UpdateData(ctx *gin.Context){

	var pref Entities.Preferences;
	reqId := ctx.Param("id");
	err := ctx.ShouldBindJSON(&pref);
	if(err != nil){
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	saved := ctl.svc.UpdateData(reqId, pref);
	if(saved){
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCSS"})
	}else{
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"})	
	}
}


func (ctl PreferencesContoller) GetData(ctx *gin.Context){

	reqId := ctx.Param("id");
	list, err := ctl.svc.FetchData(reqId);
	
	if(err != nil){
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "100", ErrorDescription: "FAILED"})
	}else{
		ctx.JSON(http.StatusBadRequest, Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCSS", Result: list})
	}
}
