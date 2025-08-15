CREATE TABLE public.beach_depths (
    id SERIAL PRIMARY KEY, 
    description VARCHAR(80) NOT NULL
);

CREATE TABLE public.beach_textures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    img_url VARCHAR(200) NOT NULL
);

CREATE TABLE public.beach_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL
);

CREATE TABLE public.characteristics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    icon_url VARCHAR(200) NOT NULL
);

CREATE TABLE public.countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE public.cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(10,8) NOT NULL,
    country_id INTEGER NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE public.users (
    id UUID PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(80) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE public.beaches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    best_time_to_visit VARCHAR(100),
    local_wildlife TEXT,
    restaurants_and_bars_nearby TEXT,
    beach_texture_id INTEGER NOT NULL,
    beach_type_id INTEGER NOT NULL,
    beach_depth_id INTEGER NOT NULL,
    city_id INTEGER NOT NULL,
    user_id UUID NOT NULL,
    working_hours VARCHAR(80),
    FOREIGN KEY (beach_texture_id) REFERENCES beach_textures(id),
    FOREIGN KEY (beach_type_id) REFERENCES beach_types(id),
    FOREIGN KEY (beach_depth_id) REFERENCES beach_depths(id),
    FOREIGN KEY (city_id) REFERENCES cities(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE public.beach_has_characteristics (
    beach_id INTEGER NOT NULL,
    characteristic_id INTEGER NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (beach_id, characteristic_id),
    FOREIGN KEY (beach_id) REFERENCES beaches(id) ON DELETE CASCADE,
    FOREIGN KEY (characteristic_id) REFERENCES characteristics(id) ON DELETE CASCADE
);

CREATE TABLE public.conversations (
    id SERIAL PRIMARY KEY,
    title TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.images (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    beach_id INTEGER,
    FOREIGN KEY (beach_id) REFERENCES beaches(id) ON DELETE CASCADE
);

CREATE TABLE public.messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    is_user BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    conversation_id INTEGER NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE TABLE public.reviews (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    user_id UUID NOT NULL,
    beach_id INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (beach_id) REFERENCES beaches(id) ON DELETE CASCADE
);

CREATE INDEX idx_beaches_city_id ON beaches(city_id);
CREATE INDEX idx_beaches_approved ON beaches(approved);
CREATE INDEX idx_beaches_user_id ON beaches(user_id);
CREATE INDEX idx_reviews_beach_id ON reviews(beach_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_cities_country_id ON cities(country_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);