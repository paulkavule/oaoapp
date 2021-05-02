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
	server.Use(gin.Recovery(),MiddleWares.CorsPolicy2())
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

	cntInfo := server.Group("continfo")
	{
		ser := Services.InitContactInfo(dhandler);
		cntCtl := Controllers.InitCi(ser);
		cntInfo.POST("/execute", cntCtl.GetPostContactInfo)
		cntInfo.PUT("/execute/:id", cntCtl.UpdateContactInfo)
		cntInfo.GET("/execute/*id", cntCtl.GetPostContactInfo)
	}
	prefInfo := server.Group("prefinfo")
	{
		ser := Services.InitPref(dhandler);
		prefCtl := Controllers.InitPrefCtl(ser);
		prefInfo.POST("/execute", prefCtl.PostData)
		prefInfo.PUT("/execute/:id", prefCtl.UpdateData)
		prefInfo.GET("/execute/*id", prefCtl.GetData)
	}
	empInfo := server.Group("empInfo")
	{
		ser := Services.InitEmpSvc(dhandler);
		empCtl := Controllers.InitEmpCtl(ser);
		empInfo.POST("/execute", empCtl.PostData)
		empInfo.PUT("/execute/:id", empCtl.UpdateData)
		empInfo.GET("/execute/*id", empCtl.GetData)
	}
	docUpload := server.Group("docs")
	{
		ser := Services.InitDocSvc(dhandler);
		docCtl := Controllers.InitDocCtl(ser);
		docUpload.POST("/execute/:id/:dc", docCtl.PostFile)
		// docUpload.PUT("/execute/:id", docCtl.)
		docUpload.GET("/execute/:id", docCtl.GetDocuments)
		docUpload.GET("/execute/:id/:dc", docCtl.GetDocument)
	}
	common := server.Group("common")
	{
		ser := Services.InitCommonService(dhandler);
		cntCtl := Controllers.InitComCtl(ser);
		common.GET("/execute/:sv/:sc", cntCtl.GetItems)
	}

	server.Run(":8300")
}