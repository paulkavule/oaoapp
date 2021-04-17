package Dtos

import "time"

type ApiResponse struct {
	ErrorCode        string
	ErrorDescription string
	Result           interface{}
}

type ErrorResponse struct {
	ErrorId     string
	ErrorSource string
	Error       error
	FatalFlag   bool
	ErrorDate   time.Time
}
