create TABLE "user"(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo VARCHAR(255)
);

create TABLE "post"(
    id SERIAL PRIMARY KEY,
    messange VARCHAR(999),
    date DATE,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES "user" (id) 
);

create TABLE "media"(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    url_media VARCHAR(999) UNIQUE,
    post_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES "post" (id)
);