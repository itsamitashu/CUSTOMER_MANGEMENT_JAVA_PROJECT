package com.example.customermanagement.service;

import com.example.customermanagement.entity.Customer;
import com.example.customermanagement.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Customer addCustomer(Customer customer) {
        return repository.save(customer);
    }

    // READ
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    // UPDATE
    public Customer updateCustomer(Long id, Customer customer) {
        Customer existingCustomer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        existingCustomer.setName(customer.getName());
        existingCustomer.setAddress(customer.getAddress());

        return repository.save(existingCustomer);
    }

    // DELETE
    public void deleteCustomer(Long id) {
        repository.deleteById(id);
    }
}
