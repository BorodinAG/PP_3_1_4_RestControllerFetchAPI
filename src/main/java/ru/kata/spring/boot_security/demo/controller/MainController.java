package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class MainController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public MainController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    // загрузка главной страницы
    @GetMapping("/")
    public String welcomeUsers() {
        if (roleService.listRoles().isEmpty()) {
            roleService.addRole(new Role("ROLE_ADMIN"));
            roleService.addRole(new Role("ROLE_USER"));
        }
        if (userService.listUsers().isEmpty()) {
            userService.addUser(new User("admin@admin.ru", "100","Администратор", "Компьютерный", "admin@admin.ru", roleService.findRolesByRoleName("ROLE_ADMIN")));
            userService.addUser(new User("user@user.ru", "111","Ivan", "Ivanov", "user@user.ru", roleService.findRolesByRoleName("ROLE_USER")));

        }
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/logout")
    public String logout() {
        return "redirect:/index";
    }

    @GetMapping("/new")
    public String newUserPage(){return "newUser";}


    // загрузка личной страницы пользователя
    @GetMapping("/user")
    public String userPage(){return "user";}

    @GetMapping("/admin")
    public String adminPage(){return "admin";}
}
