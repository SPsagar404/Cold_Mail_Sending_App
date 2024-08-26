package com.cold.mail.exception;

public class EmailNotSentException extends RuntimeException{

    public EmailNotSentException(String msg){
        super(msg);
    }

}
