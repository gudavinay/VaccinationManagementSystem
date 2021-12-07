package com.VMS.backend.util;

public class ExceptionHandle {
    private BadRequest badRequest;

    public ExceptionHandle(BadRequest badRequest) {
        this.badRequest = badRequest;
    }

    public BadRequest getBadRequest() {
        return badRequest;
    }

    public void setBadRequest(BadRequest badRequest) {
        this.badRequest = badRequest;
    }
}
