package Controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"zxabu.com/Dtos"
	"zxabu.com/Entities"
	"zxabu.com/Services"
)


type EmployeeDetailsController struct {
	svc Services.IEmployeeService
}

func InitEmpCtl(sv Services.IEmployeeService) *EmployeeDetailsController{
	return &EmployeeDetailsController{
		svc: sv,
	}
}

func (ctl EmployeeDetailsController) PostData(cxt *gin.Context){

	var emp Entities.EmploymentDetails;

	err := cxt.ShouldBindJSON(&emp);
	if(err != nil){
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	saved := ctl.svc.InsertData(emp)
	if(saved){
		cxt.JSON(http.StatusInternalServerError, Dtos.ApiResponse{ ErrorCode: "0", ErrorDescription: "SUCCESS"})
	}else{
		cxt.JSON(http.StatusOK, Dtos.ApiResponse{ErrorCode: "100",ErrorDescription: "FAILED"})
	}

}

func (ctl EmployeeDetailsController) UpdateData(cxt *gin.Context){

	reqId := cxt.Param("id");
	var emp Entities.EmploymentDetails;
	err := cxt.ShouldBindJSON(&emp);

	if(err != nil){
		cxt.JSON(http.StatusBadRequest, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	saved := ctl.svc.UpdateData(reqId,emp)
	if(saved){
		cxt.JSON(http.StatusInternalServerError, Dtos.ApiResponse{ ErrorCode: "0", ErrorDescription: "SUCCESS"})
	}else{
		cxt.JSON(http.StatusOK, Dtos.ApiResponse{ErrorCode: "100",ErrorDescription: "FAILED"})
	}

}

func (ctl EmployeeDetailsController) GetData(cxt *gin.Context){

	reqId := cxt.Param("id");

	list, err := ctl.svc.FetchData(reqId)
	if(err != nil){
		cxt.JSON(http.StatusNotFound, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "FAILED", Result: err})
		return;
	}

	cxt.JSON(http.StatusOK, Dtos.ApiResponse{ErrorCode: "0", ErrorDescription: "SUCCESS", Result: list})
}