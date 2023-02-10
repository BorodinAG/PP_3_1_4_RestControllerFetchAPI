package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserServiceInterface {
    User getUser(long id);

    String userPassword(String password);

    void addUser(User user);

    List<User> listUsers();

    void deleteUser(long id);

    User findByUsername(String username);

}
