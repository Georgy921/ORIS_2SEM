--
-- PostgreSQL database dump
--

\restrict V1KkXrzC4ai9XMAKrAHjcuwcjsjRivg8hM5YzW636kCFKUEslSa0PPnpBwgHANU

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2026-05-07 09:23:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 213200)
-- Name: tours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tours (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    arrival_city character varying(100) NOT NULL,
    departure_city character varying NOT NULL,
    departure_date character varying NOT NULL,
    nights_count integer NOT NULL,
    adults_count integer NOT NULL,
    tour_price numeric(10,2) NOT NULL,
    image_url character varying(500),
    bonus integer NOT NULL,
    wifi character varying(100),
    distance_to_airport integer,
    general_description text,
    has_kids_club boolean,
    hotel_name character varying(255),
    has_aquapark boolean,
    has_spa boolean,
    room_type character varying(50),
    popular_filters character varying(50),
    region character varying(50),
    rating integer DEFAULT 5,
    meal_plan character varying(50) DEFAULT 'all-inclusive'::character varying,
    CONSTRAINT tours_adults_count_check CHECK ((adults_count > 0)),
    CONSTRAINT tours_bonus_check CHECK ((bonus > 0)),
    CONSTRAINT tours_nights_count_check CHECK ((nights_count > 0)),
    CONSTRAINT tours_rating_check CHECK (((rating >= 1) AND (rating <= 5))),
    CONSTRAINT tours_tour_price_check CHECK ((tour_price >= (0)::numeric))
);


ALTER TABLE public.tours OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 213199)
-- Name: tours_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tours_id_seq OWNER TO postgres;

--
-- TOC entry 5020 (class 0 OID 0)
-- Dependencies: 219
-- Name: tours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;


--
-- TOC entry 4856 (class 2604 OID 213203)
-- Name: tours id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);


--
-- TOC entry 5014 (class 0 OID 213200)
-- Dependencies: 220
-- Data for Name: tours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tours (id, name, arrival_city, departure_city, departure_date, nights_count, adults_count, tour_price, image_url, bonus, wifi, distance_to_airport, general_description, has_kids_club, hotel_name, has_aquapark, has_spa, room_type, popular_filters, region, rating, meal_plan) FROM stdin;
1	TUI MAGIC LIFE Jacaranda	Аланья	Казань	5 мар.	7	5	124320.00	https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-bd2c-08d982ab9707/MainPhoto-Source-okd3c5uc.jpg	2486	Wi-Fi в общественных местах (бесплатно)	50	Курортный отель через дорогу от пляжа. Отлично подходит для семейного отдыха. Предлагает своим гостям разнообразное питание и большой выбор развлечений. На территории есть несколько бассейнов, водные горки, работают детский клуб и SPA-салон.	t	TUI MAgis	t	t	Апартаменты	all-inclusive	Турция	5	ultra-all
2	Corendon Playa Kemer	Кемер	Москва	5 мар.	7	4	147168.00	https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-8973-08d982ca6c7d/MainPhoto-Source-tl23t02b.jpg	2943	Wi-Fi в номерах	50	Курортный отель в живописном уединенном месте на берегу моря. Отлично подойдет для отдыха вдвоем или семьей. На территории есть бассейны с водными горками, детский клуб, SPA-центр. К услугам гостей несколько ресторанов и баров.\r\n\r\nОбщая площадь территории: 20 000 кв. м.\r\n\r\nПоследняя реновация: 2021 г.	t	Corendor	f	t	3-x комнатные	first-line	Турция	5	ultra
3	EFdmii hotrer	Кемер	Казань	12 мар.	7	3	86496.00	https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00180000-ac11-0242-c6c2-08d993975bea/MainPhoto-Source-iw2vom4j.jpg	1729	Wi-Fi в общественных местах и в номерах (бесплатно)	500	Небольшой уютный отель в Кемере. Месторасположение отеля позволяет насладиться не только морем и солнцем, а еще и прогулками в прибрежном национальном парке Бейдаглары. К услугам гостей компактные номера, ресторан, бар у бассейна, открытый бассейн и бесплатный Wi-Fi на всей территории отеля. Рекомендуется для бюджетного отдыха.\r\n\r\n\r\n	f	ajajra cuju	t	t	2-у местная палатка	wi-fi	Турция	3	ultra-all
4	Lika Hotel	Стамбул	Новосибирск	31 мая.	14	2	55008.00	https://apigate-tui.fstravel.com/api/geocontent/static/Hotel/00210000-ac11-0242-e95d-08d982eaed3a/MainPhoto-Source-njc0m4qt.jpg	1100	Wi-Fi на всей територии	50	Отель Lika находится в стамбульском районе Фатих и располагает номерами с кондиционером, телевизором с плоским экраном и спутниковыми каналами.В распоряжении гостей круглосуточная стойка регистрации, общий лаундж и пункт обмена валюты. Гости отеля могут исследовать древние памятники и достопримечательности и ощутить настоящее турецкое гостеприимство. Для незабываемого отдыха в Стамбуле отель Lika - идеальный выбор. Отель построен в 2005 г. Последняя реновация прошла в 2019 году.\r\n\r\n\r\n	t	LIkaLiaks	t	f	сухой подвал	wi-fi	Турция	2	pansion
5	Sunis Family Resort & Spa	Анталья	Москва	12 апр.	10	2	98450.00	https://example.com/hotels/sunis-family.jpg	1969	Бесплатный Wi-Fi на всей территории	45	Современный семейный отель в сосновом бору, в 300 метрах от песчаного пляжа. Идеален для отдыха с детьми: собственный аквапарк, мини-зоопарк, анимация на русском языке. 5 ресторанов с международной и турецкой кухней, крытый подогреваемый бассейн, фитнес-центр.\r\n\r\nПлощадь территории: 35 000 кв. м.\r\n\r\nПоследняя реновация: 2023 г.	t	Sunis Family Resort	t	t	Стандартный номер с видом на сад	family-friendly,all-inclusive	Турция	5	all-inclusive
6	Gorky Gorod Mountain Lodge	Сочи	Санкт-Петербург	15 янв.	5	2	67890.00	https://example.com/hotels/gorky-lodge.jpg	1358	Wi-Fi в лобби и номерах	2	Уютный апарт-отель у подножия горнолыжного курорта «Горки Город». Прямой доступ к трассам, прокат снаряжения на территории, баня с панорамными окнами. Вечером — каминный зал, ресторан кавказской кухни и живая музыка.\r\n\r\nПлощадь территории: 8 500 кв. м.\r\n\r\nПоследняя реновация: 2022 г.	f	Gorky Gorod Lodge	f	t	Студия с кухней и балконом	ski-in/ski-out,mountain-view	Россия	5	ultra
7	Prague Heritage Boutique	Прага	Москва	3 мая	4	2	54320.00	https://example.com/hotels/prague-heritage.jpg	1086	Бесплатный высокоскоростной Wi-Fi	15	Бутик-отель в историческом здании XVIII века в самом центре Праги, в 5 минутах ходьбы от Карлова моста. Номера оформлены в классическом стиле с современными удобствами. На крыше — терраса с видом на Пражский Град. Завтраки подаются в старинном погребе с каменными сводами.\r\n\r\nПлощадь территории: 1 200 кв. м.\r\n\r\nПоследняя реновация: 2024 г.	f	Heritage Boutique Prague	f	t	Делюкс с видом на улицу	city-center,historic-building	Чехия	5	ultra-all
8	Andaman Breeze Resort	Пхукет	Москва	20 ноя.	12	3	189750.00	https://example.com/hotels/andaman-breeze.jpg	3795	Wi-Fi в общественных зонах	25	Тропический курорт на берегу Андаманского моря с собственным пляжем из белого песка. Виллы с частными бассейнами, спа-салон в тайском стиле, школа дайвинга. 3 ресторана: тайская, европейская и морская кухня. Ежедневные шоу и мастер-классы по тайской кухне.\r\n\r\nПлощадь территории: 45 000 кв. м.\r\n\r\nПоследняя реновация: 2023 г.	t	Andaman Breeze	f	t	Вилла с приватным бассейном	beachfront,romantic	Таиланд	5	all-inclusive
9	Red Sea Coral Paradise	Шарм-эль-Шейх	Екатеринбург	8 фев.	8	2	76200.00	https://example.com/hotels/coral-paradise.jpg	1524	Wi-Fi в номерах (бесплатно)	10	Отель на первой береговой линии с выходом к коралловому рифу — идеальное место для сноркелинга и дайвинга. Собственный дайв-центр с инструкторами PADI, подогреваемый бассейн с морской водой, восточный хаммам. 4 бара, включая пляжный и у бассейна.\r\n\r\nПлощадь территории: 28 000 кв. м.\r\n\r\nПоследняя реновация: 2022 г.	f	Coral Paradise Resort	t	t	Стандарт с видом на море	first-line,diving	Египет	5	ultra-all-inclusive
\.


--
-- TOC entry 5021 (class 0 OID 0)
-- Dependencies: 219
-- Name: tours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tours_id_seq', 9, true);


--
-- TOC entry 4865 (class 2606 OID 213223)
-- Name: tours tours_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);


-- Completed on 2026-05-07 09:23:40

--
-- PostgreSQL database dump complete
--

\unrestrict V1KkXrzC4ai9XMAKrAHjcuwcjsjRivg8hM5YzW636kCFKUEslSa0PPnpBwgHANU

