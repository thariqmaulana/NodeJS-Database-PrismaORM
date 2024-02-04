create table sample(
  id varchar(100) not null,
  name varchar(100) not null,
  primary key (id)
) engine = innodb;

create table customers(
  id varchar(100) not null,
  name varchar(100) not null,
  email varchar(100) not null,
  phone varchar(100) not null,
  primary key (id),
  constraint customers_email_unique unique (email),
  constraint customers_phone_unique unique (phone)
) engine = innodb;

model Customer {
  id String @id
  name String
  email String @unique
  phone String @unique

  @@map("customers")
}

create table products(
  id varchar(100) not null,
  name varchar(100) not null,
  price int not null,
  stock int not null,
  category varchar(100) not null,
  primary key (id)
) engine = innodb;

insert into products(id, name, price, stock, category)
values ('P0001', 'A', 1000, 100, 'K1'),
       ('P0002', 'B', 2000, 200, 'K1'),
       ('P0003', 'C', 3000, 300, 'K1'),
       ('P0004', 'D', 4000, 400, 'K1'),
       ('P0005', 'E', 5000, 500, 'K1');

insert into products(id, name, price, stock, category)
values ('P0006', 'F', 6000, 600, 'K2'),
       ('P0007', 'G', 7000, 700, 'K2'),
       ('P0008', 'H', 8000, 800, 'K2'),
       ('P0009', 'I', 9000, 900, 'K2'),
       ('P0010', 'J', 10000, 1000, 'K2');

create table categories(
  id int not null auto_increment,
  name varchar(100) not null,
  primary key (id)
) engine = innodb;

create table wallet(
  id varchar(100) not null,
  balance int not null,
  customer_id varchar(100) not null,
  primary key (id),
  constraint wallet_customer_id_fk foreign key (customer_id) references customers(id),
  constraint wallet_customer_id_unique unique (customer_id)
)engine = innodb;

create table comments(
  id int not null auto_increment,
  customer_id varchar(100) not null,
  title varchar(100) not null,
  description text,
  primary key (id),
  constraint comments_customer_id_fk foreign key (customer_id) references customers(id)
) engine = innodb

insert into comments (customer_id, title, description)
values ("thariq", "Comment 1", "Sample comment 1"),
       ("thariq", "Comment 2", "Sample comment 2"),
       ("ahmad", "Comment 1", "Sample comment 3"),
       ("ahmad", "Comment 2", "Sample comment 4");

create table likes(
  customer_id varchar(100) not null,
  product_id varchar(100) not null,
  primary key (customer_id, product_id),
  constraint likes_customer_id_fk foreign key (customer_id) references customers(id),
  constraint likes_product_id_fk foreign key (product_id) references products(id)
) engine = innodb; 

create table _loves(
  A varchar(100) not null,
  B varchar(100) not null,
  primary key (A, B),
  constraint customer_loves_fk foreign key (A) references customers(id),
  constraint product_loves_fk foreign key (B) references products(id)
) engine = innodb;

create database belajar_nodejs_prisma;

use belajar_nodejs_prisma;