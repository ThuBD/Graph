CREATE DATABASE AppliTrees;

\c AppliTrees;

CREATE TABLE users (
  id serial,
  username text,
  password text,
  user_email text,
  user_address text,
  created_at text,
  total_applied smallint,
  date_firstapp text,
  jobs_id integer[]
)

CREATE TABLE jobs (
  id bigserial,
  company_name text,
  date_applied text,
  date_heard text,
  position text,
  location text,
  expected_salary integer,
  offered_salary integer,
  status text,
  position_description text,
  resume_or_cv text,
  cover_letter text,
  personal_rating DECIMAL(2,1),
  display boolean
)