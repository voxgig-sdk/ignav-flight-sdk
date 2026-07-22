package core

type IgnavFlightError struct {
	IsIgnavFlightError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIgnavFlightError(code string, msg string, ctx *Context) *IgnavFlightError {
	return &IgnavFlightError{
		IsIgnavFlightError: true,
		Sdk:              "IgnavFlight",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IgnavFlightError) Error() string {
	return e.Msg
}
