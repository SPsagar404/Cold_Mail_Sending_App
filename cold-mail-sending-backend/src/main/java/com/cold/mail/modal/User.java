package com.cold.mail.modal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "USER_TBL")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private Boolean isMailSent;

    private String organisation;


}
