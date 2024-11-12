SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '9cbf9c5e-adaa-481d-ac98-d2a4982b9d63', '{"action":"user_confirmation_requested","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2024-11-10 20:11:04.725547+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cafcd4c-e605-4c61-b33d-69dd4100d3cf', '{"action":"user_signedup","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"team"}', '2024-11-10 20:16:04.847364+00', ''),
	('00000000-0000-0000-0000-000000000000', '5c48529a-beba-4960-a82b-ef78adfac4cc', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:16:11.278687+00', ''),
	('00000000-0000-0000-0000-000000000000', '331a3bb8-0174-4043-925e-80e313b58130', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:20:14.623958+00', ''),
	('00000000-0000-0000-0000-000000000000', '81f2f050-2bf9-492d-ba61-704b92382822', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:18.295761+00', ''),
	('00000000-0000-0000-0000-000000000000', '8410bf03-c5ac-4c7c-94a3-f08625e7bf69', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:24:20.270228+00', ''),
	('00000000-0000-0000-0000-000000000000', '2122c324-82f2-4060-abde-fe883c487748', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:21.005625+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f93f0ae4-57d2-4aba-91df-7fcab2b8890c', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:24:22.807876+00', ''),
	('00000000-0000-0000-0000-000000000000', '426bb033-adfd-4f3b-b447-cfea93fc1158', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:23.728893+00', ''),
	('00000000-0000-0000-0000-000000000000', '49924093-912b-4c47-94e6-bdbf06f91d90', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:24:26.736794+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9f130ca-5c45-4acc-9864-fc409cb86d4f', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:27.670275+00', ''),
	('00000000-0000-0000-0000-000000000000', '9cfb9a2b-6567-49ea-ad34-2c2ea5139570', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:24:46.717899+00', ''),
	('00000000-0000-0000-0000-000000000000', '85cd3f38-1bf8-4c8d-9a17-9bfeb37a8e2a', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:47.886671+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc7063a8-e785-42c5-8f21-282755319cc2', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:24:50.009578+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa0fc8a2-0f28-42cb-9393-c4b47b758c4f', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:24:50.740151+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df2f0629-05f5-44b4-aac8-9e792730f794', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:39:59.385677+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e635c97-3b6a-4354-9d4c-595995347c69', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:40:00.415497+00', ''),
	('00000000-0000-0000-0000-000000000000', '42199382-81c7-4a50-9372-169c6f9f189c', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:41:02.195346+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae6071b4-45da-4118-9202-41a61d9dd823', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:41:03.070258+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e42072cc-455c-40ba-9ae6-4bb0e250f555', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:47:27.154969+00', ''),
	('00000000-0000-0000-0000-000000000000', '4077339b-6575-4219-b2b4-edac4cfcbe9a', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:47:28.526861+00', ''),
	('00000000-0000-0000-0000-000000000000', '6acf3414-a27b-4b54-8c37-efa0a02f7b2a', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 20:49:50.314946+00', ''),
	('00000000-0000-0000-0000-000000000000', '7245eaf2-cb7d-4874-92b5-41d3ef5b51e8', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 20:49:51.522755+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd64218e3-89b0-4ecd-bc0e-901a74f31043', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 21:11:57.989798+00', ''),
	('00000000-0000-0000-0000-000000000000', '5bcc3073-39c8-4fbf-8f46-2021ac1fe1dc', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 21:15:43.862652+00', ''),
	('00000000-0000-0000-0000-000000000000', '2027b03b-c7bc-4804-8e31-0d3bbc68f606', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 21:19:03.468481+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbf66963-3cdb-485a-82cd-6187ce2b6e6b', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 21:19:04.519919+00', ''),
	('00000000-0000-0000-0000-000000000000', '303a245f-82bf-44e4-8439-81cdd682407a', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 21:19:06.742728+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e9273e3-573d-4f78-b581-4ac83319affd', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 21:19:07.457428+00', ''),
	('00000000-0000-0000-0000-000000000000', '082107f6-7ad3-42c6-b2b1-dcf0fc45d873', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 21:34:18.514167+00', ''),
	('00000000-0000-0000-0000-000000000000', '4de8bff1-3d64-482e-aaa6-198f9bc36e5c', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:25:53.438452+00', ''),
	('00000000-0000-0000-0000-000000000000', 'be4c2770-da70-4cf9-bfa5-67285f283025', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:25:56.253104+00', ''),
	('00000000-0000-0000-0000-000000000000', '2275203f-0879-4b49-beca-d4f8e61f99a7', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:28:02.92489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6c79a1b-d668-40e8-96eb-3ac6202b932b', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:28:04.798591+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a5328f6d-0cf1-4423-b5f8-0b27beb88bf9', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:30:06.770789+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5f85d00-7c00-4f1c-a302-e4906f274ab0', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:30:09.078769+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b62a382a-f6b3-4291-a97c-db9d05ca06a6', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:30:54.173555+00', ''),
	('00000000-0000-0000-0000-000000000000', '52a2d7e7-78e7-47c5-b846-789ac73a1d94', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:30:56.178344+00', ''),
	('00000000-0000-0000-0000-000000000000', '6c5575fb-d29c-448f-983f-8ad2b22666b8', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:31:26.302806+00', ''),
	('00000000-0000-0000-0000-000000000000', '238c7c22-5e96-4c44-855a-b0972c75692c', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:31:27.978363+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dee513ec-e62b-499c-97af-e879ef100745', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:32:53.917165+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dc17e493-15d4-482f-861a-e2e64f7906fa', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:32:55.585966+00', ''),
	('00000000-0000-0000-0000-000000000000', '5183a410-2da4-4089-bb3a-35187354fb1e', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","user_phone":""}}', '2024-11-10 22:32:55.663968+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f5517b8-6692-4fac-921a-f1f46bb3ad7e', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:33:34.335474+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c19188b5-5990-46a0-bebd-06c20ef9f031', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:33:36.42494+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd08aaa53-7c39-4995-a72d-fe62b5d08493', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:34:34.326033+00', ''),
	('00000000-0000-0000-0000-000000000000', '80bdd2ec-2eec-48ea-bd6f-e0431bd3ecf2', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:34:49.532683+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e357fe3f-d936-44f7-96f8-5c9d125c44fc', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","user_phone":""}}', '2024-11-10 22:34:49.575987+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8483de5-0616-47c8-a965-426cfb1b0889', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:34:49.586806+00', ''),
	('00000000-0000-0000-0000-000000000000', '116b8309-66f8-4d4f-8234-ab2eb2dc6452', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:34:49.649743+00', ''),
	('00000000-0000-0000-0000-000000000000', '274de2c5-3625-4bcb-b039-4a4643ae3aff', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:38:16.722184+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e2e4ced-4bfd-40e1-b67e-813c0665c773', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:38:19.589662+00', ''),
	('00000000-0000-0000-0000-000000000000', '51666576-8127-4883-9159-a764298dd14b', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","user_phone":""}}', '2024-11-10 22:38:19.675613+00', ''),
	('00000000-0000-0000-0000-000000000000', '18406579-99fc-4402-bf4c-d5ca079b6fbc', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-10 22:38:19.697596+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c72ae6eb-68cd-4bb3-82ae-f567bfdbc1cd', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-10 22:38:19.697794+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b762d4f9-840a-429a-95f4-00ba30c399bf', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:40:14.336784+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ad09d71-dd20-4af6-a180-0d9502d7b718', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:40:16.69718+00', ''),
	('00000000-0000-0000-0000-000000000000', '12b76388-a7c4-4018-9dcd-285f8b4c6323', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:40:28.686738+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1be28da-00b8-4c6e-a31c-7f24aa80c909', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:40:36.919068+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b9d110d-856d-4000-b32e-05127f503668', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 22:45:10.633464+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aee5806e-3f82-42ee-9072-ea60d743cad3', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 22:45:12.838722+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ddc19b6a-a21d-4d1a-84ec-34d6c6198749', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-10 23:47:00.735408+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e370cf9-40b9-4695-a16a-5a5590f788dc', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-10 23:47:00.736292+00', ''),
	('00000000-0000-0000-0000-000000000000', '915c707e-ffdd-4212-bb13-e016c363e863', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-10 23:47:02.783114+00', ''),
	('00000000-0000-0000-0000-000000000000', '642cab22-33d7-4c26-9342-6aa5d13785c0', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:47:02.79352+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7b489db-de1f-46bc-971d-d73c96cd4d57', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 23:47:05.928069+00', ''),
	('00000000-0000-0000-0000-000000000000', '0fef7089-526a-4610-b7a2-829a1929c2d5', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:47:09.023286+00', ''),
	('00000000-0000-0000-0000-000000000000', '165e5dde-8ed2-4841-86f5-9d105cc44175', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 23:47:31.32474+00', ''),
	('00000000-0000-0000-0000-000000000000', '1030a9e3-68d3-4040-9a10-5f51f3ad59c2', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:47:56.122052+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c36a3dc8-7f3e-4b05-9767-5a6ddbe64d6c', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 23:48:34.878375+00', ''),
	('00000000-0000-0000-0000-000000000000', 'caf93aeb-da3d-44e5-ae15-f8f1f2bde829', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:49:54.755434+00', ''),
	('00000000-0000-0000-0000-000000000000', '356f7d8d-9652-48bb-a528-f2d178c3ea6e', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 23:50:11.177291+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d7dc6d0-1d90-47ee-b75d-fedc8126d161', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:50:15.457583+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f897cb31-10f2-46bb-8d0b-454a8c570a8a', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-10 23:52:40.576935+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed7b8257-cc32-4c87-83e8-dbb152f0bea6', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-10 23:52:44.392237+00', ''),
	('00000000-0000-0000-0000-000000000000', '072120da-516f-477c-9b3f-2a0f73855ced', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 00:04:29.186276+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f264cd73-d301-4cf9-9562-57279008e1eb', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 01:01:02.645813+00', ''),
	('00000000-0000-0000-0000-000000000000', '687d7b58-d2f7-43ea-bee3-ede827257469', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 01:01:06.15039+00', ''),
	('00000000-0000-0000-0000-000000000000', '136103d5-092e-4189-bd68-21b03b6fbc1d', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:02:31.288238+00', ''),
	('00000000-0000-0000-0000-000000000000', '28749b97-bbe8-4781-9f72-4cb0d9a0936f', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:02:31.299633+00', ''),
	('00000000-0000-0000-0000-000000000000', '9795530f-0a95-4191-be40-13b44d892b8b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:02:31.34744+00', ''),
	('00000000-0000-0000-0000-000000000000', '322d9d32-aab0-4b94-8f5f-965a294a6a94', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:06:50.708037+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba1e0654-2b5d-4263-ae1a-7863533f7054', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:06:54.38759+00', ''),
	('00000000-0000-0000-0000-000000000000', '7033e30f-4820-4205-b64a-7b5b537bda44', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:48.27895+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f2c619a-9bf4-45b4-8f25-e079160ff65d', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:49.217695+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ed4f2f6-6768-44cf-a6ed-ac14fc4a3db0', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:50.135825+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ba7c28e2-516a-4cc5-84e1-66eae18fd8e3', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:50.943916+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca7fb6c9-3b25-4082-b393-4abf5bf78cd3', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:51.473955+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3c6b963-849c-4f34-9780-83d74765fd02', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:52.600587+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f9966a6-9d5e-436f-be96-e2e7b29570fa', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:53.560897+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f782a74-9b2d-48e6-bde2-358b892d433a', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:56.908096+00', ''),
	('00000000-0000-0000-0000-000000000000', '642a0821-191b-47de-9237-1a015e8e556e', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:57.352816+00', ''),
	('00000000-0000-0000-0000-000000000000', '6986f11f-15aa-4820-b8fc-99dddef83f12', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:07:58.467069+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c5e3f89-412c-492c-8992-259dbd3de752', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:07.320608+00', ''),
	('00000000-0000-0000-0000-000000000000', '18208fa8-04e4-4c33-96d5-a036a9898a9b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:07.982603+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ce680db-9514-4c74-91cc-99ca2bc87ee7', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:08.714603+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b8a35ec2-95ee-4675-a9d4-fa6a65fea472', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:09.628137+00', ''),
	('00000000-0000-0000-0000-000000000000', '816cc44c-ac50-4755-955d-7fee713195e5', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:10.316827+00', ''),
	('00000000-0000-0000-0000-000000000000', '90040323-a124-42bc-a6e3-c0ee7a571512', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:10.966678+00', ''),
	('00000000-0000-0000-0000-000000000000', '919968c1-773c-42ed-aeac-da4699cd290b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:08:35.438124+00', ''),
	('00000000-0000-0000-0000-000000000000', '17ce3522-0b7b-4c7d-9ff4-3c97ae81bf3b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:14:21.132078+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f736f7bb-16ff-4105-a7a3-092eff5a7f14', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:14:26.49654+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f73ec0bc-b2d8-4bc0-93b9-9209a6bcdec9', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:15:43.658496+00', ''),
	('00000000-0000-0000-0000-000000000000', '95d70c20-a2ec-476f-81c4-8ecb5760144e', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:19:55.836526+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb141b34-26b9-4517-8e6a-e0cae4f8e374', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:20:04.654765+00', ''),
	('00000000-0000-0000-0000-000000000000', '3103a115-971d-47f7-909d-5af03cf1087b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:20:26.37463+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ab6ecfe-bab0-4dbe-bf7b-e0998cd61806', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:20:35.027138+00', ''),
	('00000000-0000-0000-0000-000000000000', '4714bc36-58b8-474c-a567-18e6edb48e39', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:20:38.999481+00', ''),
	('00000000-0000-0000-0000-000000000000', '7f647deb-5b94-4378-98cc-1c41d381b7c3', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:20:51.700427+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f35d916d-0497-41b6-b534-e5400cfad43a', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:21:28.64828+00', ''),
	('00000000-0000-0000-0000-000000000000', '1c0874bf-3ef5-41a7-b90c-38400fe2e487', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:23:22.644127+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7d56768-83f4-4199-9099-2bd883dac241', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:25:46.717246+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7de75c1-3a49-4d7e-abeb-725aa8a8c965', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:26:37.469166+00', ''),
	('00000000-0000-0000-0000-000000000000', '63e7f1ee-91e0-4617-b71d-1ceb26394a98', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 02:27:54.266144+00', ''),
	('00000000-0000-0000-0000-000000000000', '64ee5f42-1843-417b-a776-6bef82828e03', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 02:27:54.304501+00', ''),
	('00000000-0000-0000-0000-000000000000', '4eb12808-519f-4551-a569-eceff9916f6f', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 02:28:13.437261+00', ''),
	('00000000-0000-0000-0000-000000000000', '610c0944-4784-4661-b047-88d7234e0881', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 02:28:24.589817+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf107ddf-13f3-4b75-8c82-59123474eea8', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 02:28:31.779378+00', ''),
	('00000000-0000-0000-0000-000000000000', '76e11f93-39b4-4267-a7a1-637f507fbb37', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 02:30:35.066436+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a94be541-ad7e-46a1-bc94-8ae7b9a43e28', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 02:30:37.152243+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d55896d-89ab-492d-bf33-0445209e840f', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 03:53:04.290914+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4604f38-7e24-40eb-b809-8a734dc5ceaf', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 03:53:04.291654+00', ''),
	('00000000-0000-0000-0000-000000000000', '7818d22d-8cd7-42a5-a8e1-8d0e6a156e5d', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 03:53:04.828513+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd7af46fa-7710-43f7-bccf-e5fdeeaf78a7', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 03:59:50.345021+00', ''),
	('00000000-0000-0000-0000-000000000000', '93269030-0c45-46c6-8c67-d09c72339301', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 03:59:52.328736+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a7e90448-58ab-4f2d-8872-9c681650f321', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 04:11:43.040991+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f50f25e-f5c6-4744-bdb4-d8865a6a8cce', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 04:12:32.205602+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b704b57-adbe-40d4-9072-34c494ede9f1', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 04:12:33.956228+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ef94f881-e3c6-4a29-a137-2f891b3dfd91', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","user_phone":""}}', '2024-11-11 04:12:34.026147+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d1b1ba0-b609-4e11-8991-1f84067abfb4', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 04:12:34.037503+00', ''),
	('00000000-0000-0000-0000-000000000000', '60940636-ba0e-4a3a-bc59-fc14dcc2b660', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 04:12:34.037618+00', ''),
	('00000000-0000-0000-0000-000000000000', '9620e3e1-b09a-4072-9ff6-855eee4d92ed', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.080651+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e59c23b-9755-4b68-b845-da705eb3b350', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.081146+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e9e0e273-1977-4511-bc79-4bf3f9034ee5', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.121151+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce6f5ad3-61ef-4b57-bc52-be5a05978b9b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.138647+00', ''),
	('00000000-0000-0000-0000-000000000000', '0dbcae30-5fcd-4dd9-983f-75b3edbc79f3', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.147104+00', ''),
	('00000000-0000-0000-0000-000000000000', '66b9d611-6683-4fcf-aa7d-215e48cfb593', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.151292+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2a3599f-28d2-4112-ae6c-9131adaf6268', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.155227+00', ''),
	('00000000-0000-0000-0000-000000000000', '03b203fb-622c-4d9b-9935-42be9a2c2c02', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.160503+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5d656c2-e730-4eec-8da2-a22082959c4e', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.16751+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab6b439b-3735-4c51-9972-30d920034839', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:55.177566+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e28f734-b3af-40b3-97cc-f42845404a51', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:59.51718+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7e094cc-eaf0-4eb6-bd08-85bec022f288', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:59.533052+00', ''),
	('00000000-0000-0000-0000-000000000000', 'faeb1e9e-36ae-4367-a7d0-5b5756920b89', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:12:59.558248+00', ''),
	('00000000-0000-0000-0000-000000000000', '56e04bcd-1313-465c-a4c8-a6b4acdfb8fc', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:02.340747+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b72f1212-7953-4205-9de7-4702252f1613', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:02.355044+00', ''),
	('00000000-0000-0000-0000-000000000000', '4138126c-8247-42ee-9530-ed9805b81014', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:02.375515+00', ''),
	('00000000-0000-0000-0000-000000000000', '12e97622-c91a-49c0-8869-41b05ebb6fdc', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:17.642192+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c024ec49-865a-4ed1-8ab4-74572ef667b7', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:18.175847+00', ''),
	('00000000-0000-0000-0000-000000000000', '8dff4c80-796f-4d76-a9ed-a7e266750139', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:21.19747+00', ''),
	('00000000-0000-0000-0000-000000000000', '81bd75dc-f469-4d4f-9f7e-75f55153a3be', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:21.210008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e38a2681-56ab-4596-aaf0-8544b520902d', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:21.220919+00', ''),
	('00000000-0000-0000-0000-000000000000', '47a645f4-9155-4bf7-a7fd-175f04a40dc3', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:25.36502+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd26ddefb-e6d1-4ff8-a988-e6747ab9d0f1', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:35.211933+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca07fd38-b0c0-4cf4-9a5a-e6eb4c9b66a0', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:35.233191+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ebaea793-1af8-4ed3-86d8-9ae0790e01ff', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:13:35.267602+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7019317-e9f6-47c1-b965-4eb58f0a878c', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:16.978444+00', ''),
	('00000000-0000-0000-0000-000000000000', '15107094-9f58-4747-a879-776caf427894', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:16.999838+00', ''),
	('00000000-0000-0000-0000-000000000000', '958963b9-f71b-4d4f-84f8-70e6633d7ad0', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.225197+00', ''),
	('00000000-0000-0000-0000-000000000000', '93ab3d10-c850-48e5-b61e-4c3e7ab88b0e', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:16.954633+00', ''),
	('00000000-0000-0000-0000-000000000000', '24d75d7d-2c7b-4c81-9797-76ee07273768', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.198594+00', ''),
	('00000000-0000-0000-0000-000000000000', '9400a61c-a62b-4a33-8672-ad58884a08c0', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.239929+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e97b96b9-96c4-4e1c-9296-a9be0aa7fe8a', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.246073+00', ''),
	('00000000-0000-0000-0000-000000000000', '92b67cae-e8fa-41fd-b0f5-75bf2a78dd7f', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.251862+00', ''),
	('00000000-0000-0000-0000-000000000000', '12ce11d3-c9fe-443d-83d7-758cec600b3e', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:14:54.271075+00', ''),
	('00000000-0000-0000-0000-000000000000', '8bb5e499-ef66-4608-8478-4ab457f6cbf2', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.644218+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f48d973-3bd3-4e9a-a77f-c2619bf0fbd5', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.666027+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd0669f20-bb99-4d64-82c2-0ff730d98015', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.682754+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ae3f962-c8e5-4012-a6bb-6d16b68620f6', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.728506+00', ''),
	('00000000-0000-0000-0000-000000000000', '26d9941f-374d-449f-9598-7e4bdb5fdcd6', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.733513+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f947d46e-3dbc-4505-ab9a-f1e98ecb9597', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:15:59.743874+00', ''),
	('00000000-0000-0000-0000-000000000000', '6686b4d4-86a9-49b3-b58b-ecc850d1ea7b', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:16:09.202605+00', ''),
	('00000000-0000-0000-0000-000000000000', '7c11f0f9-5917-4b8e-b461-9b106c489b5c', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:16:09.215273+00', ''),
	('00000000-0000-0000-0000-000000000000', '414d883d-e4ae-40d6-b35c-2cf50e8e25a7', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:16:09.220167+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f20078a-8ba7-4987-abf7-dff50925f5d2', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 05:16:24.369154+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fdefa621-f750-4553-812d-7c2d340d1b58', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 05:20:14.607694+00', ''),
	('00000000-0000-0000-0000-000000000000', '53ee00dc-c7a3-4d14-a2f3-37e6f95a6bff', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 05:20:25.227295+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e4a10c0b-d7bc-461a-ade3-1227196d0c2a', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 05:20:31.166331+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ed6ffbc-9abd-4d55-b178-84ca8d85ab3e', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 05:20:34.159903+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c29dfa76-5ad5-4b1a-8f86-95d8106c6601', '{"action":"logout","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 05:24:41.444515+00', ''),
	('00000000-0000-0000-0000-000000000000', '4777dd26-9278-41a5-bd21-29d627daac45', '{"action":"login","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 05:24:43.485123+00', ''),
	('00000000-0000-0000-0000-000000000000', '540a47ee-09af-4cdf-aece-8ab89c3213e8', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 16:05:54.471011+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd15696cd-34af-476d-9a64-87a7e69e6150', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 16:05:54.475186+00', ''),
	('00000000-0000-0000-0000-000000000000', '81c6fc57-36e1-4ef1-a908-505cb3e5c711', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 16:05:54.910822+00', ''),
	('00000000-0000-0000-0000-000000000000', '8313699a-4de3-4a44-a6be-4a184d2e2690', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 17:11:11.686552+00', ''),
	('00000000-0000-0000-0000-000000000000', '69eb4efb-ebb7-4541-b021-dbe4dde27fd1', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 17:11:11.686941+00', ''),
	('00000000-0000-0000-0000-000000000000', '329ff8f9-7c35-4e4c-a7fe-aff411710548', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 17:11:14.59342+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f39a570a-963f-4c31-a7c8-08da135371a7', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 17:11:14.961483+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c909f55-9e1a-4a3b-b54b-16826b28be25', '{"action":"token_refreshed","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 18:11:39.926102+00', ''),
	('00000000-0000-0000-0000-000000000000', '70d4fa93-4648-4c96-b029-db6aa0331fbd', '{"action":"token_revoked","actor_id":"b10d8bb6-2537-4919-aac5-4a48e17c811b","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 18:11:39.926861+00', ''),
	('00000000-0000-0000-0000-000000000000', '1453005a-d5a5-4dd4-9f6a-2708757cbf58', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"ca42de27-cf53-448b-a358-7012316e4aca","user_phone":""}}', '2024-11-11 18:42:34.182893+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bba1a588-6289-41fb-a675-4cc0f09e7d8e', '{"action":"login","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 18:45:44.635889+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c5decd5b-62be-40bd-a0b1-74e192fd84f2', '{"action":"logout","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 18:46:30.364605+00', ''),
	('00000000-0000-0000-0000-000000000000', '58991fce-98fe-47fc-b7af-9fd3bb98fe24', '{"action":"login","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 18:46:33.654417+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7211470-b417-4d9d-b33d-9c4f55b54fa7', '{"action":"logout","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-11-11 18:47:52.489486+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a584572c-174f-480e-9df5-57f242b4acfa', '{"action":"login","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 18:47:54.21164+00', ''),
	('00000000-0000-0000-0000-000000000000', '1613724c-f60f-4eb4-b624-788227ddd0be', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"ca42de27-cf53-448b-a358-7012316e4aca","user_phone":""}}', '2024-11-11 18:47:54.259351+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ad955dc-7745-4aec-bf37-e888fb5d78dd', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 18:47:54.278738+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dc4e550-a755-44e8-986e-9310af0dd101', '{"action":"token_revoked","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 18:47:54.278891+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b3002ef-1888-4e8c-8443-2f7a90dddf91', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 19:48:09.356398+00', ''),
	('00000000-0000-0000-0000-000000000000', '34b7356a-2504-4095-a990-56d6dd1a9e9a', '{"action":"token_revoked","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 19:48:09.362893+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e64beba8-a200-47a3-a7f4-ca2a4cafd2f6', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 19:48:12.487528+00', ''),
	('00000000-0000-0000-0000-000000000000', '87c2181a-4498-4679-ad4f-595485d9a529', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"john.doe@gmail.com","user_id":"84d54d94-0f57-4040-8e3c-39b6c16dff89","user_phone":""}}', '2024-11-11 19:48:12.585142+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa56237c-6a5f-4dae-9f45-955246634f54', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"john.doe@gmail.com","user_id":"97355939-99ea-46b9-9034-36ae11f93f93","user_phone":""}}', '2024-11-11 19:57:08.4774+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e64fc52b-3e77-4372-b8d7-2edfbb3bfc6e', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 21:54:05.64297+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e72a13a4-f520-41a1-b15a-6d68853cb213', '{"action":"token_revoked","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 21:54:05.645795+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a0b6142-23e0-44a7-bb64-3fae49e95de0', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 21:54:16.388096+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e4aaf12-921f-4b32-bbfd-ccddd133f482', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 21:54:16.604563+00', ''),
	('00000000-0000-0000-0000-000000000000', '6473f0ad-91fe-4686-a60f-d18e2b3b2d12', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 23:01:38.046158+00', ''),
	('00000000-0000-0000-0000-000000000000', '4495b3cb-bed7-4d10-aade-097b97404876', '{"action":"token_revoked","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 23:01:38.046412+00', ''),
	('00000000-0000-0000-0000-000000000000', '5090b362-df23-4a70-a6b0-fe1b18fa70f9', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 23:07:01.741922+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fd97ce73-87f2-44c6-9ac3-e7bbb5028a71', '{"action":"login","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-11-11 23:26:41.238515+00', ''),
	('00000000-0000-0000-0000-000000000000', '19ac6079-f1e6-4b91-878e-6f8598f89372', '{"action":"user_modified","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"user","traits":{"user_email":"christopheroverstreet@gmail.com","user_id":"ca42de27-cf53-448b-a358-7012316e4aca","user_phone":""}}', '2024-11-11 23:26:41.265086+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a297944-a2a2-481b-95b7-1d7e53efed00', '{"action":"token_refreshed","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 23:26:41.276236+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a49ebcf-765e-4210-b3c5-e4b141d20278', '{"action":"token_revoked","actor_id":"ca42de27-cf53-448b-a358-7012316e4aca","actor_username":"christopheroverstreet@gmail.com","actor_via_sso":false,"log_type":"token"}', '2024-11-11 23:26:41.276457+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") VALUES
	('fc61022c-8f95-41c3-86c0-5de5722ea5ac', 'b10d8bb6-2537-4919-aac5-4a48e17c811b', '0bbadc95-8002-42bd-ac0c-987c1c8da3da', 's256', 'SJ7IKcO08b_zyoaIF0o5MkU8kqXcKgykqnnChfjVkoA', 'email', '', '', '2024-11-10 20:11:04.72604+00', '2024-11-10 20:16:04.853175+00', 'email/signup', '2024-11-10 20:16:04.85313+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'ca42de27-cf53-448b-a358-7012316e4aca', 'authenticated', 'authenticated', 'christopheroverstreet@gmail.com', '$2a$10$Kl6FVjeC8ArDeWhx6Dc2sOMGTJRXh1og3hVG4UQKz5aGvrjU1Y/Ym', '2024-11-11 18:42:34.183784+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-11-11 23:26:41.238959+00', '{"provider": "email", "providers": ["email"], "tenant_id": "2W0Y46", "tenant_role": "owner", "tenant_profile_id": "RXRWJD"}', '{}', NULL, '2024-11-11 18:42:34.177099+00', '2024-11-11 23:26:41.27716+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '97355939-99ea-46b9-9034-36ae11f93f93', 'authenticated', 'authenticated', 'john.doe@gmail.com', '$2a$10$uwIErWifKedFr9uu5T1T/uOZ6QmIVaDRWq8qapopph02TJjTtbJzW', NULL, NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-11-11 19:57:08.476079+00', '2024-11-11 19:57:08.477764+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('ca42de27-cf53-448b-a358-7012316e4aca', 'ca42de27-cf53-448b-a358-7012316e4aca', '{"sub": "ca42de27-cf53-448b-a358-7012316e4aca", "email": "christopheroverstreet@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-11-11 18:42:34.182038+00', '2024-11-11 18:42:34.182061+00', '2024-11-11 18:42:34.182061+00', '7b0121a9-ba35-4d9a-b5d7-bec9d6dfde19'),
	('97355939-99ea-46b9-9034-36ae11f93f93', '97355939-99ea-46b9-9034-36ae11f93f93', '{"sub": "97355939-99ea-46b9-9034-36ae11f93f93", "email": "john.doe@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-11-11 19:57:08.477035+00', '2024-11-11 19:57:08.477061+00', '2024-11-11 19:57:08.477061+00', '74404188-ca50-4c34-a4ea-5f7b5e183ff8');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('c116b4b9-5d38-4f5a-b807-33deae957490', 'ca42de27-cf53-448b-a358-7012316e4aca', '2024-11-11 18:47:54.211902+00', '2024-11-11 23:07:01.742491+00', NULL, 'aal1', NULL, '2024-11-11 23:07:01.742464', 'node', '192.168.107.1', NULL),
	('b2e5373d-7ae2-4197-958b-256b768ebac8', 'ca42de27-cf53-448b-a358-7012316e4aca', '2024-11-11 23:26:41.239002+00', '2024-11-11 23:26:41.277516+00', NULL, 'aal1', NULL, '2024-11-11 23:26:41.277489', 'node', '192.168.107.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('c116b4b9-5d38-4f5a-b807-33deae957490', '2024-11-11 18:47:54.212626+00', '2024-11-11 18:47:54.212626+00', 'password', '3eafaeb4-9bd6-4fc0-b820-bd3977d9c816'),
	('b2e5373d-7ae2-4197-958b-256b768ebac8', '2024-11-11 23:26:41.242938+00', '2024-11-11 23:26:41.242938+00', 'password', '6d8dda7d-cc99-4a69-90fe-183aa49da3f7');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 56, 'TeByk64YOEhcD_YgRGRYeA', 'ca42de27-cf53-448b-a358-7012316e4aca', true, '2024-11-11 18:47:54.212106+00', '2024-11-11 18:47:54.278995+00', NULL, 'c116b4b9-5d38-4f5a-b807-33deae957490'),
	('00000000-0000-0000-0000-000000000000', 57, 'mJpnfKNNVgW-560fdeHkPQ', 'ca42de27-cf53-448b-a358-7012316e4aca', true, '2024-11-11 18:47:54.283447+00', '2024-11-11 19:48:09.363418+00', 'TeByk64YOEhcD_YgRGRYeA', 'c116b4b9-5d38-4f5a-b807-33deae957490'),
	('00000000-0000-0000-0000-000000000000', 58, 'p5riG7izvCXUfnz8YYd6ZA', 'ca42de27-cf53-448b-a358-7012316e4aca', true, '2024-11-11 19:48:09.364118+00', '2024-11-11 21:54:05.645954+00', 'mJpnfKNNVgW-560fdeHkPQ', 'c116b4b9-5d38-4f5a-b807-33deae957490'),
	('00000000-0000-0000-0000-000000000000', 59, 'uj0iV5og-j5NnXeHxFJhUw', 'ca42de27-cf53-448b-a358-7012316e4aca', true, '2024-11-11 21:54:05.646185+00', '2024-11-11 23:01:38.046527+00', 'p5riG7izvCXUfnz8YYd6ZA', 'c116b4b9-5d38-4f5a-b807-33deae957490'),
	('00000000-0000-0000-0000-000000000000', 60, '6O9m1o4Gn4k6taUWJ673fw', 'ca42de27-cf53-448b-a358-7012316e4aca', false, '2024-11-11 23:01:38.046734+00', '2024-11-11 23:01:38.046734+00', 'uj0iV5og-j5NnXeHxFJhUw', 'c116b4b9-5d38-4f5a-b807-33deae957490'),
	('00000000-0000-0000-0000-000000000000', 61, 'BWrQZx7Q1FtwK6UCgfnAoQ', 'ca42de27-cf53-448b-a358-7012316e4aca', true, '2024-11-11 23:26:41.242181+00', '2024-11-11 23:26:41.276687+00', NULL, 'b2e5373d-7ae2-4197-958b-256b768ebac8'),
	('00000000-0000-0000-0000-000000000000', 62, 'RbJXOxuAMR_0yYkn9JpjvQ', 'ca42de27-cf53-448b-a358-7012316e4aca', false, '2024-11-11 23:26:41.276836+00', '2024-11-11 23:26:41.276836+00', 'BWrQZx7Q1FtwK6UCgfnAoQ', 'b2e5373d-7ae2-4197-958b-256b768ebac8');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenants" ("serial_id", "name", "added_by", "created_at", "updated_at") VALUES
	(1, 'Demo', 'ca42de27-cf53-448b-a358-7012316e4aca', '2024-11-11 18:43:45.593524+00', '2024-11-11 18:43:45.593524+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "email", "phone", "created_at", "updated_at") VALUES
	('97355939-99ea-46b9-9034-36ae11f93f93', 'john.doe@gmail.com', NULL, '2024-11-11 19:57:08.475832+00', '2024-11-11 19:57:08.475832+00'),
	('ca42de27-cf53-448b-a358-7012316e4aca', 'christopheroverstreet@gmail.com', NULL, '2024-11-11 18:42:34.176691+00', '2024-11-11 18:42:34.176691+00');


--
-- Data for Name: tenant_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."tenant_profiles" ("serial_id", "tenant_id", "first_name", "last_name", "role", "avatar_url", "created_at", "updated_at", "user_id") VALUES
	(1, '2W0Y46', 'Chris', 'Overstreet', 'owner', NULL, '2024-11-11 18:44:15.319496+00', '2024-11-11 18:44:15.319496+00', 'ca42de27-cf53-448b-a358-7012316e4aca'),
	(4, '2W0Y46', 'John', 'Doe', 'parent', NULL, '2024-11-11 19:57:08.5012+00', '2024-11-11 19:57:08.5012+00', '97355939-99ea-46b9-9034-36ae11f93f93'),
	(5, '2W0Y46', 'Ashley', 'Hughes', 'parent', NULL, '2024-11-11 23:18:09.751141+00', '2024-11-11 23:18:09.751141+00', NULL);


--
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pets" ("serial_id", "tenant_id", "name", "created_at", "updated_at", "avatar_url", "added_by") VALUES
	(1, '2W0Y46', 'Mr. Bagel', '2024-11-11 22:29:10.52168+00', '2024-11-11 22:29:10.52168+00', NULL, NULL);


--
-- Data for Name: pet_parents; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."pet_parents" ("id", "tenant_id", "pet_id", "created_at", "updated_at", "tenant_profile_id") VALUES
	(1, '2W0Y46', 'RXRWJD', '2024-11-11 22:29:26.347502+00', '2024-11-11 22:29:26.347502+00', 'RXRWJD'),
	(2, '2W0Y46', 'RXRWJD', '2024-11-11 23:27:39.007283+00', '2024-11-11 23:27:39.007283+00', '5XE2JN');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 62, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: pet_parents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."pet_parents_id_seq"', 2, true);


--
-- Name: pets_serial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."pets_serial_id_seq"', 1, true);


--
-- Name: tenant_profiles_serial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tenant_profiles_serial_id_seq"', 5, true);


--
-- Name: tenants_serial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tenants_serial_id_seq"', 1, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
