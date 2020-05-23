package com.artifactuprising.marketbackend.service;

import com.artifactuprising.marketbackend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserDao userDao;

    @Autowired
    public UserService(final UserDao userDao) {
        this.userDao = userDao;
    }

    public boolean isUserIdExist(final String userId) {
        return userDao.existsById(userId);
    }
}
