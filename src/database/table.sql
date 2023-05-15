-- Active: 1683399409900@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime'))
);


CREATE TABLE post(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    creator_id TEXT NOT NULL, --FK
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT(0),
    deslikes INTEGER NOT NULL DEFAULT(0),
    created_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime')),
    update_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime')),

    FOREIGN KEY(creator_id) REFERENCES users(id)
);


CREATE TABLE likes_deslikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES post(id)
);