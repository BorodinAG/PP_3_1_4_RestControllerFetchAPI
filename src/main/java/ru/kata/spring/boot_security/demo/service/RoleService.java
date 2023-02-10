package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class RoleService implements RoleServiceInterface {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> listRoles() {
        return roleRepository.findAll();
    }

    public void addRole(Role role) { roleRepository.save(role);}

    public Set<Role> findByRoleName(String roleName){
        return Collections.singleton(roleRepository.findByRoleName(roleName));
    }


    public Set<Role> findRolesByRoleName(String roleName) {
        Set<Role> roles = new HashSet<>();
        for (Role role : listRoles()) {
            if (roleName.contains(role.getRoleName()))
                roles.add(role);
        }
        return roles;
    }
}
