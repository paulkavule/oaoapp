package MiddleWares

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	cors "github.com/itsjamie/gin-cors"
)
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Set headers
		w.Header().Set("Access-Control-Allow-Headers:", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		fmt.Println("ok")

		// Next
		next.ServeHTTP(w, r)
		return
	})
}


func CorsPolicy2() gin.HandlerFunc {
	return func(c *gin.Context) {
	  c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	  c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
	  c.Writer.Header().Set("Access-Control-Allow-Methods", "*")
	  c.Next()
	}
  }
func CorsPolicy () gin.HandlerFunc {
	return cors.Middleware(cors.Config{
		Origins:        "http://localhost:3000",
		Methods:        "GET, PUT, POST, DELETE",
		RequestHeaders: "Origin, Authorization, Content-Type",
		ExposedHeaders: "",
		MaxAge: 50 * time.Second,
		Credentials: true,
		ValidateHeaders: false,
	})
}