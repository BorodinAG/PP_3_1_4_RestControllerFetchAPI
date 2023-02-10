package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleServiceInterface {

    List<Role> listRoles();

    void addRole(Role role);

    Set<Role> findRolesByRoleName(String roleName);

}
