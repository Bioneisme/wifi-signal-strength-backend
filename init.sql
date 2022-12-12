CREATE TABLE IF NOT EXISTS public.wifi
(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    bssid character varying(255) NOT NULL,
    distance float NOT NULL,
    level integer NOT NULL,
    security character varying(255) NOT NULL,
    frequency integer NOT NULL,
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

CREATE TABLE IF NOT EXISTS public.test
(
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    created_at character varying(50) NOT NULL,
    updated_at character varying(50) NOT NULL
);

INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (1, 'ФАДЛИЕВ ХАБИБ АЙДИКБЕКОВИЧ', '77000000041', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (2, 'АБДИХАДИРОВ АКЫЛ КАНАЛОВИЧ', '77000000068', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (3, 'АРТЫКБАЕВ САБИТ АЙТБАЕВИЧ', '77000000075', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (4, 'ЖУМАГАЛИЕВА ЖАННА БОЛАТОВНА', '77000000121', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (5, 'ҚАЙРАТ АРМАН', '77000000127', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (6, 'КУЛБАЕВ ЕРБОЛ САРСЕНБЕКОВИЧ', '77000000200', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (7, 'ТУНГАТАРОВА АЛЕСЯ АЗАТБЕКОВНА', '77000000230', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (8, 'БАРАҚБАЕВ БАУЫРЖАН ҚАНАТБЕКҰЛЫ', '77000000404', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (9, 'АЛДАБЕРГЕН ДАСТАН БАҚЫТЖАНҰЛЫ', '77000000510', 0, 0);
INSERT INTO public.test(id, name, phone, created_at, updated_at) VALUES (10, 'ЖАРТЫБАЕВА АНАРГУЛЬ КАЙРАТОВНА', '77000000783', 0, 0);