INSERT INTO public.users (email, password_hash, created_at, updated_at)
VALUES ('fseitun@gmail.com','$2b$10$ZLXjSohbAqwCK9ppo0MGJuu4A6K7Eu0SVHl
hp9JaItADG6Up2J22q','2024-10-21 19:29:40.424765','2024-11-07 18:26:03.251664');


INSERT INTO public.jobs (user_id ,hiring_company, recruiting_company, position, recruiter_name, recruitment_channel, monthly_salary, vacation_days, holiday_days, job_description, direct_hire, time_zone, updated_at, created_at)
VALUES ('b17098e0-276a-4aba-accc-3e0e2e3906ba','tesla','globant','sr fs','kevin','linkedin',7000,20,20,'some desc',TRUE,'-3','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('b17098e0-276a-4aba-accc-3e0e2e3906ba','meta','epam','be','charly','whatsapp',8000,20,10,'another desc',FALSE,'-3','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664');

INSERT INTO public.interviews (job_id, interviewer_name, interviewer_role, interview_date, notes, updated_at, created_at)
VALUES ('1134c999-efb5-4fa8-a2b1-4fd5aeba46fb','john','CTO','2024-10-21 00:00:00','tech interview','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('9261b00b-8f1e-402e-8bc8-48afb0c9c359','Ceci','driver','2024-10-09 00:00:00','cool','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('9261b00b-8f1e-402e-8bc8-48afb0c9c359','Fico','pateador','2024-08-23 00:00:00','Fucking Rockstar','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('9261b00b-8f1e-402e-8bc8-48afb0c9c359','Marge','cadete','2024-11-04 00:00:00','nailed it','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('9261b00b-8f1e-402e-8bc8-48afb0c9c359','Jorge','CFO','2024-09-23 00:00:00','Mama mia','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('1134c999-efb5-4fa8-a2b1-4fd5aeba46fb','Rob','Rocker','2024-09-23 00:00:00','Love','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664'),
       ('9261b00b-8f1e-402e-8bc8-48afb0c9c359','Margarita','Tech Lead','2022-10-23 00:00:00','Hi Mom','2024-11-07 18:26:03.251664','2024-11-07 18:26:03.251664');
