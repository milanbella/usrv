create table if not exists kniznica 
(
  id varchar(50) not null,
  meno varchar(50),
  popis varchar(250),
  primary key (id)
);

create table if not exists student 
(
  id varchar(50) not null,
  meno varchar(50),
  priezvisko varchar(250),
  primary key (id)
);

create table if not exists kniha 
(
  id varchar(50) not null,
  titul varchar(50),
  popis varchar(250),
  primary key (id)
);

create table if not exists kniznica_student 
(
  id varchar(50) not null,
  kniznica_id varchar(50) not null,
  student_id varchar(50) not null,
  primary key (id),
  foreign key (kniznica_id) references kniznica (id),
  foreign key (student_id) references student (id),
  unique (kniznica_id, student_id)
);

create table if not exists kniznica_kniha 
(
  id varchar(50) not null,
  kniznica_id varchar(50) not null,
  kniha_id varchar(50) not null,
  primary key (id),
  foreign key (kniznica_id) references kniznica (id),
  foreign key (kniha_id) references kniha (id),
  unique (kniznica_id, kniha_id)
);

create table if not exists vypozicka
(
  id varchar (50) not null,
  kniznica_id varchar(50) not null,
  student_id varchar(50) not null,
  kniha_id varchar(50) not null,
  datum_vypozicky datetime not null,
  datum_vratenia datetime,
  primary key (id),
  foreign key (kniznica_id) references kniznica (id),
  foreign key (student_id) references student (id),
  foreign key (kniha_id) references kniha (id),
  unique (kniznica_id, student_id, kniha_id)
);

create table if not exists user
(
  username varchar (50) not null,
  email varchar(50) not null,
  heslo varchar(50) not null,
  student_id varchar(50),
  primary key (username),
  foreign key (student_id) references student (id)
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
  token varchar (10000) not null,
  created_at datetime not null,
  primary key (id),
  foreign key (user_username) references user (username),
  foreign key (application_id) references application (id)
);
