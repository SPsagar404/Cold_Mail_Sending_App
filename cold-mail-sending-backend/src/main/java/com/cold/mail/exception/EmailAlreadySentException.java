package com.cold.mail.exception;

public class EmailAlreadySentException extends RuntimeException{

    public EmailAlreadySentException(String msg){
        super(msg);
    }
}
