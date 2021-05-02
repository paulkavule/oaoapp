package Controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"zxabu.com/Dtos"
	"zxabu.com/Services"
)


type CommonsController struct {
	cvs Services.ICommonsService
}

func InitComCtl(ser Services.ICommonsService) *CommonsController{
	return &CommonsController{
		cvs: ser,
	}
}

func (ctl CommonsController) GetItems(cxt *gin.Context){
	
	sv := cxt.Param("sv");
	sc := cxt.Param("sc");
	fmt.Println(sv+" ----  "+sc);
 	list, err := ctl.cvs.GetItem(sv,sc)
	
	if(err != nil){
		cxt.JSON(http.StatusNotFound, Dtos.ApiResponse{ ErrorCode: "100", ErrorDescription: "Not Found"})
		return;
	}

	cxt.JSON(http.StatusOK, Dtos.ApiResponse{
		ErrorCode: "0",
		ErrorDescription: "SUCCESS",
		Result: list,
	})
}