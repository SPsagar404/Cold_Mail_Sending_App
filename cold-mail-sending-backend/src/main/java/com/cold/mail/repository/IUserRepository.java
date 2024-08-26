package com.cold.mail.repository;

import com.cold.mail.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {

    public User findByEmail(String email);

    public boolean existsByEmail(String email);
}
