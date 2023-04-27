-- Query to create the database.
-- WARNING: If the database already
-- exists it will be deleted and a new
-- one with sample data will be made.

DROP DATABASE scandiweb_test_task;

CREATE DATABASE scandiweb_test_task;

USE scandiweb_test_task;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  type VARCHAR(255) NOT NULL,
  weight DECIMAL(10,2),
  megabytes INT,
  width DECIMAL(10,2),
  depth DECIMAL(10,2),
  height DECIMAL(10,2)
);

INSERT INTO products (sku, name, price, type, weight, megabytes, width, depth, height)
VALUES 
    ('DVD001', 'DVD Movie', 10.99, 'DVD', NULL, 700, NULL, NULL, NULL),
    ('BOOK001', 'Book', 15.99, 'book', 1.5, NULL, NULL, NULL, NULL),
    ('FURN001', 'Table', 99.99, 'furniture', NULL, NULL, 28, 24, 24),
    ('DVD002', 'DVD TV Series', 29.99, 'DVD', NULL, 1400, NULL, NULL, NULL),
    ('BOOK002', 'Novel', 12.49, 'book', 1.2, NULL, NULL, NULL, NULL),
    ('FURN002', 'Chair', 49.99, 'furniture', NULL, NULL, 24, 22, 32),
    ('DVD003', 'DVD Documentary', 9.99, 'DVD', NULL, 900, NULL, NULL, NULL),
    ('BOOK003', 'Cookbook', 18.99, 'book', 2.0, NULL, NULL, NULL, NULL),
    ('FURN003', 'Sofa', 199.99, 'furniture', NULL, NULL, 78, 34, 32);
