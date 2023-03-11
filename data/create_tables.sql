create table if not exists user
(
  username varchar (50) not null,
  email varchar(50) not null,
  heslo varchar(50) not null,
  primary key (username)
);

create table if not exists application
(
  id varchar (50) not null,
  name varchar(50) not null,
  description varchar(200) not null,
  primary key (id),
  unique(name)
);

create table if not exists token
(
  id varchar (50) not null,
  user_username varchar (50) not null,
  application_id varchar (50) not null,
  device_id varchar (50) not null,
  token varchar (10000) not null,
  created_at datetime not null,
  primary key (id),
  foreign key (user_username) references user (username),
  foreign key (application_id) references application (id)
);
