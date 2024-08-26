package com.cold.mail.controller;

import com.cold.mail.modal.User;
import com.cold.mail.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        boolean isCreated = userService.createUser(user);
        if (isCreated) {
            return new ResponseEntity<>("User created successfully.", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User creation failed.", HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        boolean isUpdated = userService.updateUser(id, user);
        if (isUpdated) {
            return new ResponseEntity<>("User updated successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("User update failed.", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>("User deleted successfully.", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{id}/send-email")
    public ResponseEntity<String> sendEmailToHr(@PathVariable Long id) {
        userService.sendEmailToHr(id);
        return new ResponseEntity<>("Email sent successfully to HR.", HttpStatus.OK);
    }

}
