package main

import (
	"github.com/gin-gonic/gin"
	"zxabu.com/Controllers"
	"zxabu.com/Logic"
	"zxabu.com/MiddleWares"
	"zxabu.com/Services"
)


func main() {

	server := gin.New();
	server.Use(gin.Recovery(), MiddleWares.CorsPolicy())
	dhandler := Logic.GetConnection();
	perInfo := server.Group("/perinfo")
	{
		ser := Services.InitPi(dhandler);
		ctl := Controllers.InitPi(ser);
		perInfo.POST("/execute", ctl.PostPersonalInfo)
		perInfo.PUT("/execute/:id", ctl.UpdatePersonalInfo)
		perInfo.GET("/execute/*id", ctl.GetPersonalInfo)
	}

	idInfo := server.Group("/idinfo")
	{
		ser := Services.InitIdInfo(dhandler);
		idCtl := Controllers.InitId(ser);
		idInfo.POST("/execute", idCtl.PostIdInformation)
		idInfo.PUT("/execute/:id", idCtl.UpdateIdInformation)
		idInfo.GET("/execute/*id", idCtl.GetIdInformation)
	}

	server.Run(":8300")
}