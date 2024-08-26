package com.cold.mail.service.impl;

import com.cold.mail.exception.EmailAlreadySentException;
import com.cold.mail.exception.EmailNotSentException;
import com.cold.mail.exception.UserAlreadyExistException;
import com.cold.mail.exception.UserNotFoundException;
import com.cold.mail.modal.User;
import com.cold.mail.repository.IUserRepository;
import com.cold.mail.service.IUserService;
import com.cold.mail.utils.email.EmailServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository repository;

    @Autowired
    private EmailServiceUtil emailServiceUtil;


    @Override
    public boolean createUser(User newUser) {

        User existingUser = repository.findByEmail(newUser.getEmail());

        if(existingUser == null){
            newUser.setIsMailSent(false);
            User savedUser = repository.save(newUser);
            return savedUser.getId() != null;
        }
        throw  new UserAlreadyExistException("User already Exist With Email Id :: "+existingUser.getEmail());
    }

    @Override
    public boolean updateUser(Long id, User newUser) {

        User existingUser = repository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with User id :: " + id));
        existingUser.setName(newUser.getName());
        existingUser.setOrganisation(newUser.getOrganisation());
        existingUser.setIsMailSent(newUser.getIsMailSent());
        User savedUser = repository.save(existingUser);
        return savedUser.getId() != null;
    }

    @Override
    public User getUserById(Long id) {
        return repository.findById(id).orElseThrow(()-> {
            return new UserNotFoundException("User not found with User Id :: " + id);
        });
    }

    @Override
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        User existingUser = repository.findById(id).orElseThrow(() -> {
            return new UserNotFoundException("User not found with User Id :: " + id);
        });
        repository.delete(existingUser);
    }

    @Override
    public void sendEmailToHr(Long id) {
        User existingUser = getUserById(id);
        if(!existingUser.getIsMailSent()){
            boolean isEmailSent = emailServiceUtil.isEmailSent(existingUser);
            if(isEmailSent){
                existingUser.setIsMailSent(true);
                repository.save(existingUser);
                return ;
            }else{
                throw new EmailNotSentException("Something went wrong, please check email id once again! "+existingUser.getEmail());
            }
        }
        throw new EmailAlreadySentException("Email already sent to HR emailId :: "+existingUser.getEmail());
    }


}
