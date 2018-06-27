create table members (
    id serial PRIMARY key,
    auth_id VARCHAR(255),
    date_created VARCHAR(255),
    name VARCHAR(255),
    phone_home VARCHAR(255),
    phone_cell VARCHAR(255),
    email VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(2),
    zip INT,
    abana_bool varchar(255),
    abana_num varchar(255),
    referred_by VARCHAR(255),
    other VARCHAR(255),
    membership_age INT
);