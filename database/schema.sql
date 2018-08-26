CREATE DATABASE appcounts;

\c appcounts;

CREATE TABLE users (
  id serial,
  username text,
  password text,
  user_email text,
  user_address text,
  created_at text,
  date_firstapp text
);

CREATE TABLE jobs (
  id bigserial,
  user_id integer,
  company_name text,
  date_applied text,
  date_heard text,
  position text,
  location text,
  expected_salary text,
  offered_salary text,
  status text,
  position_description text,
  resume_or_cv text,
  cover_letter text,
  personal_rating DECIMAL(2,1)
);