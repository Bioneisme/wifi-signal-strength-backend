CREATE TABLE IF NOT EXISTS public.wifi
(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    bssid character varying(255) NOT NULL,
    distance float NOT NULL,
    level integer NOT NULL,
    security character varying(255) NOT NULL,
    frequency float NOT NULL,
    lat float NOT NULL,
    lng float NOT NULL,
    accuracy float NOT NULL,
    city character varying(50) NOT NULL,
    zipcode character varying(50) NOT NULL,
    street_name character varying(100) NOT NULL,
    street_number character varying(50) NOT NULL,
    country_code character varying(10) NOT NULL,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL,
    CONSTRAINT user_fk FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID
);

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL PRIMARY KEY,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL,
);