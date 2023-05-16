create TABLE "user"(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo VARCHAR(255)
);

create TABLE "post"(
    id SERIAL PRIMARY KEY,
    messange VARCHAR(255),
    media VARCHAR(255),
    date DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user" (id) 
);