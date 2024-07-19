CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    csw_products VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL
);

INSERT INTO products (csw_products, type, description, price, createdAt)
VALUES 
('Baguette Salad', 'Bread', 'Look small? But you cannot imagine how many ingredients it have. Jambon, carrot, corn, cabbage, cucumber and mayonnaise sauce.', 18000, '2023-12-28T02:40:20.435Z'),
('Sesame Baguette Salad', 'Bread', 'Go along with the soft sesame bread is ham, cheese and fresh lettuce and tomato.', 25000, '2023-12-28T02:40:51.121Z'),
('Sausage Danish', 'Bread', 'The crispy danish skin inside with chunky sausage and more extra flavor by chicken floss and mayonnaise sauce.', 25000, '2023-12-28T02:41:22.799Z'),
('Brioche Rolls (4ct)', 'Bread', 'Contains: Wheat four, eggs, butter, milk.', 30000, '2023-12-28T02:43:29.777Z'),
('Sausage Bun', 'Bread', 'Small size flavorful pizza with sausage, minced jambon and melted cheese.', 35000, '2023-12-28T02:44:07.786Z'),
('Cheesy Pork Floss', 'Bread', 'Fresh bread, combine with tasty floss and creamy slightly mayonnaise.', 40000, '2023-12-28T02:46:32.519Z'),
('Baguette', 'Bread', 'The golden baguette with crispy skin outside and moist inside.', 10000, '2023-12-28T02:47:38.887Z'),
('Apple Pie', 'Pastries', 'Indulge in the rich flavors of our Apple Pie with a perfect blend of wheat flour, luscious apple pie filling, and a tantalizing glaze. The golden crust and delightful ingredients make each bite a heavenly experience.', 19000, '2023-12-28T02:48:29.948Z'),
('Chocolate Bar Danish', 'Pastries', 'A perfect treat for chocolate lovers, this pastry promises a delightful blend of flaky pastry and rich chocolate flavor.', 29000, '2023-12-28T02:49:10.244Z'),
('Blueberry Mung Bean Bun', 'Pastries', 'The beautiful and sweet blueberry jam with soft and delicious mung bean bun is such a perfect two.', 31000, '2023-12-28T02:49:42.761Z');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, username, password) VALUES
('Ho Manh Quan', 'homanhquan1812', '12345678'),
('Sussyboy', '123', '123'),
('Vu Thi Minh', '1234', '1234'),
('Sussyboy2', '12345', '$2b$10$mcdn42mWMPB/s3Nq5mTaBOpCQoy70ByHo0zRzFbBIMpsBDeC9kdMO'),
('Hồ Mạnh Quân', '123456', '$2b$10$bXi.MfQEe2Jw/YXULkCq0.ZL96yESTIyEJl8QVMkIMID.Xn6.fSEi'),
('Vu Thi Minh1', '1234567', '$2b$10$f6zJblyYfLYrHYCaMTYVN.8r/570pcYk0LPNFBJZXXLGzMHqfOs32'),
('Sussyboy', '12345678', '$2b$10$z7Kevl9zn.mWtmi5IV.WwOc8ulHb1LahLE/OdYdMEdDH/pcX5Wqg6'),
('Hồ Mạnh Quân', '012', '$2b$10$gB.36nkpvgB0raKhSbGLP.7PTFI63sZxUgix2TDfH2l3F/5TPaPqu'),
('Hồ Mạnh Quân', '0123', '$2b$10$WSZXpDWzc4yB8d9sOjnSKe9b1/TRjILqpuG0.mBt3ETghjrY2dBZm'),
('Hồ Mạnh Quân', '01234', '$2b$10$DSVU0ZBP8skD7uykeLf.sO.mgSbSQOIn71arfTDTpt.CQgHZslmx2'),
('Hồ Mạnh Quân', '012345', '$2b$10$008T04Nx90nzhHjRfA5AhuUgI9tMtPJE.NhEvBqBBNfSK4a.c00Xe'),
('789', '789', '$2b$10$HNmlrFzoYpZ4./6NZvaNk.sOj5jYjeFJJcxKz5QDZqd3lXh5yXWsW'),
('789', '7890', '$2b$10$M3GGpm.T1cx1foj6wnNiXee8EoE7Nm9fFn3WDSkq7wxcwmd7AV8ji'),
('789', '78901', '$2b$10$t412slsE4urqduboXj15uO466wtoApGl61OhVzQ6mjnS.d95axvne'),
('789', '789012', '$2b$10$hcJwfVNbJaL/FxDZY9g3/OyJtYo34GghxE4ssa2Qbu0BDd9XkasKC'),
('123', '745', '$2b$10$MB6FBv6oBSa2umjcQjQw6.LVroonM78TOPi1Oslsg/LTBM6QE0RH2'),
('789', '7890127', '$2b$10$zidyik6mwpCvCcu8DzX21e1oz2J6GCShdUuti.p3fRsbY29leVSTy'),
('4534534', '537837', '$2b$10$HsTiI9ta1FgIl/sR8TnUK.o/shEW5/u6gk8O4JexRhu762xqZM1Fm'),
('123', '745537', '$2b$10$C882k/xsrUnjbKY9eIpq3eW7fjd/mQEVfcxRuNOBXn2sGhKynKrey');

