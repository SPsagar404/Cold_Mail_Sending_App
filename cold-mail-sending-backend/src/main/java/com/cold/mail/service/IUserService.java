package com.cold.mail.service;

import com.cold.mail.modal.User;

import java.util.List;

public interface IUserService {

    public boolean createUser(User newUser);

    public boolean updateUser(Long id, User newUser);

    public User getUserById(Long id);

    public List<User> getAllUsers();

    public void deleteUser(Long id);

    public void sendEmailToHr(Long id);

}
